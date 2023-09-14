import React, { useContext, useState } from "react";
import { TasksContext } from "../Home/Home";
import "../../App.css"

const AddTaskForm = () => {
  const [inputValue, setInputValue] = useState("");
  const {tasks,setTasks} = useContext(TasksContext);
  
  const addTask = (text) => {
    const token = localStorage.getItem("token");
    const data = {
      text,
      done: false,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };
    fetch(process.env.REACT_APP_SERVER_URI + "/api/add", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks([...tasks, data]);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target.text.value) addTask(e.target.text.value);
    setInputValue("");
  };

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <input
        type="text"
        className="input-add_task"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        name="text"
        placeholder="Enter Task"
      />
      <input type="submit" className="btn-submit" value="Add" />
    </form>
  );
};

export default AddTaskForm;
