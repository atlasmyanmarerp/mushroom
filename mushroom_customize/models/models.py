# -*- coding: utf-8 -*-

from odoo import models, fields, api, _ 
from odoo.exceptions import AccessError, UserError, ValidationError


class SaleOrder(models.Model):
	_inherit = 'sale.order'

	customer_phone_number = fields.Char(string="Customer Phone Number")


	@api.onchange('partner_id')
	def _onchange_partner_id(self):
		if self.partner_id:
			if self.partner_id.phone:
				self.customer_phone_number = self.partner_id.phone