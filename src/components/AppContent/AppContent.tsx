import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen } from './convertToCash';
import { StackedCash } from '../StackedCash';
import { BudgetForm } from '../BudgetForm';
import { PayForm } from '../PayForm';
import { Card, Statistic, Row, Col, Tabs } from 'antd';
// Import Types, Interfaces
import { Cash, Budget, RemainingAmount, CashStack } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './AppContent.css';
import { RemainingCash } from '../RemainingCash';

const AppContent: React.FC = () => {
    const [budget, setBudget] = useState<Budget>({ monthlyBudget: 0, weeklyBudget: 0, dailyBudget: 0 });
    const [remainingAmount, setRemainingAmount] = useState<RemainingAmount>({ monthlyRemaining: 0, weeklyRemaining: 0 , dailyRemaining: 0});
    const [cash, setCash] = useState<Cash>({ monthlyCash: [], weeklyCash: [], dailyCash: [] });

    useEffect( () => {
        let remainingCash: Cash = {
            monthlyCash: convertToCash(remainingAmount.monthlyRemaining),
            weeklyCash: convertToCash(remainingAmount.weeklyRemaining),
            dailyCash: convertToCash(remainingAmount.dailyRemaining)
        }
        setCash(remainingCash);
        
        console.log(remainingCash);
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

    const updateRemainingAmount = (payAmount: number) => {
        setRemainingAmount({
            monthlyRemaining: remainingAmount.monthlyRemaining - payAmount,
            weeklyRemaining: remainingAmount.weeklyRemaining - payAmount,
            dailyRemaining: remainingAmount.dailyRemaining - payAmount
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
            <Tabs defaultActiveKey="daily" centered tabPosition="bottom">
                <Tabs.TabPane tab="月" key="monthly">
                   {cash.monthlyCash.length > 0 &&
                    cash.monthlyCash.map((cashType) => {
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
                </Tabs.TabPane>
                <Tabs.TabPane tab="日" key="daily">
                   {cash.dailyCash.length > 0 &&
                    cash.dailyCash.map((cashType) => {
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
                </Tabs.TabPane>
                <Tabs.TabPane tab="週" key="weekly">
                   {cash.weeklyCash.length > 0 &&
                    cash.weeklyCash.map((cashType) => {
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
                </Tabs.TabPane>
            </Tabs>
            <div className="menu-bar">
                <BudgetForm 
                handleFinish={ updateBudget }
                />
                <PayForm 
                handleFinish={ updateRemainingAmount }/>
            </div>
        </>
    );
}

export default AppContent;