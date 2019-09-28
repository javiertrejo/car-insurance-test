class CarInsurance {
    constructor(products = [], pricingRules = null) {
        this.products = products;
        this.pricingRules = pricingRules;
    }

    updatePrice() {
        this.products.map((product) => {
            product.price = this.pricingRules.getUpdatedPrice(product);
            product.sellIn -= 1;
        });

        return this.products
    }
}

module.exports = CarInsurance;