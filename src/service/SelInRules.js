const Product = require('../entity/Product');

/**
 * SellIn rules manager
 */
class SellInRules {
    /**
     * Create an instance of Pricing rule set
     *
     * @param {Object} config
     */
    constructor(config) {
        this.config = config;
    }

    /**
     * Resolve the sellIn factor
     *
     * @param {Product} product
     * @returns {number}
     */
    getFactor(product) {
        let factor = this.config.sellInRules.sellInFactor;
        if(product.name in this.config.specialProductsSellInRules) {
            factor = this.config.specialProductsSellInRules[product.name].sellInRules.sellInFactor;
        }

        return factor;
    }
}

module.exports = SellInRules;