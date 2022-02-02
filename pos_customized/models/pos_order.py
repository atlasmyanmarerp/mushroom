# -*- coding: utf-8 -*-
import time
import pytz
from datetime import datetime

from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = "pos.order"

    delivery_date_local = fields.Datetime('Delivery Date Local')
    delivery_date = fields.Datetime('Delivery Date')
    move_ids = fields.One2many('stock.move', 'pos_order_id', string='Stock Moves')

    @api.model
    def create_from_ui(self, orders, draft=False):
        order_ids = []
        ReturnPicking = self.env['stock.return.picking']
        Picking = self.env['stock.picking']
        ImmediateTransfer = self.env['stock.immediate.transfer']
        for order in orders:
            existing_order = False

            if 'server_id' in order['data']:
                existing_order = self.env['pos.order'].search(['|', ('id', '=', order['data']['server_id']), ('pos_reference', '=', order['data']['name'])], limit=1)

                if existing_order and existing_order.move_ids:
                    pickings = existing_order.move_ids.mapped('picking_id')

                    for picking in pickings.filtered(lambda x: not x.origin.startswith('Return')):
                        location_id = picking.location_id.id
                        product_return_moves = [(5,)]
                        moves = existing_order.move_ids.filtered(lambda x: x.picking_id.id == picking.id)
                        total_quantity = 0

                        if picking.picking_type_id.return_picking_type_id.default_location_dest_id.return_location:
                            location_id = picking.picking_type_id.return_picking_type_id.default_location_dest_id.id
                        line_fields = [f for f in self.env['stock.return.picking.line']._fields.keys()]
                        product_return_moves_data_tmpl = self.env['stock.return.picking.line'].default_get(line_fields)

                        for move in moves:
                            if move.state == 'cancel':
                                continue
                            if move.scrapped:
                                continue
                            product_return_moves_data = dict(product_return_moves_data_tmpl)
                            product_return_moves_data.update(ReturnPicking._prepare_stock_return_picking_line_vals_from_move(move))
                            product_return_moves.append((0, 0, product_return_moves_data))
                            total_quantity += product_return_moves_data.get('quantity', 0)

                        if moves and total_quantity:
                            return_pickings = ReturnPicking.create({
                                'product_return_moves': product_return_moves,
                                'picking_id': picking.id,
                                'location_id': location_id,
                            })
                            new_picking, pick_type_id = return_pickings._create_returns()
                            ImmediateTransfer.create({
                                'pick_ids': [(6, 0, [new_picking])],
                                'immediate_transfer_line_ids': [ (0, 0, {'to_immediate': True, 'picking_id': new_picking})]
                            }).with_context(button_validate_picking_ids=[new_picking]).process()


            order_ids.append(self._process_order(order, draft, existing_order))

        return self.env['pos.order'].search_read(domain = [('id', 'in', order_ids)], fields = ['id', 'pos_reference'])

    @api.model
    def _order_fields(self, ui_order):
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        if ui_order.get('delivery_date'):
            timestamp = time.mktime(time.strptime(ui_order.get('delivery_date'), '%Y-%m-%dT%H:%M'))
            local = pytz.timezone(self.env.user.tz)
            local_dt = local.localize(datetime.fromtimestamp(timestamp), is_dst=None)
            utc_dt = local_dt.astimezone(pytz.utc)
            order_fields['delivery_date'] = utc_dt.replace(tzinfo=None)
            order_fields['delivery_date_local'] = datetime.fromtimestamp(timestamp)
        return order_fields

    def _export_for_ui(self, order):
        result = super(PosOrder, self)._export_for_ui(order)
        if order.delivery_date_local:
            result.update({ 'delivery_date': order.delivery_date_local.strftime('%Y-%m-%dT%H:%M') })
        return result


class StockMove(models.Model):
    _inherit='stock.move'

    pos_order_id = fields.Many2one('pos.order')


class StockPicking(models.Model):
    _inherit='stock.picking'

    def _prepare_stock_move_vals(self, first_line, order_lines):
        vals = super()._prepare_stock_move_vals(first_line, order_lines)
        vals.update({ 'pos_order_id': first_line.order_id.id })
        return vals
