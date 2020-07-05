import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, InputNumber } from 'antd';
// Import CSS
import 'antd/dist/antd.css';

const PayForm: React.FC = () => {
    const [showPay, setShowPay] = useState<boolean>(false);
    
    const payAmountInputProps = {
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
                onClick={() => setShowPay(true)}>
                    支払い(デモ用)
                </Button>
            </Col>
        </Row>
        <Modal
        title="支払い"
        centered={true}
        visible={showPay}
        footer={null}
        onCancel={() => setShowPay(false)}
        >
            <Row justify="center">
                <Form
                layout="vertical"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                name="pay"
                size="large"
                hideRequiredMark={true}
                initialValues={{ monthlyBudget: 0, weeklyBudget: 0, dailyBudget: 0 }}
                onFinish={(value) => {
                    // handleFinish(budget as Budget);
                    console.log(value);
                    setShowPay(false);
                }}
                onFinishFailed={(val) => {
                    console.log("Cancelled", val);
                    setShowPay(false);
                }}
                >
                <Form.Item
                    label="支払金額"
                    name="payAmount"
                    rules={[{ required: true, message: '支払う金額を入力してください' }]}
                >
                    <InputNumber formatter={value => `¥ ${value}`} {...payAmountInputProps} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    支払う
                    </Button>
                </Form.Item>
                </Form>
            </Row>
        </Modal>
        </>
    );
}

export default PayForm;