import React from 'react';
import { StackedCash } from '../StackedCash';
import { Row, Col, Statistic } from 'antd';
// Import Types, Interface
import { CashStack } from '../types';
// Import CSS
import 'antd/dist/antd.css';

interface RemainingCashProps {
    statsTitle: string;
    remaining: number;
    original: number;
    tabName: string;
    cashStack: CashStack;
}

const RemainingCash: React.FC<RemainingCashProps> = ({ statsTitle, remaining, original, tabName, cashStack }) => {
    return (
        <>
        <Statistic title={`${statsTitle}の残高`} value={remaining} prefix="¥ " suffix={`/ ${original}`} />
        {cashStack.length > 0 &&
            cashStack.map((eachCash, index) => {
                return (
                    <>
                        <Row justify="center" key={`${tabName}-${index}`}>
                            <Col span={24}>
                                <StackedCash 
                                desc={eachCash.desc}
                                value={eachCash.value}
                                piece={eachCash.piece}/>
                            </Col>
                        </Row>
                    </>
                );
            })  
        }
        </>
    );
}

export default RemainingCash;