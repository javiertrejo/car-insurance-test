const { assert, expect } = require('chai');
const rules = require('./sample/rules');
const Product = require('../src/entity/Product');
const PricingRules = require('../src/service/PricingRules');

describe('Pricing rules', () => {
    describe('#Constructor()', () => {

        it('The rules must be an Array', () => {
            assert.isArray((new PricingRules(rules)).rules);
        });

        it('Invalid parameters should be an error', () => {
            expect(() => {
                new PricingRules('error');
            }).to.throw(Error, 'Rules must be an Array');
        });
    });

    describe('#getPriceFactor()', () => {
        const pricingRules = new PricingRules(rules);

        it('When the sellIn is > 0 the factor must be -1', () => {
            const factor = pricingRules.getPriceFactor(new Product("My product", 1, 10));

            assert.equal(factor, -1);
        });

        it('When the sellIn is <= 0 the factor must be -2', () => {
            const factor = pricingRules.getPriceFactor(new Product("My product", -1, 10));

            assert.equal(factor, -2);
        });

        it('When a product is in a special list must be use the special pricing list', () => {
            const factor = pricingRules.getPriceFactor(new Product("Mega Coverage", -1, 10));

            assert.equal(factor, 0);
        });
    });

    describe('#getPriceLimit()', function () {
        const pricingRules = new PricingRules(rules);

        it('The price for generic rules shoud be at most 50', () => {
            const limit = pricingRules.getPriceLimit(new Product("Any product", -1, 10));

            assert.isAtMost(limit, 50);
        });

        it('Product without rules no have price limit', () => {
            const limit = pricingRules.getPriceLimit(new Product("Mega Coverage", -1, 10));

            assert.equal(limit, null);
        });
    });

    describe('#getUpdatedPrice()', () => {
        const pricingRules = new PricingRules(rules);

        it('Products with stopSell true, price should be zero when no day left', () => {
            const price = pricingRules.getUpdatedPrice(new Product("Special Full Coverage", 0, 10));

            assert.equal(price, 0);
        });

        it('The price should be greater or equal to zero', () => {
            const price = pricingRules.getUpdatedPrice(new Product("Any product", -1, 0));

            assert.isAtLeast(price, 0);
        });
    });
});