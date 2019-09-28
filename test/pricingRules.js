const { assert, expect } = require('chai');
const config = require('../config/rules');
const PricingRules = require('../src/service/PricingRules');

describe('Pricing rules', () => {
    describe('#Constructor()', () => {

        it('The rules must be an Array', () => {
            assert.isArray((new PricingRules(config.pricingRules)).rules);
        });

        it('Invalid parameters should be an error', () => {
            expect(() => {
                new PricingRules('error');
            }).to.throw(Error, 'Rules must be an Array');
        });
    });

    describe('#getPriceFactor()', () => {
        const pricingRules = new PricingRules(config.pricingRules) ;

        it('When the sellIn is > 0 the factor must be 1', () => {
            const factor = pricingRules.getPriceFactor(10);

            assert.equal(factor, 1);
        });

        it('When the sellIn is <= 0 the factor must be 2', () => {
            const factor = pricingRules.getPriceFactor(-18);

            assert.equal(factor, 2);
        });
    });
});