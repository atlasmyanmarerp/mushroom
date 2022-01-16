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
<<<<<<< HEAD
    'depends': ['point_of_sale','mushroom_customize'],
=======
    'depends': ['point_of_sale'],
>>>>>>> 579b8bc3cd62264aabe7b84dd11231ea27ca4dfb
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
