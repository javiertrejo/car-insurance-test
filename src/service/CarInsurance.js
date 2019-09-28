const Product = require('../entity/Product');
/**
 * Car Insurance Service
 */
class CarInsurance {
    /**
     * Create a new car insurance service
     *
     * @param {Product} products
     */
    constructor(products) {
        this.products = products;
    }

    /**
     * Set the pricing rules
     *
     * @param {array} rules
     * @returns {CarInsurance}
     */
    setPricingRules(rules) {
        this.pricingRules = rules;

        return this;
    }

    /**
     * Set the sellIn rules
     *
     * @param {Array} rules
     * @returns {CarInsurance}
     */
    setSellInRules(rules) {
        this.sellInRules = rules;

        return this;
    }

    /**
     * Update the product price based on the rules
     *
     * @returns {Product}
     */
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