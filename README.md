# textAmount
Convert a decimal amount value to it's long-form text representation.

For instance:
2523.04 converts to "Two thousand five hundred twenty-three and 04/100 dollars"

A standard use case may be the written dollar amount of a check.

textAmount.js is a node module that returns a single function for doing amount conversion. Note that due to precision limitations of JavaScript, the textAmount conversion method only supports values less than 10 trillion (1.0e13). (That's well beyond the IRS maximum check value limit.) Also, this conversion method does not support negative values. (If only writing negative checks was possible...)

``` sh
var textAmount = require('../textAmount');

var resultString = textAmount(amountValue [, localeObject]);

```
Parameters:
* amountValue - a string or number value to be converted
* localeObject - (optional) a locale object to override the defaultLocale object in the textAmount.js module


textAmountCl.js provides a CLI entry point for exercising textAmount.js from the command line (supports multiple arguments):

``` sh
node textAmountCl.js <value>

node textAmountCl.js <value1> <value2>

```

To run textAmount.js tests:

``` sh
npm install

npm run test


```
