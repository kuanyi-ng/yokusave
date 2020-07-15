import React, { useState } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { SpendBudgetBar } from '../SpendBudgetBar';
import { SpendBudgetDist } from '../SpendBudgetDist';
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
    <Row justify="center" style={{ margin: 8 }}>
        <Col span={24}>
            <Button
            type="default"
            style={{ width: 100 }}
            onClick={() => setShowStat(true)}>
                グラフ
            </Button>
        </Col>
    </Row>
    <Modal
    title="グラフ"
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
        <Row justify="center">
            <SpendBudgetDist 
            budget={budget}
            remaining={remaining}
            chartTitle="類似したユーザーとの比較"
            chartSubtitle="支出 / 予算 %"
            />
        </Row>

    </Modal>
    </>
    );
}

export default SpendingStat;