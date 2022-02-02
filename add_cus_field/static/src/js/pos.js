odoo.define('pos_enhancement.widget', function (require) {
    "use strict";

    const models = require('point_of_sale.models');

    models.load_fields("res.partner", ['township_id']);

    models.load_models({
        model: 'township.township',
        fields: ['name', 'id'],
        loaded: function(self,partner_township){
            self.partner_township = partner_township;
        },
    });
});


odoo.define('pos_enhancement.ClientListScreenWidgetInh', function (require) {
    'use strict';

    const ClientDetailsEdit = require('point_of_sale.ClientDetailsEdit');
    const { _t } = require('web.core');
    const { getDataURLFromFile } = require('web.utils');
    const PosComponent = require('point_of_sale.PosComponent');
    const { useListener } = require('web.custom_hooks');
    const Registries = require('point_of_sale.Registries');
    const rpc = require('web.rpc');

    const ClientDetailsEditInh = (ClientDetailsEdit) =>
        class extends ClientDetailsEdit {
            constructor() {
                super(...arguments);
                this.intFields = ['township_id', 'country_id', 'state_id', 'property_product_pricelist'];
                const partner = this.props.partner;
                this.changes = {
                    'country_id': partner.country_id && partner.country_id[0],
                    'state_id': partner.state_id && partner.state_id[0],
                    'township_id': partner.township_id && partner.township_id[0],
                };
            }
            captureChange(event) {
                this.changes[event.target.name] = event.target.value;
                this.changes['township_id'] = $('select[name="township_id"]').val();
            }
        };

    Registries.Component.extend(ClientDetailsEdit, ClientDetailsEditInh);

    return ClientDetailsEditInh;
});
