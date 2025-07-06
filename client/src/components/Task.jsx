import React from "react";
import dayjs from "dayjs";

function Task({
  task,
  currentTab,
  handleDelete,
  handlecheck,
  openEditModal,

}) {
  const priorityClassMap = {
    red: "text-red-600",
    yellow: "text-yellow-400",
    green: "text-green-500",
    blue: "text-blue-500",
  };
  const  priorityType = {
     red: "High Priority",
    yellow: "Medium Priority",
    green: "Low Priority",
    blue: "No Priority",
  }

  return (
    <>
      <div
        className={`bg-white shadow-lg p-4 rounded-lg flex items-center mb-4 text-base`}
      >
        <div className="flex items-center">
          <span className=" flex items-center space-x-2">
           <i className={`fa-solid fa-circle ${priorityClassMap[task.priority]}`}
            title={`${priorityType[task.priority]}`}
           ></i>
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => handlecheck(task._id)}
            className="mr-2"
          />
          </span>
          <span
            className={`text-gray-900  ${task.status ? "line-through" : ""}`}
          >
            {task.task}
          </span>
        </div>
        <span className="ml-auto flex gap-2 items-center">
          {currentTab === "2" ||
          currentTab === "3" ||
          currentTab === "4" ||
          currentTab === "5" ? (
            <span className="text-sm text-gray-600">
              {dayjs(task.createdAt).format("MMM D")}
            </span>
          ) : null}
         
          <i
            onClick={() => {
              openEditModal(task);
            }}
            class="fa-solid fa-pen-to-square text-gray-600 hover:text-red-600 hover:scale-110"
            title = "Edit Task"
          ></i>
          <i
            onClick={() => handleDelete(task._id)}
            class="fa-solid fa-trash text-gray-600 hover:text-red-600 hover:scale-110"
            title="Delete Task"
          ></i>
        </span>
      </div>
    </>
  );
}

export default Task;
