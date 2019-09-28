const { CarInsurance, Product }= require('./src/index');
const Products = require('./test/sample/SampleProducts');

const carInsurance = new CarInsurance(Products.SampleProducts);
const productPrinter = function (product) {
    console.log(`${product.name}, ${product.sellIn}, ${product.price}`);
};

for (let i = 1; i <= 30; i += 1) {
    console.log(`Day ${i}`);
    console.log('name, sellIn, price');
    carInsurance.updatePrice().forEach(productPrinter);
    console.log('');
}