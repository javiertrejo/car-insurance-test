class CarInsurance {
    constructor(products, pricingRules, sellInRules) {
        this.products = products;
        this.pricingRules = pricingRules;
        this.sellInRules = sellInRules;
    }

    updatePrice() {
        this.products.map((product) => {
            product.price = this.pricingRules.getUpdatedPrice(product);
            product.sellIn += this.sellInRules.getFactor(product);
        });

        return this.products
    }
}

module.exports = CarInsurance;