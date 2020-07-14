import { NumberValidation } from './types';

export const validateNumber = (number: number | string) => {
    const numberReg: RegExp =  /^[0-9]*$/;

    let validateResult: NumberValidation = {
        validateStatus: 'success',
        errorMsg: undefined 
    }
    
    if (!(numberReg.test(number as string))) {
        validateResult = {
            validateStatus: 'error',
            errorMsg: '数字のみを入力してください'
        }
    }

    return validateResult;
}