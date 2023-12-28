import React, { Component, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";
import Modal from "./components/Modal";
import axios from "axios";

import { authActions } from "./stores";

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from "./components/Signup";
import Todo from "./features/Todo/Todo";

const getToken = (tokenType = "accessToken") => {
    const token = localStorage.getItem(tokenType);
    return { Authorization: "JWT " + token };
}

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const onLogin = () => dispatch(authActions.login());
    const onLogout = () => dispatch(authActions.logout());

    const navigate = useNavigate();

    async function refreshToken() {
        axios.post("/api/auth/jwt/refresh/", {
            refresh: localStorage.getItem("refreshToken"),
        })
            .then(res => {
                console.log("refresh");
                localStorage.setItem("accessToken", res.data.access);
                localStorage.setItem("refreshToken", res.data.refresh);
                onLogin();
            })
            .catch(err => {
                alert("ログインしてください");
                onLogout();

            });
        navigate("/login");
    };

    async function verifyToken() {
        axios.post("/api/auth/jwt/verify/", {
            token: localStorage.getItem("accessToken"),
        })
            .then(res => {
                console.log("verify");
                onLogin();
                navigate("/");
            })
            .catch(err => {
                if (err.response.status === 401) {
                    refreshToken();
                }
            });
    }

    useLayoutEffect(() => {
        console.log("useLayoutEffect");
        console.log("isAuthenticated: ", isAuthenticated);
        if (isAuthenticated) {
            if (localStorage.getItem("accessToken") !== null) {
                console.log("start verify");
                verifyToken();
            }
            else {
                console.log("no token");
                alert("ログインしてください");
                onLogout();
                navigate("/login");
            }
        }
    }, []);


    return (
        <main className="container">

            <h1 className="text-uppercase text-center my-4">Sample app</h1>

            <div className="row d-flex justify-content-around">
                <Link className="col-auto btn btn-primary" to="/">Top</Link>
                <Link className="col-auto btn btn-primary" to="/profile">Profile</Link>
                <Link className="col-auto btn btn-primary" to="/todo">Todo</Link>
                <Link className="col-auto btn btn-primary" to="/login">Login</Link>
                <Link className="col-auto btn btn-primary" to="/signup">Signup</Link>

            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/todo" element={
                    <PrivateRoute>
                        <Todo />
                    </PrivateRoute>
                } />
                // {/* <PrivateRoute path="/profile" element={<Profile />} />
                // <PrivateRoute path="/todo" element={<Todo />} /> */}
            </Routes>
        </main >
    );
}

export default App;


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       todoList: [],
//       modal: false,
//       activeItem: {
//         title: "",
//         description: "",
//         completed: false,
//       },
//     };
//   }

//   componentDidMount() {
//     this.refreshList();
//   }

//   refreshList = () => {
//     axios
//       .get("/api/todos/")
//       .then((res) => this.setState({ todoList: res.data }))
//       .catch((err) => console.log(err));
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   handleSubmit = (item) => {
//     this.toggle();

//     if (item.id) {
//       axios
//         .put(`/api/todos/${item.id}/`, item)
//         .then((res) => this.refreshList());
//       return;
//     }
//     axios
//       .post("/api/todos/", item)
//       .then((res) => this.refreshList());
//   };

//   handleDelete = (item) => {
//     axios
//       .delete(`/api/todos/${item.id}/`)
//       .then((res) => this.refreshList());
//   };

//   createItem = () => {
//     const item = { title: "", description: "", completed: false };

//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   editItem = (item) => {
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({ viewCompleted: true });
//     }

//     return this.setState({ viewCompleted: false });
//   };

//   renderTabList = () => {
//     return (
//       <div className="nav nav-tabs">
//         <span
//           className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
//           onClick={() => this.displayCompleted(true)}
//         >
//           Complete
//         </span>
//         <span
//           className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
//           onClick={() => this.displayCompleted(false)}
//         >
//           Incomplete
//         </span>
//       </div>
//     );
//   };

//   renderItems = () => {
//     const { viewCompleted } = this.state;
//     const newItems = this.state.todoList.filter(
//       (item) => item.completed == viewCompleted
//     );

//     return newItems.map((item) => (
//       <li
//         key={item.id}
//         className="list-group-item d-flex justify-content-between align-items-center"
//       >
//         <span
//           className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
//             }`}
//           title={item.description}
//         >
//           {item.title}
//         </span>
//         <span>
//           <button
//             className="btn btn-secondary mr-2"
//             onClick={() => this.editItem(item)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => this.handleDelete(item)}
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   };

//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary"
//                   onClick={this.createItem}
//                 >
//                   Add task
//                 </button>
//               </div>
//               {this.renderTabList()}
//               <ul className="list-group list-group-flush border-top-0">
//                 {this.renderItems()}
//               </ul>
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//       </main>
//     );
//   }
// }

// export default App;