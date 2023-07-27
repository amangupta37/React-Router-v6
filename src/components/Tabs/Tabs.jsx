import { useState } from "react";
import "./Tabs.css";

const cities = [
    {
        id: 0,
        cityName: "London",
        description: "London is the capital of England and the United Kingdom.",
    },
    {
        id: 1,
        cityName: "Paris",
        description: "Paris is the capital of France",
    },
    {
        id: 2,
        cityName: "Tokyo",
        description: "Tokyo is the capital city of Japan",
    },
    {
        id: 3,
        cityName: "New York",
        description: "New York, is the largest city in the United States ",
    },
];

const Tabs = () => {
    const [activeCity, setActiveCity] = useState(null);

    return (
        <div className="Tabs">
            <h1>Tabs</h1>
            <nav>
                {cities?.map((city) => (
                    <div
                        className="item"
                        key={city?.id}
                        onClick={() => setActiveCity(city)}
                    >
                        {city?.cityName}
                    </div>
                ))}
            </nav>
            {activeCity && (
                <div className="description">
                    <h1>{activeCity?.cityName}</h1>
                    {activeCity?.description}
                </div>
            )}
        </div>
    );
};

export default Tabs;
