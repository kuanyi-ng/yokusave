import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen } from './convertToCash';
import { StackedCash } from '../StackedCash';
import { BudgetForm } from '../BudgetForm';
import { Card, Statistic, Row, Col } from 'antd';
// Import Types, Interfaces
import { Cash, Budget, RemainingAmount } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './AppContent.css';

const AppContent: React.FC = () => {
    const [budget, setBudget] = useState<Budget>({ monthlyBudget: 0, weeklyBudget: 0, dailyBudget: 0 });
    const [remainingAmount, setRemainingAmount] = useState<RemainingAmount>({ monthlyRemaining: 0, weeklyRemaining: 0 , dailyRemaining: 0});
    const [cash, setCash] = useState<Cash>([]);

    useEffect( () => {
        let currentCash = convertToCash(remainingAmount.monthlyRemaining);
        setCash(currentCash);
        console.log(currentCash);
        console.log(budget);
        console.log(remainingAmount);
    }, [budget, remainingAmount]);

    const updateBudget = (newBudget: Budget) => {
        setBudget(newBudget);
        // update remaining amount
        setRemainingAmount({
            monthlyRemaining: newBudget.monthlyBudget - (budget.monthlyBudget - remainingAmount.monthlyRemaining),
            weeklyRemaining: newBudget.weeklyBudget - (budget.weeklyBudget - remainingAmount.weeklyRemaining),
            dailyRemaining: newBudget.dailyBudget - (budget.dailyBudget - remainingAmount.dailyRemaining)
        })
    }

    return (
        <>
            <h1>欲セーブ</h1>
            <Row gutter={16} style={{ margin: 16 }}>
                <Col span={24}>
                    <Card>
                        <Statistic title="残高" value={remainingAmount.monthlyRemaining} formatter={ val => formatYen(val as number) } />
                    </Card>
                </Col>
            </Row>
            {cash.length > 0 &&
                cash.map((cashType) => {
                    return (
                        <Row justify="center">
                            <Col span={24}>
                                <StackedCash 
                                desc={cashType.desc}
                                value={cashType.value}
                                piece={cashType.piece}/>
                            </Col>
                        </Row>
                    );
                })
            }
            <BudgetForm 
            handleFinish={ updateBudget }
            />
        </>
    );
}

export default AppContent;