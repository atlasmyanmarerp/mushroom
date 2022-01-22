from odoo import fields, models, api


class PosOrder(models.Model):
    _inherit = "pos.order"

    @api.model
    def add_partner_phone(self):
        """
        this function add the partner phone to the returned dict of search_read function
        and to be called in js
        """
        pos_orders_dict = self.env['pos.order'].search_read([])
        for order in pos_orders_dict:
            if order['partner_id']:
                partner_id = self.env['res.partner'].browse(order['partner_id'][0])
                order['partner_phone'] = partner_id.phone
        return pos_orders_dict
