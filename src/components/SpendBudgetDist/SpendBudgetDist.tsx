import React from 'react';
import Chart from 'react-apexcharts';
// Import Types
import { Budget, RemainingAmount } from '../types';

interface SpendBudgetDistProps {
    chartTitle: string;
    chartSubtitle: string;
    budget: Budget;
    remaining: RemainingAmount;
}

const SpendBudgetDist: React.FC<SpendBudgetDistProps> = ({ chartTitle, chartSubtitle, budget, remaining }) => {
    
    const spendBudgetRatio = (remaining: number, planned: number) => {
        return (planned - remaining) / planned * 100;
    }

    let monthlyRatio = spendBudgetRatio(remaining.monthlyRemaining, budget.monthlyBudget);
    let weeklyRatio = spendBudgetRatio(remaining.weeklyRemaining, budget.weeklyBudget);
    let dailyRatio = spendBudgetRatio(remaining.dailyRemaining, budget.dailyBudget);

    let xaxisCategory = [];
    for (let i=0; i<=100; i++) {
        xaxisCategory.push(i);
    }

    let dataSeries = [{
        name: 'ユーザー数',
        data: [
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
            0, 1, 1, 0, 2, 3, 2, 4, 0, 7,
            4, 6, 7, 6, 6, 6, 11, 9, 13, 11, 
            17, 6, 15, 13, 23, 15, 18, 16, 25, 17,
            23, 16, 28, 35, 26, 22, 31, 18, 24, 23,
            29, 36, 26, 33, 27, 21, 20, 21, 22, 15,
            24, 13, 9, 18, 13, 16, 13, 15, 15, 12, 
            8, 13, 7, 8, 5 ,13, 7, 5, 1, 4,
            5, 1, 1, 3, 3, 1, 0, 1, 1, 3,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
    }];

    let chartOptions = {
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        annotations: {
            xaxis: [{
                x: monthlyRatio,
                label: {
                    show: true,
                    offsetY: 0,
                    borderWidth: 0,
                    text: '今月',
                    style: {
                        color: '#000',
                        background: '#6cefad'
                    }
                }
            }, {
                x: weeklyRatio,
                label: {
                    show: true,
                    offsetY: 50,
                    borderWidth: 0,
                    text: '今週',
                    style: {
                        color: '#fff',
                        background: '#6c8def',
                    }
                }
            }, {
                x: dailyRatio,
                label: {
                    show: true,
                    offsetY: 100,
                    borderWidth: 0,
                    text: '今日',
                    style: {
                        color: '#fff',
                        background: '#ef6c6c'
                    }
                }
            }]
        },
        colors: ['#6EC9EF'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: chartTitle
        },
        subtitle: {
            text: chartSubtitle
        },
        xaxis: {
            type: 'numeric',
            categories: xaxisCategory,
            labels: {
                formatter: (val: number) => `${val}%`
            }
        }
    };

    

    return (
    <>
    <Chart 
    options={chartOptions}
    series={dataSeries}
    type='area'
    height={350}
    />    
    </>
    );
}

export default SpendBudgetDist;