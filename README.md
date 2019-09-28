# Car Insurance Test

## Description
The refactor provides a configurable set of rules to make the price and salein calculation.
All required rules are present in the _config/rules.json_ file.
The new architecture provides a way to scale the software with new products adding a set of rules for generic and specific products.
The PricingRule and SaleInRule classes provides more flexibility to add new features with new calculation variables

## Configuration file
The configuration file has 4 sections

```json
{
    "pricingRules": [],
    "specialProductsPricingRules": {},
    "sellInRules": {},
    "specialProductsSellInRules": {}
}
```

##### Pricing Rules
The pricing rules is an array of the default rules to be used in the pricing calculation

```json
{
    "condition": ">=",
    "sellInBase": 1,
    "priceFactor": -1,
    "priceLimit": 50
}
```
The parameters for a pricing rule are:

* __condition:__ Any valid operator Ej.: >, >=, <, <=, =
* __sellInBase:__ The value of product.sellIn to make the comparation. Ej.: product.sellIn <= sellInBase
* __priceFactor:__ The valut to increate o decrease the price. Ej.: 1, -2, etc.
* __priceLimit:__ The max price amount. If the new price is greater than the priceLimit the priceLimit is setted as new price. 

##### SpecialProductsPricingRules
The special pricing rules is used to apply pricing rules to specific products. 

For example, "Mega Coverage" overrides the default rules with an empty set of rules; but, "Super Sale" has his own price rule set.

```json
{
  //... other properties

  "specialProductsPricingRules": {
    "Mega Coverage": {
      "pricingRules": []
    },
    "Super Sale":  {
      "pricingRules": [
          {
            "condition": ">=",
            "sellInBase": 0,
            "priceFactor": -2,
            "priceLimit": 50
          }
      ]
    }
  }
}
```

##### sellInRules
This is the default rule to make the sellIn calculations.

```json
{
  //... other properties

  "sellInRules": {
    "sellInFactor": -1
  }
    
}
```

* __selInFactor:__ The factor to decrease or increase the sellIn days

##### specialProductsSellInRules
The special sellIn rules is used to apply rules to specific products. 

For example, "Mega Coverage" overrides the default sellInFactor with a new with 0 as value 

```json
{
  //... other properties

  "specialProductsSellInRules": {
    "Mega Coverage": {
      "sellInRules": {
        "sellInFactor": 0
      }
    }
  }
}
```

For a full example of rules see the productive config file in __./config/rules.json__.

## Installation

To run the script and tests it's necessary install dependencies

```javascript
yarn install
```
The Docker file allow to build an image to run the production script. The Dev Dependencies not loaded.

## Running tests

Run tests and verify all tests pass
At the end of the tests can see the code coverage

```javascript
yarn test
```

## Code Coverage
```text
--------------------------------|----------|----------|----------|----------|-------------------|
File                            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
--------------------------------|----------|----------|----------|----------|-------------------|
All files                       |      100 |      100 |      100 |      100 |                   |
 car-insurance-test             |      100 |      100 |      100 |      100 |                   |
  tests.js                      |      100 |      100 |      100 |      100 |                   |
 car-insurance-test/src/entity  |      100 |      100 |      100 |      100 |                   |
  Product.js                    |      100 |      100 |      100 |      100 |                   |
 car-insurance-test/src/service |      100 |      100 |      100 |      100 |                   |
  CarInsurance.js               |      100 |      100 |      100 |      100 |                   |
  PricingRules.js               |      100 |      100 |      100 |      100 |                   |
  SelInRules.js                 |      100 |      100 |      100 |      100 |                   |
--------------------------------|----------|----------|----------|----------|-------------------|
```