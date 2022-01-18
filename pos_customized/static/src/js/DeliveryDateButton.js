odoo.define('pos_customized.DeliveryDateButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const { xml } = owl.tags;

    class DeliveryDateButton extends PosComponent {
        constructor() {
            super(...arguments);
            useListener('click', this.onClick);
        }
        async onClick() {
            var order = this.env.pos.get_order();
            var deliveryDate = order.get('delivery_date');
            var { confirmed, payload } = await this.showPopup('DeliveryDatePopup', {
                title: this.env._t('Select Delivery Date'),
                deliveryDate: deliveryDate,
            });
            if (confirmed) {
                order.set({'delivery_date': payload.date});
            }
        }
    }
    DeliveryDateButton.template = xml`<div class="control-button"><i class="fa fa-calendar"></i> Set Delivery Date </div>`;

    ProductScreen.addControlButton({
        component: DeliveryDateButton,
        condition: function() {
            return true;
        },
    });

    Registries.Component.add(DeliveryDateButton);

    return DeliveryDateButton;
});
