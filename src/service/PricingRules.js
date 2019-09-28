class PricingRules {
    constructor(rules) {
        if(!Array.isArray(rules)) {
            throw Error("Rules must be an Array");
        }

        this.rules = rules;
    }

    getPriceFactor(sellIn) {
        let factor = 0;

        this.rules.map((rule) => {
            const str = sellIn + rule.condition + rule.sellInBase;

            if(eval(str)) {
                factor = rule.priceFactor;
            }
        });

        return factor;
    }
}

module.exports = PricingRules;