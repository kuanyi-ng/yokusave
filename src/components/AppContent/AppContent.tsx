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
                <Col span={24}>
                    <Button type="primary" onClick={() => setShowSettings(true)}>
                        予算設定
                    </Button>
                    <Modal
                    title="予算設定"
                    centered
                    visible={showSettings}
                    onOk={() => setShowSettings(false)}
                    onCancel={() => setShowSettings(false)}
                    >
                        <Row style={{ margin: 16, alignItems: 'baseline' }}>　{/* 月の予算 */}
                            <Col span={4} style={{ textAlign: 'right', marginRight: 16 }}>1ヶ月</Col>
                            <Col span={15}>
                                <InputNumber
                                defaultValue={0}
                                formatter={value => `¥ ${value} /月`}
                                onChange={(value) => console.log(value)}
                                size="large"
                                style={{ width: 250 }} />
                            </Col>                            
                        </Row>
                        <Row style={{ margin: 16, alignItems: 'baseline' }}>　{/* 週の予算 */}
                            <Col span={4} style={{ textAlign: 'right', marginRight: 16 }}>1週間</Col>
                            <Col span={15}>
                                <InputNumber
                                defaultValue={0}
                                formatter={value => `¥ ${value} /週`}
                                onChange={(value) => console.log(value)}
                                size="large"
                                style={{ width: 250 }} />
                            </Col>
                        </Row>
                        <Row style={{ margin: 16, alignItems: 'baseline' }}> {/* 日の予算 */}
                            <Col span={5} style={{ textAlign: 'right', marginRight: 16 }}>1日</Col>
                            <Col span={15}>
                                <InputNumber
                                defaultValue={0}
                                formatter={value => `¥ ${value} /日`}
                                onChange={(value) => console.log(value)}
                                size="large"
                                style={{ width: 250 }} />
                            </Col>
                        </Row>
                    </Modal>
                </Col>
            </Row>
        </>
    );
}

export default AppContent;