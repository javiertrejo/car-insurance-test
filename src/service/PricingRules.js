const Product = require('../entity/Product');

/**
 * Pricing rules manager
 */
class PricingRules {
    /**
     * Create an instance of Pricing rule set
     *
     * @param {Object} config
     */
    constructor(config) {
        if (!Array.isArray(config.pricingRules)) {
            throw Error("Rules must be an Array");
        }

        this.rules = config.pricingRules;
        this.config = config;
        this.priceLimit = null;
    }

    /**
     * Resolve the rules to be used for the product
     *
     * @param {string} name
     * @returns {Array}
     */
    getRuleSet(name) {
        this.priceLimit = null;
        let rules = this.rules;

        if(name in this.config.specialProductsPricingRules) {
            rules = this.config.specialProductsPricingRules[name].pricingRules;
        }

        return rules;
    }

    /**
     * Resolve the price factor to apply for the product
     *
     * @param {Product} product
     * @returns {number}
     */
    getPriceFactor(product) {
        let factor = 0;

        this
            .getRuleSet(product.name)
            .map((rule) => {
                const str = product.sellIn + rule.condition + rule.sellInBase;

                if(eval(str)) {
                    factor = rule.priceFactor;

                    if('priceLimit' in rule) {
                        this.priceLimit = rule.priceLimit;
                    }
                }
            });

        return factor;
    }

    /**
     * Resolve the price limit for the product
     *
     * @param {Product} product
     * @returns {null|number}
     */
    getPriceLimit(product) {
        this.getPriceFactor(product);

        return this.priceLimit;
    }

    /**
     * Update the price for the product based on rules
     *
     * @param {Product} product
     * @returns {number}
     */
    getUpdatedPrice(product) {
        let newPrice = product.price + this.getPriceFactor(product);

        if(this.priceLimit !== null && newPrice > this.priceLimit) {
            newPrice = this.priceLimit;
        }

        return newPrice >= 0 ? newPrice : 0;
    }
}

module.exports = PricingRules;