odoo.define('pos_phone_search.pos_order', function(require) {
"use strict";

var models = require('point_of_sale.models');



models.Order = models.Order.extend({

   get_client_phone: function(){
        var client = this.get('client');
        return client ? client.phone : "";
    },

    getSearchFieldNames() {
            return {
                ReceiptNumber: this.env._t('Receipt Number'),
                Date: this.env._t('Date'),
                Customer: this.env._t('Customer'),
                Phone: this.env._t('Phone'),
                CardholderName: this.env._t('Cardholder Name'),
            };
        }

});

});
