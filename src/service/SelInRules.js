class SellInRules {
    constructor(config) {
        this.config = config;
    }

    getFactor(product) {
        let factor = this.config.sellInRules.sellInFactor;
        if(product.name in this.config.specialProductsSellInRules) {
            factor = this.config.specialProductsSellInRules[product.name].sellInRules.sellInFactor;
        }

        return factor;
    }
}

module.exports = SellInRules;