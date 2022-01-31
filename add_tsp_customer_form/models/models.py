# -*- coding: utf-8 -*-

from odoo import models, fields, api


class ResPartner(models.Model):
    _inherit = "res.partner"

    township_id = fields.Many2one('township.township', string='Township')


class TownshipTownship(models.Model):
    _name = 'township.township'
    _description = 'Township'

    name = fields.Char(string='Township')
