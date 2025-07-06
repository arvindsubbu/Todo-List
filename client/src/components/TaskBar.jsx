import React from "react";
import Task from "./Task";
import { Tabs, Input, Dropdown } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "motion/react";

function TaskBar({
  taskList,
  selectedDate,
  handlecheck,
  handleDelete,
  openEditModal,
}) {
  const [currentList, setCurrentList] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [message, setMessage] = useState("No tasks available");
  const [searchText, setSearchText] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const { Search } = Input;

  useEffect(() => {
    handleChange(currentTab);
  }, [currentTab, taskList, selectedDate]);

  let formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

  const handleChange = (key) => {
    setCurrentTab(key);

    switch (key) {
      case "1": // Today
        setCurrentList(
          taskList.filter((task) => {
            return dayjs(task.createdAt).format("YYYY-MM-DD") === formattedDate;
          })
        );
        setMessage("No tasks available for today");
        break;
      case "2": // All
        let temp = taskList.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setCurrentList(temp);
        break;
      case "3": // Completed
        setCurrentList(taskList.filter((task) => task.status === true));
        setMessage("No completed tasks available");
        break;
      case "4": // Upcoming
        setCurrentList(
          taskList.filter((task) => {
            return dayjs(task.createdAt).format("YYYY-MM-DD") > formattedDate;
          })
        );
        setMessage("No upcoming tasks available");
        break;
      case "5": // Uncompleted
        setCurrentList(taskList.filter((task) => task.status === false));
        setMessage("No uncompleted tasks available");
        break;
    }
  };

  const sortDropdown = [
    {
      label: "Newest First",
      key: "newest",
    },
    {
      label: "Oldest First",
      key: "oldest",
    },
  ];

  const filterDropdown = [
    {
      label: "All priotities",
      key: "all",
      icon: <i className="fa-solid fa-circle text-white-500"></i>,
    },
    {
      label: "High",
      key: "red",
      icon: <i className="fa-solid fa-circle text-red-500"></i>,
    },
    {
      label: "Medium",
      key: "yellow",
      icon: <i className="fa-solid fa-circle text-yellow-500"></i>,
    },
    {
      label: "Low",
      key: "green",
      icon: <i className="fa-solid fa-circle text-green-500"></i>,
    },
    {
      label: "None",
      key: "blue",
      icon: <i className="fa-solid fa-circle text-blue-500"></i>,
    },
  ];

  let filteredTask = [...currentList];
  //serach filter
  if (searchText && searchText.trim() !== "") {
    filteredTask = currentList.filter((task) =>
      task.task.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  //priority filter
  if (priorityFilter !== "all") {
    filteredTask = currentList.filter(
      (task) => task.priority === priorityFilter
    );
  }
  //sort
  filteredTask = filteredTask.sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const renderTasks = () => {
    if (currentList.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400 text-2xl">{message}</p>
        </div>
      );
    }
    if (filteredTask.length === 0) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400 text-2xl">No matches found</p>
        </div>
      );
    }

    return (
      <AnimatePresence>
        {filteredTask.map((task, index) => (
          <motion.div
            layout
            key={task._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0, x: -20 }}
            whileHover={{ scale: 0.99 }}
          >
            <Task
              task={task}
              key={task._id}
              selectedDate={selectedDate}
              handlecheck={handlecheck}
              handleDelete={handleDelete}
              openEditModal={openEditModal}
              currentTab={currentTab}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <div>
      <div style={{ borderRadius: "10px", padding: "10px" }}>
        <div>
          <Tabs
            defaultActiveKey="1"
            size="large"
            centered
            tabPosition="top"
            items={[
              {
                label: `${
                  formattedDate === dayjs(new Date()).format("YYYY-MM-DD")
                    ? "Today"
                    : dayjs(selectedDate).format("MMM D")
                }`,
                key: "1",
              },
              {
                label: "All",
                key: "2",
              },
              {
                label: "Completed",
                key: "3",
              },
              {
                label: "Upcoming",
                key: "4",
              },
              {
                label: "Uncompleted",
                key: "5",
              },
            ]}
            tabBarStyle={{ fontSize: "30px", fontWeight: "bold" }}
            onChange={(key) => handleChange(key)}
          />
        </div>

        <div className="my-2 flex justify-end items-end">
          <Search
            placeholder="Search"
            value={searchText}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            enterButton="Search"
            style={{ width: 200 }}
          />

          <Dropdown
            menu={{
              items: sortDropdown,
              onClick: ({ key }) => setSortOrder(key),
            }}
            className="ml-3"
            placement="left"
          >
            <button>
              <i class="fa-solid fa-sort"></i>
            </button>
          </Dropdown>

          <Dropdown
            menu={{
              items: filterDropdown,
              onClick: ({ key }) => setPriorityFilter(key),
            }}
            className="ml-3"
            placement="left"
          >
            <button>
              <i class="fa-solid fa-filter"></i>
            </button>
          </Dropdown>
        </div>

        <div className="h-[70vh] overflow-y-auto">{renderTasks()}</div>
      </div>
    </div>
  );
}

export default TaskBar;
