import React from 'react';
import { Row, Col } from 'antd';
// Import Types, Interface
import { CashStack } from '../types';
// Import CSS
import 'antd/dist/antd.css';
import './StackedCash.css'

interface StackedCashProps {
    stack: CashStack
}

type eachPiecesType = {
    [index: string]: number[];
}

const StackedCash: React.FC<StackedCashProps> = ({ stack }) => {
    let noteAvailable: string[] = [];
    let eachPieces: eachPiecesType = {
        "tenK": [],
        "fiveK": [],
        "oneK": [],
        "fiveH": [],
        "oneH": [],
        "fifty": [],
        "ten": [],
        "five": [],
        "one": []
    }
    for (let i=0; i<stack.length; i++) {
        const cash = stack[i];
        noteAvailable.push(cash.desc);
        for (let j=0; j<cash.piece; j++) {
            eachPieces[cash.desc].push(j);
        }
    }

    let cashLoop = [ 
        {big: "fiveK", small: "oneK"}, 
        {big: "fiveH", small: "oneH"}, 
        {big: "fifty", small: "ten"},
        {big: "five", small: "one"} 
    ];

    return (
        <>
        { noteAvailable.indexOf("tenK") !== -1 &&
            <Row justify="center">
                <Col span={24}>
                    <div className="cash-container">
                        {eachPieces["tenK"].map((p) => {
                            let stackClasses = (p === 0) ? `first-piece cash tenK` : `cash tenK`;
                            return (
                                <div
                                className={stackClasses}
                                key={`tenK-${p}`}>
                                </div>
                            );
                        })} 
                    </div>  
                </Col>
            </Row>
        }

        { cashLoop.map((pair) => {
            let content;
            if (noteAvailable.indexOf(pair.big) !== -1 ) {
                content = (<>
                    <div className={`first-piece cash ${pair.big}`}></div>
                    {eachPieces[pair.small].map((p) => {
                        return (
                            <div 
                            className={`cash ${pair.small}`}
                            key={`${pair.small}-${p}`}
                            >
                            </div>
                        )
                    })}
                    </>);
            } else {
                content = (<>
                    {eachPieces[pair.small].map((p) => {
                        let stackClasses = (p === 0) ? `first-piece cash ${pair.small}` : `cash ${pair.small}`;
                        return (
                            <div 
                            className={stackClasses}
                            key={`${pair.small}-${p}`}
                            >
                            </div>
                        )
                    })}
                    </>);
            }

            return (
                <Row justify="center">
                    <Col span={24}>
                        <div className="cash-container">
                            {content}
                        </div>                        
                    </Col>
                </Row>
            );
            
            })}
        </>
    );
}

export default StackedCash;