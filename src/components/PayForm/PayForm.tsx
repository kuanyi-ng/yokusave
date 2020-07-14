import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, InputNumber } from 'antd';
// Import Types
import { NumberValidation } from '../types';
// Import Helper Functions
import { validateNumber } from '../helper';
// Import CSS
import 'antd/dist/antd.css';
import './PayForm.css';

interface PayFormProps {
    handleFinish: (payAmount: number) => void
}

const PayForm: React.FC<PayFormProps> = ({ handleFinish }) => {
    const [showPay, setShowPay] = useState<boolean>(false);

    const defaultValidation = {
        validateStatus: undefined, 
        errorMsg: undefined
    }

    const [payAmountValidation, setPayAmountValidation] = useState<NumberValidation>(defaultValidation);
    
    const payAmountInputProps = {
        style: {
            width: 300
        }
    };

    const onNumberChange = (value: number | string | undefined) => {
        if (value !== undefined) {
            setPayAmountValidation(validateNumber(value));
        }
    }

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
                onFinish={(value) => {
                    handleFinish(value.payAmount);
                    setShowPay(false);
                }}
                onFinishFailed={(value) => {
                    console.log("Cancelled", value);
                    setShowPay(false);
                }}
                >
                <Form.Item
                    label="支払金額"
                    name="payAmount"
                    rules={[{ required: true, message: '支払う金額を入力してください' }]}
                    validateStatus={payAmountValidation.validateStatus}
                    help={payAmountValidation.errorMsg}
                >
                    <InputNumber formatter={value => `¥ ${value}`} {...payAmountInputProps} onChange={onNumberChange}/>
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