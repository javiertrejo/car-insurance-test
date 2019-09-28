class PricingRules {
    constructor(config) {
        if (!Array.isArray(config.pricingRules)) {
            throw Error("Rules must be an Array");
        }

        this.rules = config.pricingRules;
        this.config = config;
        this.priceLimit = null;
    }

    getRuleSet(name) {
        this.priceLimit = null;
        let rules = this.rules;

        if(name in this.config.specialProductsPricingRules) {
            rules = this.config.specialProductsPricingRules[name].pricingRules;
        }

        return rules;
    }

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

                    if('stopSell' in rule) {
                        this.priceLimit = 0;
                    }
                }
            });

        return factor;
    }

    getPriceLimit(product) {
        this.getPriceFactor(product);

        return this.priceLimit;
    }

    getUpdatedPrice(product) {
        let newPrice = product.price + this.getPriceFactor(product);

        if(this.priceLimit !== null && newPrice > this.priceLimit) {
            newPrice = this.priceLimit;
        }

        return newPrice >= 0 ? newPrice : 0;
    }
}

module.exports = PricingRules;