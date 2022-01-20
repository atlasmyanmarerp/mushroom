odoo.define('pos_phone_search.TicketScreen', function(require) {
    "use strict";

    var TicketScreen = require('point_of_sale.TicketScreen');
    const Registries = require('point_of_sale.Registries');

    const TicketScreenPhone = (TicketScreen) =>
        class extends TicketScreen {
            getCustomerPhone(order) {
                return order.get_client_phone();
                }
            get _searchFields() {
                const { ReceiptNumber, Date, Customer, Phone, CardholderName } = this.getSearchFieldNames();
                var fields = {
                    [ReceiptNumber]: (order) => order.name,
                    [Date]: (order) => moment(order.creation_date).format('YYYY-MM-DD hh:mm A'),
                    [Customer]: (order) => order.get_client_name(),
                    [Phone]: (order) => order.get_client_phone(),
                };

                if (this.showCardholderName()) {
                    fields[CardholderName] = (order) => order.get_cardholder_name();
                }

                return fields;
                }


        getSearchFieldNames() {
            const res = super.getSearchFieldNames();
            res.Phone = this.env._t('Phone')
            return res;
        }
    };


    Registries.Component.extend(TicketScreen, TicketScreenPhone);

    return TicketScreen;
});
