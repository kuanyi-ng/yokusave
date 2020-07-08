export interface PiecesOfCash {
    desc: string;
    value: number;
    piece: number;
};

export type CashStack = PiecesOfCash[];

export interface Cash {
    monthlyCash: CashStack;
    weeklyCash: CashStack;
    dailyCash: CashStack;
}

export interface Budget {
    monthlyBudget: number;
    weeklyBudget: number;
    dailyBudget: number;
}

export interface RemainingAmount {
    monthlyRemaining: number;
    weeklyRemaining: number;
    dailyRemaining: number;
}