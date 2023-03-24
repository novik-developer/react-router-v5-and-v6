import React from "react";
import {
    BrowserRouter,
    NavLink,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {
    useParams,
    useRouteMatch,
} from "react-router-dom/cjs/react-router-dom";

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <h1>App lauout</h1>
                <NavLink to="/users">Users list Page</NavLink>
                <Switch>
                    <Route path="/users" component={UserLayout}></Route>
                    <Route exact path="/" component={MainPage}></Route>
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;

function MainPage() {
    return <h1> Main Page</h1>;
}

function UserLayout() {
    const { path } = useRouteMatch();
    return (
        <>
            <h1>User Layout</h1>
            <NavLink to="/">Main Page</NavLink>
            <Switch>
                <Route
                    path={path + "/:userId/profile"}
                    component={UserProfileInfo}
                />
                <Route path={path + "/:userId/edit"} component={UserEdit} />
                <Route exact path={path} component={UserListPage} />
                <Redirect
                    from={path + "/:userId"}
                    to={path + "/:userId/profile"}
                />
            </Switch>
        </>
    );
}

function UserListPage() {
    const { path } = useRouteMatch();
    const array = [1, 2, 3, 4, 5];

    return (
        <>
            <h1>UserListPage</h1>
            <ul>
                {array.map((arr) => {
                    return (
                        <li key={arr}>
                            <NavLink to={`${path}/${arr}`}>user:{arr}</NavLink>
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

function UserEdit(params) {
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
