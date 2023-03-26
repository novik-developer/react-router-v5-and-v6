import React from "react";
import {
    Navigate,
    NavLink,
    Outlet,
    useParams,
    useRoutes,
} from "react-router-dom";

const routes = [
    { path: "/", element: <MainPage /> },
    {
        path: "users",
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: <UserListPage />,
            },
            {
                path: ":userId",
                element: <Outlet />,
                children: [
                    {
                        path: "profile",
                        element: <UserProfileInfo />,
                    },
                    {
                        path: "edit",
                        element: <UserEdit />,
                    },
                    {
                        index: true,
                        element: <Navigate to={"./profile"} />,
                    },
                ],
            },
        ],
    },
    { path: "*", element: <Navigate to="/" /> },
];

const App = () => {
    const elements = useRoutes(routes);
    return (
        <div className="App">
            <h1>App lauout</h1>
            <NavLink to="/users">Users list Page</NavLink>
            {elements}
        </div>
    );
};

export default App;

function MainPage() {
    return <h1> Main Page</h1>;
}

function UserLayout() {
    return (
        <>
            <h1>User Layout</h1>
            <NavLink to="/">Main Page</NavLink>
            <Outlet />
        </>
    );
}

function UserListPage() {
    const array = [1, 2, 3, 4, 5];

    return (
        <>
            <h1>UserListPage</h1>
            <ul>
                {array.map((arr) => {
                    return (
                        <li key={arr}>
                            <NavLink to={`${arr}/profile`}>user:{arr}</NavLink>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

function UserProfileInfo() {
    const { userId } = useParams();
    return (
        <>
            <h1>User Page</h1>
            <ul>
                <li>
                    <NavLink to="/users">User List Page</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${userId}/edit`}>
                        Edit this Page
                    </NavLink>
                </li>
                <p>userId: {userId}</p>
            </ul>
        </>
    );
}

function UserEdit() {
    const { userId } = useParams();
    return (
        <>
            <h1>UserEdit {userId}</h1>{" "}
            <li>
                <NavLink to="/users">User List Page</NavLink>
            </li>
            <li>
                <NavLink to={`/users/${userId}/profile`}>
                    Edit profile Page
                </NavLink>
            </li>
            <li>
                <NavLink to={`/users/${+userId + 1}`}>Another User</NavLink>
            </li>
        </>
    );
}
