# -*- coding: utf-8 -*-
# from odoo import http


# class Addsurchage(http.Controller):
#     @http.route('/addsurchage/addsurchage/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/addsurchage/addsurchage/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('addsurchage.listing', {
#             'root': '/addsurchage/addsurchage',
#             'objects': http.request.env['addsurchage.addsurchage'].search([]),
#         })

#     @http.route('/addsurchage/addsurchage/objects/<model("addsurchage.addsurchage"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('addsurchage.object', {
#             'object': obj
#         })
