const quantityRegex = /(?!0[0-9])^[0-9]*$/;
export const validQuantity = (inputValue, setFunction) => {
    if (inputValue === '' || quantityRegex.test(inputValue)) {
        setFunction(inputValue);
    } else {
        setFunction(inputValue.substring(0, inputValue.length - 1));
    }
}

export const roundNumbers = (value, powNumber = 2) => {
    return Math.round((value + Number.EPSILON) * Math.pow(10, powNumber)) / Math.pow(10, powNumber);
}

export const stringifyNumbers = (value, decimalPart = 2) => {
    let stringValue = value.toString();
    if (stringValue.indexOf('.') !== -1) {
        if (stringValue.length - stringValue.indexOf('.') > decimalPart) {
            return stringValue.substring(0, stringValue.indexOf('.') + decimalPart + 1);
        } else {
            let additionalZerosCount = decimalPart - (stringValue.length - stringValue.indexOf('.') - 1);
            while (additionalZerosCount) {
                stringValue += '0';
                additionalZerosCount--;
            }
            stringValue = stringValue.replace('.', ',');

            return stringValue;
        }
    } else {
        let additionString = ',';
        while (decimalPart) {
            additionString += '0';
            decimalPart--;
        }

        return stringValue + additionString;
    }
}