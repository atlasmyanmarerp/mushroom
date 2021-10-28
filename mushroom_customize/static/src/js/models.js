odoo.define('mushroom_customize.order_model', function(require){
	'use strict';
	var models = require('point_of_sale.models')

	models.Order = models.Order.extend({
		
		get_client_phone_number: function(){
			var client = this.get('client');
			return client ? client.phone : "";
		},

	});

});