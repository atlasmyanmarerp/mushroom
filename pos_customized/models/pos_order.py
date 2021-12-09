# -*- coding: utf-8 -*-
import time
import pytz
from datetime import datetime

from odoo import models, fields, api

class PosOrder(models.Model):
    _inherit = "pos.order"

    delivery_date = fields.Datetime('Delivery Date')

    @api.model
    def _order_fields(self, ui_order):
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        if ui_order.get('delivery_date'):
            timestamp = time.mktime(time.strptime(ui_order.get('delivery_date'), '%Y-%m-%dT%H:%M'))
            local = pytz.timezone(self.env.user.tz)
            local_dt = local.localize(datetime.fromtimestamp(timestamp), is_dst=None)
            utc_dt = local_dt.astimezone(pytz.utc)
            order_fields['delivery_date'] = utc_dt.replace(tzinfo=None)
        return order_fields

    def _export_for_ui(self, order):
        result = super(PosOrder, self)._export_for_ui(order)
        result.update({ 'delivery_date': order.delivery_date })
        return result
