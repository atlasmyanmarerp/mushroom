# -*- coding: utf-8 -*-
{
    'name': "POS Phone Search",

    'summary': """
        add the ability to search for pos ticket/order using phone number
        """,

    'description': """
        add the ability to search for pos ticket/order using phone number
    """,

    'author': "Ahmed Gaber",
    'website': "https://www.linkedin.com/in/ahmed-gaber-elgamal-eg/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Sales/Point of Sale',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['pos_customized'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    'qweb': ['static/src/xml/TicketScreen.xml'],

}
