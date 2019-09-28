const Product = require('./entity/Product');
const CarInsurance = require('./service/CarInsurance');
const Products = require('../test/sample/SampleProducts');
const PricingRules = require('./service/PricingRules');
const SellInRules = require('./service/SelInRules');
const rules = require('../config/rules');

const carInsurance = new CarInsurance(Products.SampleProducts);

carInsurance
    .setPricingRules(new PricingRules(rules))
    .setSellInRules(new SellInRules(rules));

const productPrinter = function (product) {
    console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
};

for (let i = 1; i <= 30; i += 1) {
    console.log(`Day ${i}`);
    console.log('name, sellIn, price');
    carInsurance.updatePrice().forEach(productPrinter);
    console.log('');
}