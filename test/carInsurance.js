const { assert } = require('chai');
const _ = require('lodash');

const Product = require('../src/entity/Product');
const CarInsurance = require('../src/service/CarInsurance');
const PricingRules = require('../src/service/PricingRules');
const SellInRules = require('../src/service/SelInRules');
const Products = require('./sample/SampleProducts');
const rules = require('./sample/rules');

describe('CarInsurance', () => {
    const originalProducts = _.cloneDeep(Products.SampleProducts);
    const carInsurance = new CarInsurance(Products.SampleProducts, new PricingRules(rules), new SellInRules(rules));

    describe('#constructor()', () => {
        it('Car insurance must have at least one product', () => {
            assert.isAbove(carInsurance.products.length, 1);
        });
    });

    describe('#updatePrice()', () => {
        let updatedProducts = [];

        it('The update price should be return an array of products', () => {
            updatedProducts = carInsurance.updatePrice();

            assert.isArray(updatedProducts);
        });

        it('Each product price should be original_price + factor', function () {
            updatedProducts.map((product, index) => {
                const oldProduct = originalProducts[index];
                const pricingRules = new PricingRules(rules);

                assert.equal(pricingRules.getUpdatedPrice(oldProduct), product.price);
            });
        });

        it('Each product price should be greater or equal to zero', function () {
            updatedProducts.map((product, index) => {
                assert.isAtLeast(product.price, 0);
            });
        });
    });
});