import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen } from './convertToCash';
import { StackedCash } from '../StackedCash';
import { BudgetForm } from '../BudgetForm';
import { InputNumber, Card, Statistic, Row, Col } from 'antd';
// Import Types, Interfaces
import { Cash } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './AppContent.css';



const AppContent: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [cash, setCash] = useState<Cash>([]);

    useEffect( () => {
        let currentCash = convertToCash(amount);
        setCash(currentCash);
        console.log(currentCash);
    }, [amount]);

    const updateBudget = (budget: number) => {
        setAmount(budget);
    }

    return (
        <>
            <h1>欲セーブ</h1>
            <Row gutter={16} style={{ margin: 16 }}>
                <Col span={24}>
                    <InputNumber 
                    min={0} 
                    defaultValue={0}
                    size="large" 
                    style={{ width: 300 }}
                    formatter={ val => formatYen(val as number) }
                    onChange={ (val) => {
                        setAmount(val as number);
                        }
                    } />
                </Col>
            </Row>
            <Row gutter={16} style={{ margin: 16 }}>
                <Col span={24}>
                    <Card>
                        <Statistic title="残高" value={amount} formatter={ val => formatYen(val as number) } />
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