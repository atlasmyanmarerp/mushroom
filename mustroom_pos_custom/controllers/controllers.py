# -*- coding: utf-8 -*-
# from odoo import http


# class MustroomPosCustom(http.Controller):
#     @http.route('/mustroom_pos_custom/mustroom_pos_custom/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/mustroom_pos_custom/mustroom_pos_custom/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('mustroom_pos_custom.listing', {
#             'root': '/mustroom_pos_custom/mustroom_pos_custom',
#             'objects': http.request.env['mustroom_pos_custom.mustroom_pos_custom'].search([]),
#         })

#     @http.route('/mustroom_pos_custom/mustroom_pos_custom/objects/<model("mustroom_pos_custom.mustroom_pos_custom"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('mustroom_pos_custom.object', {
#             'object': obj
#         })
