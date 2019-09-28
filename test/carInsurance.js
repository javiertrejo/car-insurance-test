const { assert } = require('chai');
const Product = require('../src/entity/Product');
const CarInsurance = require('../src/service/CarInsurance');
const Products = require('./sample/SampleProducts');

describe('CarInsurance', () => {
    const carInsurance = new CarInsurance(Products.SampleProducts);

    describe('#constructor()', () => {
        it('Car insurance must have at least one product', () => {
            assert.isAbove(carInsurance.products.length, 1);
        });
    });

    describe('#updatePrice()', () => {
        it('The update price should be return an array of products', () => {
           assert.isArray(carInsurance.updatePrice());
        });
    });
});