odoo.define('point_of_sale.DeliveryDatePopup', function(require) {
    'use strict';

    const ConfirmPopup = require('point_of_sale.ConfirmPopup');
    const Registries = require('point_of_sale.Registries');
    const { xml } = owl.tags;

    // formerly ErrorTracebackPopupWidget
    class DeliveryDatePopup extends ConfirmPopup {
        async getPayload() {
            return {date: this.el.querySelector('#deliveryDate').value};
        }
    }
    DeliveryDatePopup.template = 'DeliveryDatePopup';
    DeliveryDatePopup.defaultProps = {
        confirmText: 'Ok',
        cancelText: 'Cancel',
        title: 'Confirm ?',
        body: '',
    };

    Registries.Component.add(DeliveryDatePopup);

    return DeliveryDatePopup;
});
