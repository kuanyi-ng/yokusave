import React, { useState, useEffect } from 'react';
// Import Components
import { convertToCash , formatYen, formatPiece} from './convertToCash';
import { StackedCash } from '../StackedCash';
import { Input, InputNumber, Card, Statistic, Row, Col, Button, Modal, Form } from 'antd';
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
                </Col>
            </Row>
            <Modal
            title="予算設定"
            centered={true}
            visible={showSettings}
            footer={null}
            onCancel={() => setShowSettings(false)}
            >
                <Form
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="budget"
                size="large"
                hideRequiredMark={true}
                initialValues={{ monthlyBudget: 0, weeklyBudget: 0, dailyBudget: 0 }}
                onFinish={(val) => {
                    console.log(val);
                    setShowSettings(false);
                }}
                onFinishFailed={(val => {
                    console.log(val);
                    setShowSettings(false);
                })}
                >
                <Form.Item
                    label="1ヶ月"
                    name="monthlyBudget"
                    rules={[{ required: true, message: '今月の予算を入力してください' }]}
                >
                    <InputNumber defaultValue={0} formatter={value => `¥ ${value} /月`} style={{ width: 300 }}/>
                </Form.Item>

                <Form.Item
                    label="1週間"
                    name="weeklyBudget"
                    rules={[{ required: false }]}
                >
                    <InputNumber defaultValue={0} formatter={value => `¥ ${value} /週`} style={{ width: 300 }}/> 
                </Form.Item>

                <Form.Item
                    label="1日"
                    name="dailyBudget"
                    rules={[{ required: false }]}
                >
                    <InputNumber defaultValue={0} formatter={value => `¥ ${value} /日`} style={{ width: 300 }}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default AppContent;