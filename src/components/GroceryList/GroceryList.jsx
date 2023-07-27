import { useState } from "react";
import "./GroceryList.css";
const GroceryList = () => {
    const [items, setItems] = useState([]);
    const [completedList, setCompletedList] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");

    const [userInput, setUserInput] = useState("");

    const handleUserInput = (e) => {
        const input = e.target.value;
        setUserInput(input);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setItems([...items, userInput]);
            setUserInput("");
        }
    };

    const handleAddItem = () => {
        setItems([...items, userInput]);
        setUserInput("");
    };

    const handleCheckBox = (e) => {
        const CompletedItem = e.target.value;
        setSelectedItem(CompletedItem);

        setTimeout(() => {
            setItems((previous) =>
                previous.filter((item) => item !== CompletedItem)
            );
            setCompletedList([...completedList, CompletedItem]);
        }, 200);
    };

    return (
        <div className="GroceryList">
            <h1>Grocery List</h1>
            <div className="AddItems">
                Add Item:
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInput}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleAddItem} disabled={userInput === ""}>
                    Add
                </button>
            </div>
            <div className="GroceryItems">
                <ul>
                    {items?.map((item, index) => (
                        <li key={index}>
                            <div className="List">
                                <input
                                    type="checkbox"
                                    value={item}
                                    onChange={handleCheckBox}
                                    checked={item === selectedItem}
                                />
                                <p>{item}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <h1>Completed List</h1>
            <div className="CompletedList">
                <ul>
                    {completedList?.map((item, index) => (
                        <li key={index}>
                            <div className="List">
                                <p>{item}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroceryList;
