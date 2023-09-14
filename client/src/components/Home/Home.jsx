import Header from "../Header/Header";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { useState, useEffect, createContext } from "react";
import { getToken } from "../../Logic/token";
import Logout from "../Logout/Logout";

import "../../App.css";

import React from "react";

export const TasksContext = createContext();

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.log("redirect!");
      window.location.href = "/login";
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    fetch(process.env.REACT_APP_SERVER_URI + "/api", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <div className="container">
        <Header />
        <AddTaskForm />
        <TaskList />
      </div>
      <Logout />
    </TasksContext.Provider>
  );
};

export default Home;
