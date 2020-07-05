export interface MinCash {
    desc: string;
    value: number;
    piece: number;
};

export type Cash = MinCash[];

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