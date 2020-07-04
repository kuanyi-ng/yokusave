import React from 'react';
// Import CSS
import 'antd/dist/antd.css';
import './StackedCash.css'

interface StackedCashProps {
    desc: string;
    value: number;
    piece: number;
}

const StackedCash: React.FC<StackedCashProps> = ({ desc, value, piece }) => {
    let eachPieces = [];
    for (let i=0; i<piece; i++) {
        eachPieces.push(i);
    }

    return (
        <>
        <div className="cash-container">
        {eachPieces.map((p) => {
            let stackClasses = (p === 0) ? `first-piece cash ${desc}` : `cash ${desc}`;
            return (
                <div
                className={stackClasses}
                key={`${desc}-${p}`}>
                </div>
            );
        })}
        </div>
        </>
    );
}

export default StackedCash;