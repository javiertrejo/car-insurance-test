const { assert, expect } = require('chai');
const _ = require('lodash');

const Product = require('../src/entity/Product');
const CarInsurance = require('../src/service/CarInsurance');
const PricingRules = require('../src/service/PricingRules');
const SellInRules = require('../src/service/SelInRules');
const Products = require('./sample/SampleProducts');
const rules = require('./sample/rules');

describe('CarInsurance', () => {
    const originalProducts = _.cloneDeep(Products.SampleProducts);
    const carInsurance = new CarInsurance(Products.SampleProducts);

    describe('#constructor()', () => {
        it('Car insurance must have at least one product', () => {
            assert.isAbove(carInsurance.products.length, 1);
        });
    });

    describe('#updatePrice()', () => {
        let updatedProducts = [];

        it('Not set pricingRules should be return an error', () => {
            expect(() => {
                carInsurance.updatePrice();
            }).to.throw(Error, 'Missing rule sets to work');
        });

        it('The update price should be return an array of products', () => {
            carInsurance
                .setPricingRules(new PricingRules(rules))
                .setSellInRules(new SellInRules(rules));

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