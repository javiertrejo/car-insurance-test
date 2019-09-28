const assert = require('assert');
const Product = require('../src/entity/Product');

describe('Product', () => {
    describe('#Constructor()', () => {
        const product = new Product('Medium Coverage', 10, 20);

        it('Product name shoud be "Medium Coverage"', () => {
            assert.equal("Medium Coverage", product.name);
        });

        it('Product sellIn shoud be 10 days', () => {
            assert.equal(10, product.sellIn);
        });

        it('Product price shoud be 20', () => {
            assert.equal(20, product.price);
        });
    });
});