class CarInsurance {
    constructor(products) {
        this.products = products;
    }

    setPricingRules(rules) {
        this.pricingRules = rules;

        return this;
    }

    setSellInRules(rules) {
        this.sellInRules = rules;

        return this;
    }

    updatePrice() {
        if(this.pricingRules === undefined || this.sellInRules === undefined) {
            throw Error('Missing rule sets to work');
        }

        this.products.map((product) => {
            product.price = this.pricingRules.getUpdatedPrice(product);
            product.sellIn += this.sellInRules.getFactor(product);
        });

        return this.products
    }
}

module.exports = CarInsurance;