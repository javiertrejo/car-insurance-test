/**
 * Product Entity
 */
class Product {
    /**
     * Create a new product instance
     * @param {string} name
     * @param {number} sellIn
     * @param {number} price
     */
    constructor(name, sellIn, price) {
        this.name = name;
        this.sellIn = sellIn;
        this.price = price;
    }
}

module.exports = Product;