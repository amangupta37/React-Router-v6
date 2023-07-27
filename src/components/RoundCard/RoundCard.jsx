import React, { useState } from "react";
import "./RoundCard.css";
const RoundCard = () => {
    const [range, setRange] = useState(0);
    const handleRange = (e) => {
        const inputRange = e.target.value;
        setRange(inputRange);
    };

    const styleCard = {
        margin: "20px",
        border: "2px solid #000",
        borderRadius: `${range}px`,
    };
    return (
        <div className="RoundCard" style={styleCard}>
            <h1>Card with Rounded Corners</h1>
            <div className="Controller">
                Border Radius:
                <input
                    type="range"
                    value={range}
                    onChange={handleRange}
                    max={100}
                />
            </div>
        </div>
    );
};

export default RoundCard;
