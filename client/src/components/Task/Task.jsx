import React, { useContext } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { TasksContext } from "../Home/Home";
import { getToken } from "../../Logic/token";
import "../../App.css";

const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const toggleCheck = async () => {
    const newTask = { ...task, done: !task.done };
    const token = getToken();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ newTask }),
    };
    await fetch(process.env.REACT_APP_SERVER_URI + "/api", options);
    setTasks(() =>
      tasks.map((i) => {
        if (i._id === task._id) return newTask;
        return i;
      })
    );
  };

  const deleteTask = async (task) => {
    setTasks((currentTasks) => {
      return currentTasks.filter((_task) => _task._id !== task._id);
    });
    const token = getToken();
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({ task }),
    };
    await fetch(process.env.REACT_APP_SERVER_URI + "/api", options);
    console.log("deleted", task, tasks);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        className="check-btn"
        id="check-box"
        checked={task.done ? true : false}
        onChange={() => toggleCheck()}
      />
      <h3 className="text">{task.text}</h3>
      <BsFillTrashFill
        className="delete-btn"
        onClick={() => deleteTask(task)}
      />
    </div>
  );
};

export default Task;
