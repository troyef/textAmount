var assert = require('assert');
var textAmount = require('../textAmount');


describe('textAmount', function() {
  it('textAmount should be a function', function () {
    assert.equal(typeof textAmount , 'function');
  });

  it('missing Locale properties should throw error', function(){
    assert.throws(function(){
      textAmount(0.13, {});
    } , Error, 'textAmount.js: No Locale string provided for "DOLLARS".');
  });

  var testLocale = {
    1: 'ONE',
    2: 'TWO',
    3: 'THREE',
    4: 'FOUR',
    5: 'FIVE',
    6: 'SIX',
    7: 'SEVEN',
    8: 'EIGHT',
    9: 'NINE',
    10: 'TEN',
    11: 'ELEVEN',
    12: 'TWELVE',
    13: 'THIRTEEN',
    14: 'FOURTEEN',
    15: 'FIFTEEN',
    16: 'SIXTEEN',
    17: 'SEVENTEEN',
    18: 'EIGHTEEN',
    19: 'NINTETEEN',
    20: 'TWENTY',
    30: 'THIRTY',
    40: 'FORTY',
    50: 'FIFTY',
    60: 'SIXTY',
    70: 'SEVENTY',
    80: 'EIGHTY',
    90: 'NINETY',
    HUNDRED: 'HUNDRED',
    THOUSAND: 'THOUSAND',
    MILLION: 'MILLION',
    BILLION: 'BILLION',
    TRILLION: 'TRILLION', 
    DOLLARS: 'DOLLARS',
    AND: 'AND'
  };

  it('should work with passed in locale object', function () {
      assert.equal( textAmount(9876543212345.67,testLocale), 'NINE TRILLION EIGHT HUNDRED SEVENTY-SIX BILLION FIVE HUNDRED FORTY-THREE MILLION TWO HUNDRED TWELVE THOUSAND THREE HUNDRED FORTY-FIVE AND 67/100 DOLLARS');
  });

  describe('invalid input argument should throw error', function(){
    
    it('undefined input should throw an error', function () {
      assert.throws(function(){
        textAmount();
      } , Error, 'textAmount.js: Invalid input. Please pass in a number value.');
    });

    it('null input should throw an error', function () {
      assert.throws(function(){
        textAmount(null);
      } , Error, 'textAmount.js: Invalid input. Please pass in a number value.');
    });

    it('non-numeric input should throw an error', function () {
      assert.throws(function(){
        textAmount('abc');
      } , Error, 'textAmount.js: Invalid input. Please pass in a number value.');
    });

    it('a negative number input should throw an error', function () {
      assert.throws(function(){
        textAmount(-123.45);
      } , Error, 'textAmount.js: Invalid input. Please pass in a positive number less than 10 trillion.');
    });

    it('a number input over 10 trillon should throw an error', function () {
      assert.throws(function(){
        textAmount(1.00e13);
      } , Error, 'textAmount.js: Invalid input. Please pass in a positive number less than 10 trillion.');
    });

  });

  describe('private method convertThousand should return expected results', function(){
    it('input 1', function () {
      assert.equal( textAmount(1), 'One and 00/100 dollars');
    });

    it('input 10', function () {
      assert.equal( textAmount(13), 'Thirteen and 00/100 dollars');
    });

    it('input 60', function () {
      assert.equal( textAmount(60), 'Sixty and 00/100 dollars');
    });

    it('input 23', function () {
      assert.equal( textAmount(23), 'Twenty-three and 00/100 dollars');
    });

    it('input 400', function () {
      assert.equal( textAmount(400), 'Four hundred and 00/100 dollars');
    });

    it('input 402', function () {
      assert.equal( textAmount(402), 'Four hundred two and 00/100 dollars');
    });

    it('input 823', function () {
      assert.equal( textAmount(823), 'Eight hundred twenty-three and 00/100 dollars');
    });
  });

  describe('zero and fractional dollar amounts should return expected results', function(){
    it('input: 0', function () {
      assert.equal( textAmount(0), '00/100 dollars');
    });

    it('input .5 - test for no leading 0', function () {
      assert.equal( textAmount(.5), '50/100 dollars');
    });

    it('input 0.5 - test for leading 0', function () {
      assert.equal( textAmount(0.5), '50/100 dollars');
    });

    it('input 0.05 - test for 0 tenth place', function () {
      assert.equal( textAmount(0.05), '05/100 dollars');
    });

    it('input 0.55 - test for 2 decimals', function () {
      assert.equal( textAmount(0.55), '55/100 dollars');
    });

    it('input 0.5567 - test for rounded value for more than 2 decimals', function () {
      assert.equal( textAmount(0.5567), '56/100 dollars');
    });
  });

  describe('thousand multiples should return expected results', function(){

    it('input 1000', function () {
      assert.equal( textAmount(1000), 'One thousand and 00/100 dollars');
    });

    it('input 20000', function () {
      assert.equal( textAmount(20000), 'Twenty thousand and 00/100 dollars');
    });

    it('input 300000', function () {
      assert.equal( textAmount(300000), 'Three hundred thousand and 00/100 dollars');
    });

    it('input 4000000', function () {
      assert.equal( textAmount(4000000), 'Four million and 00/100 dollars');
    });

    it('input 50000000', function () {
      assert.equal( textAmount(50000000), 'Fifty million and 00/100 dollars');
    });

    it('input 600000000', function () {
      assert.equal( textAmount(600000000), 'Six hundred million and 00/100 dollars');
    });

    it('input 7000000000', function () {
      assert.equal( textAmount(7000000000), 'Seven billion and 00/100 dollars');
    });

    it('input 80000000000', function () {
      assert.equal( textAmount(80000000000), 'Eighty billion and 00/100 dollars');
    });

    it('input 900000000000', function () {
      assert.equal( textAmount(900000000000), 'Nine hundred billion and 00/100 dollars');
    });

    it('input 1000000000000', function () {
      assert.equal( textAmount(1000000000000), 'One trillion and 00/100 dollars');
    });
  });

  describe('valid test cases should return expected results', function(){

    it('input 1000000000000.01', function () {
      assert.equal( textAmount(1000000000000.01), 'One trillion and 01/100 dollars');
    });

    it('input 9876543212345.67', function () {
      assert.equal( textAmount(9876543212345.67), 'Nine trillion eight hundred seventy-six billion five hundred forty-three million two hundred twelve thousand three hundred forty-five and 67/100 dollars');
    });

    it('input 9999999999999.99', function () {
      assert.equal( textAmount(9999999999999.99), 'Nine trillion nine hundred ninety-nine billion nine hundred ninety-nine million nine hundred ninety-nine thousand nine hundred ninety-nine and 99/100 dollars');
    });

    it('input 2523.04 - RS example test', function () {
      assert.equal( textAmount(2523.04), 'Two thousand five hundred twenty-three and 04/100 dollars');
    });


  });
  
});