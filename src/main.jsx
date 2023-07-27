import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error/ErrorPage";
import Contact from "./routes/contact";
import Tabs from "./components/Tabs/Tabs";
import GroceryList from "./components/GroceryList/GroceryList";
import RoundCard from "./components/RoundCard/RoundCard";
import BackgroundSet from "./components/BackgroundSet/BackgroundSet";
import Chat from "./components/Chat/Chat";
import Tweet from "./components/Tweets/Tweets";
import Movies from "./components/Movies/Movies";
import AuthLayout from "./layout/AuthLayout";
// import Root from "./routes/root";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <h1>for login</h1>,
            },
            {
                path: "/auth",
                element: <h1>for auth</h1>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <Tabs /> */}
        {/* <GroceryList /> */}
        {/* <RoundCard /> */}
        {/* <BackgroundSet /> */}
        {/* <Chat /> */}
        {/* <Tweet /> */}
        {/* <Movies /> */}
    </React.StrictMode>
);
