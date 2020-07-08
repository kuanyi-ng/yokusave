import { CashStack } from '../types';

type cashDescType = {
    [index: number]: string;
}

const cashDesc: cashDescType = {
    10000: "tenK",
    5000: "fiveK",
    1000: "oneK",
    500: "fiveH",
    100: "oneH",
    50: "fifty",
    10: "ten",
    5: "five",
    1: "one"
};

export function convertToCash(amount: number): CashStack {
    let availableCash: CashStack = [];
    
    let remainingAmount = amount;

    const allCashTypes = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];

    for (let i=0; i<allCashTypes.length; i++) {
        let currentValue = allCashTypes[i];
        let currentPieces = Math.trunc(remainingAmount / currentValue);
        
        if (currentPieces > 0) {
            availableCash.push({
                desc: cashDesc[currentValue],
                value: currentValue,
                piece: currentPieces
            });
        }

        remainingAmount = remainingAmount % currentValue;
    }
    
    if (remainingAmount <= 0) {
        console.log("Converted to cash!");
    } else {
        console.log("Something weird happened in the conversion.");
    }

    return availableCash;
}

export function formatYen(val: number) {
    return `¥ ${val}`;
}

export function formatPiece(val: number) {
    return `${val} 枚`;
}