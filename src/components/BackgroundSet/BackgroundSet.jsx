import { useState } from "react";
import "./BackgroundSet.css";

const colors = [
    {
        id: 0,
        name: "White",
    },
    {
        id: 1,
        name: "Pink",
    },
    {
        id: 2,
        name: "Tomato",
    },
    {
        id: 3,
        name: "Aqua Marine",
    },
];

const BackgroundSet = () => {
    const [selectedColor, setSelectedColor] = useState("");

    const handleSelect = (e) => {
        const userSelect = e.target.value;
        setSelectedColor(userSelect);
    };

    const dynamicBackground = {
        backgroundColor: selectedColor.toString().replace(/\s+/g, ""),
    };

    return (
        <div className="BackgroundSet">
            <h1>Set Background Color</h1>
            <div className="Select" style={dynamicBackground}>
                <select value={selectedColor} onChange={handleSelect}>
                    {colors.map((color) => (
                        <option value={color?.name} key={color.id}>
                            {color?.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default BackgroundSet;
