import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { SpendBudgetBar } from '../SpendBudgetBar';
// Import Types
import { Budget, RemainingAmount } from '../types';
// Import CSS
import 'antd/dist/antd.css'

interface SpendingStatProps {
    budget: Budget;
    remaining: RemainingAmount;
}

const SpendingStat: React.FC<SpendingStatProps> = ({ budget, remaining }) => {
    const [showStat, setShowStat] = useState<boolean>(false);
    
    return (
    <>
    <Row justify="center" style={{ margin: 16 }}>
        <Col span={24}>
            <Button
            type="default"
            style={{ width: 150 }}
            onClick={() => setShowStat(true)}>
                消費データ
            </Button>
        </Col>
    </Row>
    <Modal
    title="消費データ"
    centered={true}
    visible={showStat}
    footer={null}
    onCancel={() => setShowStat(false)}
    >
        <Row justify="center">
            <SpendBudgetBar 
            budget={budget}
            remaining={remaining}
            chartTitle="支出と予算"
            />
        </Row>

    </Modal>
    </>
    );
}

export default SpendingStat;