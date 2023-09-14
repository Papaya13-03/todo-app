import React, { useContext } from "react";
import { TasksContext } from "../Home/Home";
import Task from "../Task/Task";

const TaskList = () => {
  const {tasks, setTasks} = useContext(TasksContext);
  return (
    <div className="task-list">
      {tasks.map((task) => {
        return <Task key={task._id} task={task}/>;
      })}
    </div>
  );
};

export default TaskList;
