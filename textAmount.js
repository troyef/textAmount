
var defaultLocale = {
	1: 'one',
	2: 'two',
	3: 'three',
	4: 'four',
	5: 'five',
	6: 'six',
	7: 'seven',
	8: 'eight',
	9: 'nine',
	10: 'ten',
	11: 'eleven',
	12: 'twelve',
	13: 'thirteen',
	14: 'fourteen',
	15: 'fifteen',
	16: 'sixteen',
	17: 'seventeen',
	18: 'eighteen',
	19: 'ninteteen',
	20: 'twenty',
	30: 'thirty',
	40: 'forty',
	50: 'fifty',
	60: 'sixty',
	70: 'seventy',
	80: 'eighty',
	90: 'ninety',
	HUNDRED: 'hundred',
	THOUSAND: 'thousand',
	MILLION: 'million',
	BILLION: 'billion',
	TRILLION: 'trillion',
	DOLLARS: 'dollars',
	AND: 'and',
  thousandGroups : ['','THOUSAND','MILLION','BILLION','TRILLION']
};

var setupLocaleFn = function setupLocaleFn(localObj){
	return function(key){
    if (key === ''){return '';}
		if (localObj.hasOwnProperty(key)){
			return localObj[key];
		} else {
			throw new Error('textAmount.js: No Locale string provided for "' + key + '".');
		}	
	};
};

var convertThousand = function convertThousand(amt, getLocaleText){
	var res = '';

	if (amt === 0){
		return '';
	}
  
  var hundred = Math.floor(amt / 100);
	res = (hundred > 0) ? getLocaleText(hundred) + ' ' + getLocaleText('HUNDRED') + ' ' : res;

	amt = amt % 100;
	if (amt === 0){
		return res;
	} else if (amt < 20){
		res += getLocaleText(amt) + ' ';
	} else {
		if (amt % 10 === 0){
			res += getLocaleText((Math.floor(amt / 10)) * 10) + ' ';
		} else {
			res += getLocaleText((Math.floor(amt / 10)) * 10) + '-' + getLocaleText(amt % 10) + ' ';	
		}
		
	}

	return res;
}

/**
 * Convert a numeric value to a long-form written dollar amount
 *
 * @param {number || string} numeric value to convert to text 
 * @param {object} (optional) object containing locale strings for overriding the defaultLocale object in its entirety
 * returns {string} text value of passed in number
 */
module.exports = function textAmount(amt, localeObj){
	var result = '',
	 grands = 0,
   parts, tmpStr, i, start,
   localeObj = localeObj || defaultLocale;
   getLocaleText = setupLocaleFn(localeObj);
   thousandGroups = localeObj.thousandGroups;

	//first we verify the input value is valid and ensure it is a number
	var reg = /^\d+(\.\d+)?$/;
	if (!reg.test(amt)){
		throw new Error('textAmount.js: Invalid input. Please pass in a number value.');
	}
	amt = String(amt).trim();

  //check the range of acceptable values - limited by JavaScript's available precision
  if (Number(amt) < 0 ){
    throw new Error('textAmount.js: Invalid input. Please pass in a positive number less than 10 trillion.');   
  }

	//handle the cents part
  parts = amt.split('.');
  
  if (parts.length === 1){
    if (Number(amt) < 1){
      result = String(Math.round((amt % 1) * 100));
    } else {
      result = '00';
    }
  } else {
    result = String(Math.round((Number('.' + parts[1])) * 100));
  }
	
  result = (result.length > 1) ? result : '0' + result; 
	result = result + '/100 ' + getLocaleText('DOLLARS');

	//handle the dollars part
  if (Number(amt) >= 1){
    result = getLocaleText('AND') + ' ' + result;
    i = parts[0].length - 3;
    while (i + 2 >= 0){
      start = (i < 0) ? 0 : i; 
      
      tmpStr = convertThousand(Number(parts[0].substring(start,i+3)), getLocaleText);
      if (tmpStr.length > 0){
        if (thousandGroups.length <= grands){
          throw new Error('textAmount.js: Invalid input. textAmount lacks the language support for a number that high.');   
        }

        result = tmpStr + getLocaleText(thousandGroups[grands]) + ((thousandGroups[grands] === '') ? '' : ' ') + result; 
      }
      grands++
      i = i - 3;
    }
  }

	//capitalize the first char of the result
  return String(result.substr(0,1).toUpperCase()) + String(result.substring(1));  
};
