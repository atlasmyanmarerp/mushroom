# -*- coding: utf-8 -*-

{
    'name': 'Customized Point of Sale',
    'version': '1.0.1',
    'category': 'Sales/Point of Sale',
    'sequence': 40,
    'summary': 'Customized Point of Sale',
    'description': "",
    'depends': ['point_of_sale'],
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
