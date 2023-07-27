import { useState, useEffect } from "react";
import "./Chat.css";
const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/userchats") {
                resolve({
                    status: 200,
                    message: "Success",
                    data: [
                        "Hey",
                        "Hi, how are you?",
                        "I am good, How are you doing?",
                        "I am good too. Can we meet on Monday?",
                    ],
                });
            } else {
                reject({
                    status: 404,
                    message: "users chat not found.",
                });
            }
        }, 2000);
    });
};
const URL = "https://example.com/api/userchats";

const Chat = () => {
    const [userChats, setUserChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const getUserChat = async () => {
        try {
            const Chats = await fakeFetch(URL);
            const { data, status } = Chats;

            if (status === 200) {
                setUserChats(data);
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
        getUserChat();
    }, []);

    return (
        <div className="Chat">
            <h1>Chat Room</h1>

            <div className="UserChats">
                {isLoading && <h3>Loading.....</h3>}
                {isError && <h3>{errorMessage} !!!</h3>}
                {userChats?.map((chat, index) => (
                    <p key={index}>
                        {index % 2 === 0 ? "User" : "You"}: {chat}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
