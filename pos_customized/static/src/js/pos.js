odoo.define('pos_customized.pos', function (require) {
"use strict";

var models = require('point_of_sale.models');
var field_utils = require('web.field_utils');

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
