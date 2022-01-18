odoo.define('pos_customized.pos', function (require) {
"use strict";

var models = require('point_of_sale.models');
var field_utils = require('web.field_utils');

models.PosModel = models.PosModel.extend({
    fetchOrders: async function (ids) {
        return await this.rpc({
            model: 'pos.order',
            method: 'export_for_ui',
            args: [ids],
            context: this.env.session.user_context,
        });
    },
    load_orders_from_json: function(jsons){
        var orders = [];

        for (var i = 0; i < jsons.length; i++) {
            var json = jsons[i];
            if (json.pos_session_id === this.pos_session.id) {
                orders.push(new models.Order({},{
                    pos:  this,
                    json: json,
                }));
            }
        }
        for (var i = 0; i < jsons.length; i++) {
            var json = jsons[i];
            if (json.pos_session_id !== this.pos_session.id && json.lines.length > 0) {
                orders.push(new models.Order({},{
                    pos:  this,
                    json: json,
                }));
            } else if (json.pos_session_id !== this.pos_session.id) {
                this.db.remove_unpaid_order(jsons[i]);
            }
        }

        orders = orders.sort(function(a,b){
            return a.sequence_number - b.sequence_number;
        });

        if (orders.length) {
            this.get('orders').add(orders);
            orders[0].finalized = true;
            orders[0].set_screen_data({ name: 'ProductScreen' });
            this.set('selectedOrder', orders[0]);
            orders[0].finalized = false;
        }
    },
});

var _super_order = models.Order.prototype;
models.Order = models.Order.extend({
    export_for_printing: function () {
        var result = _super_order.export_for_printing.apply(this, arguments);
        var delivery_date = this.get('delivery_date');
        var delivery_date_formated = delivery_date && field_utils.format.datetime(moment(delivery_date, 'YYYY-MM-DDThh:mm'), {}, {timezone: false});
        result.delivery_date = delivery_date_formated;
        return result;
    },
    export_as_JSON: function() {
        var result = _super_order.export_as_JSON.apply(this, arguments);
        result.delivery_date = this.get('delivery_date');
        return result;
    },
});

});
