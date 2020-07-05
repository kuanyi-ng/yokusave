import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, InputNumber } from 'antd';
// Import Types
import { Budget } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './BudgetForm.css';

interface BudgetFormProps {
    handleFinish: (newBudget: Budget) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ handleFinish }) => {
    const [showSettings, setShowSettings] = useState<boolean>(false);

    const budgetInputProps = {
        style: {
            width: 300
        }
    };

    return (
        <>
        <Row justify="center" style={{ margin: 16 }}>
            <Col span={24}>
                <Button 
                type="default"
                style={{ width: 150 }}
                onClick={() => setShowSettings(true)}>
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
            <Row justify="center">
                <Form
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="budget"
                size="large"
                hideRequiredMark={true}
                initialValues={{ monthlyBudget: 0, weeklyBudget: 0, dailyBudget: 0 }}
                onFinish={(budget) => {
                    handleFinish(budget as Budget);
                    setShowSettings(false);
                }}
                onFinishFailed={(val) => {
                    console.log("Cancelled", val);
                    setShowSettings(false);
                }}
                >
                <Form.Item
                    label="1ヶ月"
                    name="monthlyBudget"
                    rules={[{ required: true, message: '今月の予算を入力してください' }]}
                >
                    <InputNumber formatter={value => `¥ ${value} /月`} {...budgetInputProps}/>
                </Form.Item>

                <Form.Item
                    label="1週間"
                    name="weeklyBudget"
                    rules={[{ required: false }]}
                >
                    <InputNumber formatter={value => `¥ ${value} /週`} {...budgetInputProps} /> 
                </Form.Item>

                <Form.Item
                    label="1日"
                    name="dailyBudget"
                    rules={[{ required: false }]}
                >
                    <InputNumber formatter={value => `¥ ${value} /日`} {...budgetInputProps}/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    確定
                    </Button>
                </Form.Item>
                </Form>
            </Row>
        </Modal>
        </>
    );
}

export default BudgetForm;