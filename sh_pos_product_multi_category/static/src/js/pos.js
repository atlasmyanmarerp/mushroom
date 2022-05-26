odoo.define('sh_pos_product_multi_category', function (require) {
    'use strict';

    var models = require('point_of_sale.models')
    var PosDb = require("point_of_sale.DB")
    var utils = require('web.utils');

    models.load_fields('product.product', ['sh_pos_categ_ids'])

    models.load_models([{
        model: 'product.product',
        domain: function (self) {
            var domain = [];
            if (self.config.limit_categories && self.config.iface_available_categ_ids.length) {
                1
                domain.push(['sh_pos_categ_ids', 'in', self.config.iface_available_categ_ids]);
            }
            return domain
        },
        loaded: function (self, products) {
            var using_company_currency = self.config.currency_id[0] === self.company.currency_id[0];
            var conversion_rate = self.currency.rate / self.company_currency.rate;
            self.db.add_products(_.map(products, function (product) {
                if (product.pos_categ_id && product.pos_categ_id[0] && self.db.product_by_category_id[product.pos_categ_id[0]]) {
                    // console.log(product.pos_categ_id[0])
                    // console.log(self.db.product_by_category_id[product.pos_categ_id[0]])
                    var is_added = product.pos_categ_id[0] in self.db.product_by_category_id[product.pos_categ_id[0]]
                } else {
                    var is_added = false
                }
                if (!is_added) {
                    if (!using_company_currency) {
                        product.lst_price = round_pr(product.lst_price * conversion_rate, self.currency.rounding);
                    }
                    product.categ = _.findWhere(self.product_categories, { 'id': product.categ_id[0] });
                    product.pos = self;
                    return new models.Product({}, product);
                } else {
                    // if(product.id in self.db.product_by_category_id[product.pos_categ_id[0]]){}
                    return new models.Product({}, product);
                }
            }));
        }
    }]);


    PosDb.include({
        add_products: function (products) {
            var stored_categories = this.product_by_category_id;
            var self = this;
            if (!products instanceof Array) {
                products = [products];
            }
            for (var i = 0, len = products.length; i < len; i++) {
                var product = products[i];
                if (product.id in self.product_by_id) continue;
                if (product.available_in_pos) {
                    var search_string = utils.unaccent(self._product_search_string(product));
                    product.product_tmpl_id = product.product_tmpl_id[0];
                    var sh_pos_categ_ids = product.sh_pos_categ_ids
                    for (var k = 0; k < sh_pos_categ_ids.length; k++) {
                        var pos_categ_id = sh_pos_categ_ids[k]
                        if (!stored_categories[pos_categ_id]) {
                            stored_categories[pos_categ_id] = [];
                        }

                        if (pos_categ_id != product.pos_categ_id[0]) {
                            stored_categories[pos_categ_id].push(product.id);
                        }

                        // console.log('is', pos_categ_id)
                        // console.log('is', stored_categories[pos_categ_id])
                        // if (!(product.id in stored_categories[pos_categ_id])) {
                        //     stored_categories[pos_categ_id].push(product.id);
                        // }


                        if (self.category_search_string[pos_categ_id] === undefined) {
                            self.category_search_string[pos_categ_id] = '';
                        }
                        self.category_search_string[pos_categ_id] += search_string;
                    }

                    var base_categ_id = product.pos_categ_id ? product.pos_categ_id[0] : self.root_category_id;
                    if (!stored_categories[base_categ_id]) {
                        stored_categories[base_categ_id] = [];
                    }
                    stored_categories[base_categ_id].push(product.id);

                    if (this.category_search_string[base_categ_id] === undefined) {
                        this.category_search_string[base_categ_id] = '';
                    }
                    this.category_search_string[base_categ_id] += search_string;

                    var ancestors = this.get_category_ancestors_ids(base_categ_id) || [];

                    for (var j = 0, jlen = ancestors.length; j < jlen; j++) {
                        var ancestor = ancestors[j];
                        if (!stored_categories[ancestor]) {
                            stored_categories[ancestor] = [];
                        }
                        stored_categories[ancestor].push(product.id);

                        if (this.category_search_string[ancestor] === undefined) {
                            this.category_search_string[ancestor] = '';
                        }
                        this.category_search_string[ancestor] += search_string;
                    }
                }
                self.product_by_id[product.id] = product;
                if (product.barcode) {
                    self.product_by_barcode[product.barcode] = product;
                }
            }
            this._super(products)
        }
    })
});
