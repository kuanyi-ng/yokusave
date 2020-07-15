import React from 'react';
import Chart from 'react-apexcharts';
// Import Types
import { Budget, RemainingAmount } from '../types';
// Import CSS

interface SpendBudgetBarProps {
    chartTitle: string;
    budget: Budget;
    remaining: RemainingAmount;
}

const SpendBudgetBar: React.FC<SpendBudgetBarProps> = ({ chartTitle, budget, remaining }) => {

    let dataSeries = [{
        name: '支出',
        data: [
            budget.monthlyBudget - remaining.monthlyRemaining, 
            budget.weeklyBudget - remaining.weeklyRemaining,
            budget.dailyBudget - remaining.dailyRemaining
        ]
    }, {
        name: '予算残高',
        data: [
            remaining.monthlyRemaining, 
            remaining.weeklyRemaining,
            remaining.dailyRemaining
        ]
    }];

    let chartOptions = {
        chart: {
            type: 'bar',
            height: 200,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false
            },
            zoom: {
                enable: false
            }
        },
        colors: ["#ef6c6c", "#6cef8d"],
        plotOptions: {
            bar: {
                horizontal: true
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: chartTitle
        },
        xaxis: {
            categories: ['今月', '今週', '今日'],
        },
        fill: {
            opacity: 1  
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
        }
    };

    return (
    <>
    <Chart 
    options={chartOptions}
    series={dataSeries}
    type='bar'
    height={200}
    />
    </>
    );
}

export default SpendBudgetBar;