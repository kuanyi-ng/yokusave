import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen, formatPiece} from './convertToCash';
import { StackedCash } from '../StackedCash';
import { InputNumber, Card, Statistic, Row, Col, Button, Modal } from 'antd';
// Import Types, Interfaces
import { Cash } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './AppContent.css';


const AppContent: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [cash, setCash] = useState<Cash>([]);
    const [showSettings, setShowSettings] = useState<boolean>(false);

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
            <Row justify="center">
                <Button type="primary" onClick={() => setShowSettings(true)}>
                    Vertically centered modal dialog
                </Button>
                <Modal
                title="Vertically centered modal dialog"
                centered
                visible={showSettings}
                onOk={() => setShowSettings(false)}
                onCancel={() => setShowSettings(false)}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </Row>
        </>
    );
}

export default AppContent;