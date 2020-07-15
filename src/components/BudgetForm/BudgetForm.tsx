import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, InputNumber } from 'antd';
// Import Types
import { Budget, NumberValidation } from '../types';
// Import Helper Functions
import { validateNumber } from '../helper';
// Import CSS
import 'antd/dist/antd.css';
import './BudgetForm.css';

interface BudgetFormProps {
    handleFinish: (newBudget: Budget) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ handleFinish }) => {
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [formMsg, setFormMsg] = useState<string>("");

    const defaultValidation = {
        validateStatus: undefined, 
        errorMsg: undefined
    }

    const [monthValidation, setMonthValidation] = useState<NumberValidation>(defaultValidation);
    const [weekValidation, setWeekValidation] = useState<NumberValidation>(defaultValidation); 
    const [dayValidation, setDayValidation] = useState<NumberValidation>(defaultValidation);

    const budgetInputProps = {
        style: {
            width: 300
        }
    };

    const onMonthNumberChange = (value: number | string | undefined) => {
        if (value !== undefined) {
            setMonthValidation(validateNumber(value));
        }
    }
    const onWeekNumberChange = (value: number | string | undefined) => {
        if (value !== undefined) {
            setWeekValidation(validateNumber(value));
        }
    }
    const onDayNumberChange = (value: number | string | undefined) => {
        if (value !== undefined) {
            setDayValidation(validateNumber(value));
        }
    }

    const onFormSubmit = (budget: Budget) => {
        // check if budget is practical
        let checkMonth = budget.monthlyBudget >= budget.weeklyBudget;
        let checkDaily = budget.weeklyBudget >= budget.dailyBudget;
        if (checkMonth && checkDaily) {
            setFormMsg("");
            handleFinish(budget);
            setShowSettings(false);
        } else {
            setFormMsg("短期間の予算が長期間の予算より多い。");
        }
    }

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
                onFinish={(budget) => {
                    onFormSubmit(budget as Budget)}
                }
                onFinishFailed={(val) => {
                    console.log("Cancelled", val);
                    setShowSettings(false);
                }}
                >
                <Form.Item
                    label="1ヶ月"
                    name="monthlyBudget"
                    rules={[{ required: true, message: '今月の予算を入力してください' }]}
                    validateStatus={monthValidation.validateStatus}
                    help={monthValidation.errorMsg}
                >
                    <InputNumber formatter={value => `¥ ${value} /月`} {...budgetInputProps} onChange={onMonthNumberChange}/>
                </Form.Item>

                <Form.Item
                    label="1週間"
                    name="weeklyBudget"
                    rules={[{ required: true, message: '今週の予算を入力してください' }]}
                    validateStatus={weekValidation.validateStatus}
                    help={weekValidation.errorMsg}
                >
                    <InputNumber formatter={value => `¥ ${value} /週`} {...budgetInputProps} onChange={onWeekNumberChange}/> 
                </Form.Item>

                <Form.Item
                    label="1日"
                    name="dailyBudget"
                    rules={[{ required: true, message: '今日の予算を入力してください' }]}
                    validateStatus={dayValidation.validateStatus}
                    help={dayValidation.errorMsg}
                >
                    <InputNumber formatter={value => `¥ ${value} /日`} {...budgetInputProps} onChange={onDayNumberChange}/>
                </Form.Item>

                {formMsg !== "" &&
                    <p style={{ textAlign: "center", color: "#ff4d4f" }}>{formMsg}</p>
                }

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