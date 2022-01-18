odoo.define('pos_customized.TicketScreen', function (require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const TicketScreen = require('point_of_sale.TicketScreen');
    const Registries = require('point_of_sale.Registries');
    const field_utils = require('web.field_utils');
    const { useAutofocus } = require('web.custom_hooks');
    const { posbus } = require('point_of_sale.utils');
    const { parse } = require('web.field_utils');
    const { useState, useContext } = owl.hooks;

    const PosEditTicketScreen = (TicketScreen) =>
        class extends TicketScreen {
            constructor() {
                super(...arguments);
            }
            get filterOptions() {
                const { AllOrders } = this.getOrderStates();
                var filterOptions = super.filterOptions;
                return [...filterOptions, AllOrders];
            }
            get _screenToStatusMap() {
                const { AllOrders } = this.getOrderStates();
                return Object.assign(super._screenToStatusMap, {
                    AllOrders: AllOrders,
                });
            }
            getOrderStates() {
                return Object.assign(super.getOrderStates(), {
                    AllOrders: this.env._t('All Orders')
                });
            }
            getOrderStates() {
                return Object.assign(super.getOrderStates(), {
                    AllOrders: this.env._t('All Orders')
                });
            }
            async willStart() {
                await super.willStart(...arguments)
                await this.updateOrders();
            }
            get filteredOrderList() {
                const { AllOrders } = this.getOrderStates();
                if (this.filter == null || this.filter !== AllOrders) {
                    return super.filteredOrderList;
                }
                const filterCheck = (order) => {
                    if (this.filter && this.filter !== AllOrders) {
                        const screen = order.get_screen_data();
                        return this.filter === this.constants.screenToStatusMap[screen.name];
                    }
                    return true;
                };
                const { fieldValue, searchTerm } = this.searchDetails;
                const fieldAccessor = this._searchFields[fieldValue];
                const searchCheck = (order) => {
                    if (!fieldAccessor) return true;
                    const fieldValue = fieldAccessor(order);
                    if (fieldValue === null) return true;
                    if (!searchTerm) return true;
                    return fieldValue && fieldValue.toString().toLowerCase().includes(searchTerm.toLowerCase());
                };
                const predicate = (order) => {
                    return filterCheck(order) && searchCheck(order);
                };
                return this.env.pos.db.server_orders.filter(predicate);
            }
            async updateOrders() {
                await this.rpc({
                    method: 'search_read',
                    model: 'pos.order',
                }).then((result) => {
                    this.env.pos.db.server_orders = result
                });
            }
            get orderList() {
                if (this.env.pos.table) {
                    return super.orderList;
                } else {
                    return this.env.pos.get('orders').models;
                }
            }
            async addOrderToCart(order) {
                var jsons = await this.env.pos.fetchOrders([order.id])
                this.env.pos.load_orders_from_json(jsons);
                this.env.pos.get_order().set({'delivery_date': jsons[0].delivery_date})
            }
        };

    Registries.Component.extend(TicketScreen, PosEditTicketScreen);

    return TicketScreen;
});
