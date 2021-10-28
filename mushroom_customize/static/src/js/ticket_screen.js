odoo.define('mushroom_customize.ticket_screen', function(require){
	'use strict';
	const TicketScreen = require('point_of_sale.TicketScreen');


	function getPhoneNumber(order){
		return order.get_client_phone_number();
	}

	function _initializeSearchFieldConstants() {
            this.constants = {};
           	var searchFields = {};
           	searchFields = this._searchFields;

            searchFields['Phone'] = (order) => order.get_client_phone_number();
            console.log(searchFields);	
            this.searchFields = searchFields;

            Object.assign(this.constants, {
                searchFieldNames: Object.keys(searchFields),
                screenToStatusMap: this._screenToStatusMap,
            });
        }
	
	TicketScreen.prototype.getPhoneNumber = getPhoneNumber;
	TicketScreen.prototype._initializeSearchFieldConstants = _initializeSearchFieldConstants;

	return TicketScreen;
});