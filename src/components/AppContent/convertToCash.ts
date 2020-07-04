import { Cash } from '../types';

export function convertToCash(amount: number): Cash {
    let availableCash: Cash = [];
    
    let remainingAmount = amount;

    const allCashTypes = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];

    for (let i=0; i<allCashTypes.length; i++) {
        let currentValue = allCashTypes[i];
        let currentPieces = Math.trunc(remainingAmount / currentValue);
        
        if (currentPieces > 0) {
            availableCash.push({
                desc: `¥ ${currentValue}`,
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