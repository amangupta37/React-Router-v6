import { useState, useEffect } from "react";
import "./Tweets.css";
const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/usertweets") {
                resolve({
                    status: 200,
                    message: "Success",
                    data: [
                        {
                            id: "tw001",
                            content: "this is a cool tweet",
                            likes: 50,
                            views: 100,
                        },
                        {
                            id: "tw002",
                            content: "React is cool",
                            likes: 47,
                            views: 655,
                        },
                        {
                            id: "tw003",
                            content: "Router is cool",
                            likes: 55,
                            views: 90,
                        },
                        {
                            id: "tw004",
                            content: "CSS is Awesome",
                            likes: 35,
                            views: 55,
                        },
                        {
                            id: "tw005",
                            content: "JavaScript is versatile",
                            likes: 48,
                            views: 90,
                        },
                    ],
                });
            } else {
                reject({
                    status: 404,
                    message: "tweets not found.",
                });
            }
        }, 2000);
    });
};

const URL = "https://example.com/api/usertweets";

const Tweet = () => {
    const [tweets, setTweets] = useState([]);
    const [storeTweets, setStoreTweets] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [filterTweets, setFilterTweets] = useState(false);

    const handleSuccessResponse = () => {
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }
        setIsLoading(false);
    };

    const handleFailedResponse = (error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error);
    };

    const getTweets = async () => {
        try {
            const getTweets = await fakeFetch(URL);
            const { data, status } = getTweets;

            if (status === 200) {
                setTweets(data);
                setStoreTweets(data);
                handleSuccessResponse();
            } else {
                const message = "error occurred";
                handleFailedResponse(message);
            }
        } catch (err) {
            handleFailedResponse(err.message);
        }
    };

    useEffect(() => {
        getTweets();
    }, []);

    useEffect(() => {
        if (filterTweets) {
            setTweets((previous) =>
                previous.filter((tweet) => tweet.likes > 50)
            );
        } else {
            setTweets(storeTweets);
        }
    }, [filterTweets]);

    return (
        <div className="Tweet">
            <div className="Button">
                <button onClick={() => setFilterTweets(!filterTweets)}>
                    {filterTweets
                        ? "Show all Tweets"
                        : "Show Tweets with More than 50 likes"}
                </button>
            </div>

            {isLoading && <h3>Loading.....</h3>}
            {isError && <h3>{errorMessage} !!!</h3>}

            {tweets?.map((tweet) => (
                <div className="Tweet-card" key={tweet?.id}>
                    <h2>{tweet?.content} </h2>
                    <div className="Tweet-stats">
                        <div className="likes">Likes:{tweet?.likes}</div>
                        <div className="views">Views:{tweet?.views}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tweet;
