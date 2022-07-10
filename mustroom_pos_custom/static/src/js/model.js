odoo.define("mustroom_pos_custom.model", function (require) {
    "use strict";
    var models = require("point_of_sale.models");
    // var core = require('web.core');
    var core = require('web.core');

    console.log("It is worked", models);
    models.Orderline = models.Orderline.extend({
        export_for_printing: function(){
            return {
                id: this.id,
                quantity:           this.get_quantity(),
                unit_name:          this.get_unit().name,
                is_in_unit:         this.get_unit().id == this.pos.uom_unit_id,
                price:              this.get_unit_display_price(),
                discount:           this.get_discount(),
                product_name:       this.get_product().display_name,
                product_name_wrapped: this.generate_wrapped_product_name(),
                price_lst:          this.get_lst_price(),
                display_discount_policy:    this.display_discount_policy(),
                price_display_one:  this.get_display_price_one(),
                price_display :     this.get_display_price(),
                price_with_tax :    this.get_price_with_tax(),
                price_without_tax:  this.get_price_without_tax(),
                price_with_tax_before_discount:  this.get_price_with_tax_before_discount(),
                tax:                this.get_tax(),
                product_description:      this.get_product().description,
                product_description_sale: this.get_product().description_sale,
                pack_lot_lines:      this.get_lot_lines(),
                note:                this.get_note(),
            };
        },
    });
});