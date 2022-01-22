odoo.define('pos_phone_search.TicketScreen', function(require) {
    "use strict";

    var TicketScreen = require('point_of_sale.TicketScreen');
    const Registries = require('point_of_sale.Registries');

    const TicketScreenPhone = (TicketScreen) =>
        class extends TicketScreen {
            getCustomerPhone(order) {
                return order.get_client_phone();
                }


        getSearchFieldNames() {
            const res = super.getSearchFieldNames();
            res.Phone = this.env._t('Phone')
            return res;
        }

        get _searchFields() {
                const { AllOrders } = this.getOrderStates();
                const { ReceiptNumber, Date, Customer, Phone, CardholderName } = this.getSearchFieldNames();

                if (this.filter && this.filter == AllOrders) {
                    var fields = {
                    [ReceiptNumber]: (order) => order.pos_reference,
                    [Date]: (order) => moment(order.create_date).format('YYYY-MM-DD hh:mm A'),
                    [Customer]: (order) => order.partner_id[1],
                    [Phone]: (order) => order.partner_phone,
                };
                    }
                else{
                    var fields = {
                    [ReceiptNumber]: (order) => order.name,
                    [Date]: (order) => moment(order.creation_date).format('YYYY-MM-DD hh:mm A'),
                    [Customer]: (order) => order.get_client_name(),
                    [Phone]: (order) => order.get_client_phone_number(),
                };
                }


                if (this.showCardholderName()) {
                    fields[CardholderName] = (order) => order.get_cardholder_name();
                }

                return fields;
                }

            _initializeSearchFieldConstants() {
            this.constants = {};
            Object.assign(this.constants, {
                searchFieldNames: Object.keys(this._searchFields),
                screenToStatusMap: this._screenToStatusMap,
            });


        }

        async updateOrders() {
                await this.rpc({
                    method: 'add_partner_phone',
                    model: 'pos.order',
                }).then((result) => {
                    console.log('result===>', result)
                    this.env.pos.db.server_orders = result
                });
            }


    };


    Registries.Component.extend(TicketScreen, TicketScreenPhone);

    return TicketScreen;
});
