# -*- coding: utf-8 -*-
{
    'name': 'POS Enhancement',
    'summary': """POS Enhancement""",
    'description': """POS Enhancement""",
    'author': "Haresh Kansara",
    'website': 'https://hareshkansara.odoo.com',
    'support': 'hareshkansara00@gmail.com',
    'version': '14.0.0.1',
    'category': 'Point of Sale',
    'depends': [
        'point_of_sale',
        'contacts',
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
    'installable': True,
    'auto_install': False,
}
