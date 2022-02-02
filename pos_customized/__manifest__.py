# -*- coding: utf-8 -*-

{
    'name': 'Customized Point of Sale',
    'version': '1.0.1',
    'category': 'Point of sale',
    'sequence': 40,
    'summary': 'Customized Point of Sale',
    'author': 'Mohit Ghodasara',
    'support': 'Mohit.Ghodasara@Yahoo.com',
    'description': 'Customized Point of Sale',
    'depends': ['point_of_sale','mushroom_customize'],

    'data': [
        'views/point_of_sale_view.xml',
    ],
    'installable': True,
    'application': True,
    'qweb': [
        'static/src/xml/OrderReceipt.xml',
        'static/src/xml/DeliveryDatePopup.xml',
    ],
}
