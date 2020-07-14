import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash } from './convertToCash';
import { BudgetForm } from '../BudgetForm';
import { PayForm } from '../PayForm';
import { RemainingCash } from '../RemainingCash';
import { Row, Col, Tabs } from 'antd';
// Import Types, Interfaces
import { Cash, Budget, RemainingAmount } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './AppContent.css';

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
            <h1 className="app-title">欲セーブ</h1>
            <Row gutter={16} style={{ marginLeft: 16, marginRight: 16 }}>
                <Col span={24}>
                    <Tabs 
                    defaultActiveKey="daily" 
                    centered={true} 
                    size="large"
                    tabPosition="bottom"
                    animated={true}
                    >
                        <Tabs.TabPane tab="月" key="monthly">
                            <RemainingCash
                            statsTitle={"1ヶ月"}
                            remaining={remainingAmount.monthlyRemaining}
                            original={budget.monthlyBudget}
                            tabName={"month"}
                            cashStack={cash.monthlyCash}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="週" key="weekly">
                            <RemainingCash
                            remaining={remainingAmount.weeklyRemaining}
                            original={budget.weeklyBudget}
                            statsTitle={"1週間"} 
                            tabName={"week"}
                            cashStack={cash.weeklyCash}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="日" key="daily">
                            <RemainingCash
                            remaining={remainingAmount.dailyRemaining}
                            original={budget.dailyBudget}
                            statsTitle={"1日"} 
                            tabName={"day"}
                            cashStack={cash.dailyCash}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Row className="menu-bar">
                <BudgetForm 
                handleFinish={ updateBudget }
                />
                <PayForm 
                handleFinish={ updateRemainingAmount }/>
            </Row>
        </>
    );
}

export default AppContent;