import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen, formatPiece} from './convertToCash';
import { StackedCash } from '../StackedCash';
import { InputNumber, Card, Statistic, Row, Col, Button } from 'antd';
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
                    <Card title="現金">
                    {cash.map((cashType) => {
                        return (
                            <Statistic
                            key={cashType.desc} 
                            title={cashType.desc} 
                            value={cashType.piece} 
                            formatter={ val => formatPiece(val as number) } />
                        );                        
                    })}
                    </Card>
                    
                    <Button style={{ marginTop: 16 }} type="primary">
                        Recharge
                    </Button>
                </Col>
            </Row>
            <Row gutter={16} style={{ margin: 16 }} justify="center">
                <Col span={24}>
                    {cash.length > 0 &&
                        <StackedCash
                            desc={cash[0].desc}
                            value={cash[0].value}
                            piece={cash[0].piece}
                    />}
                </Col>
            </Row>
        </>
    );
}

export default AppContent;