const { assert, expect } = require('chai');
const rules = require('../config/rules');
const Product = require('../src/entity/Product');
const SellInRules = require('../src/service/SelInRules');

describe('SellIn rules', () => {
    const sellInRule = new SellInRules(rules);

    describe('#Constructor()', () => {
    });

    describe('#getFactor()', () => {
        it('The generic sellIn rule should be -1', () => {
            const factor = sellInRule.getFactor(new Product( 'Some product', 10, 10));

            assert.equal(factor, -1);
        })

        it('A special product should be use your oun sellIn rule. Mega Coverage should be 0', () => {
            const factor = sellInRule.getFactor(new Product( 'Mega Coverage', 10, 10));

            assert.equal(factor, 0);
        });
    });
});