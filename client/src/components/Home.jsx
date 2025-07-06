import React, { use } from "react";
import Datebar from "./Datebar";
import TaskBar from "./TaskBar";
import { Modal, Input, Button, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { addTask, getAllTasks, updateTask, deleteTask } from "../api/tasksapi";

function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [taskList, setTaskList] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [priority, setPriority] = useState("blue");
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setModalMode("add");
    setTaskValue("");
    setPriority("blue");
    setIsModalOpen(true);
    setEditTask(null);
  };

  const openEditModal = (task) => {
    setModalMode("edit");
    setTaskValue(task.task);
    setPriority(task.priority);
    setEditTask(task);
    setIsModalOpen(true);
  };
  const items = [
    {
      label: "High Priority",
      key: "red",
      icon: <i className="fa-solid fa-circle text-red-500"></i>,
    },
    {
      label: "Medium Priority",
      key: "yellow",
      icon: <i className="fa-solid fa-circle text-yellow-500"></i>,
    },
    {
      label: "Low Priority",
      key: "green",
      icon: <i className="fa-solid fa-circle text-green-500"></i>,
    },
    {
      label: "No Priority",
      key: "blue",
      icon: <i className="fa-solid fa-circle text-blue-500"></i>,
    },
  ];

  const fetchTasks = async () => {
    const tasks = await getAllTasks(selectedDate);
    if (tasks.success) {
      setTaskList(tasks.data);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [selectedDate]); // Fetch tasks when the component mounts or selectedDate changes


  const handlePriority = ({ key }) => {
    setPriority(key);
    setEditTask({ ...editTask, priority: key });
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks(); // Call the parent function to refresh the task list
   
  };

  const handlecheck = async (id) => {
    //setCheck(!check);
    const currentTask = taskList.find((task) => task._id === id);
    await updateTask({
      taskId: id,
      task: currentTask.task,
      status: !currentTask.status,
      priority: currentTask.priority,
    });
    fetchTasks(); // Call the parent function to refresh the task list
  };

  const handleModalSubmit = async () => {
    if (modalMode === "add") {
      await addTask({
        task: taskValue,
        createdAt: selectedDate,
        status: false,
        priority: priority,
      });
    } else if (modalMode === "edit" && editTask) {
      await updateTask({
        taskId: editTask._id,
        task: taskValue,
        status: editTask.status,
        priority: priority,
      });
    }
    setIsModalOpen(false);
    fetchTasks();
  };
  const getLabel = (key) => {

    return items.find((item) => item.key === key).label;
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-black px-2 py-4 relative">
      <div
        className=" h-full w-full max-w-[1200px] text-base sm:text-lg md:text-xl font-semibold shadow-lg flex flex-col lg:flex-row gap-4  box-content p-4"
        style={{ borderRadius: "30px" }}
      >
        <div className="flex flex-col w-full lg:w-[25%] h-auto lg:h-[83vh] items-start">
          <Datebar setSelectedDate={setSelectedDate} />
        </div>

        <div className="relative flex-1 w-full flex justify-center items-center">
          <div className="relative w-full h-full min-h-[300px] bg-white rounded-lg shadow-md">
            <TaskBar
              taskList={taskList}
              selectedDate={selectedDate}
              handlecheck={handlecheck}
              handleDelete={handleDelete}
              openEditModal={openEditModal}
            />

            {/* + Button Inside TaskBar */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-full text-black text-4xl sm:text-5xl md:text-6xl bg-white cursor-pointer  z-50">
              <i onClick={openAddModal} className="fa-solid fa-plus"></i>
            </div>
          </div>
        </div>
      </div>
      {
        <Modal
          title={modalMode === "add" ? "Add Task" : "Edit Task"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={700}
        >
          <Input.TextArea
            size="large"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
            placeholder="Enter Task"
          />
          <Dropdown
            menu={{ items, onClick: handlePriority }}
            placement="bottomRight"
            className="mt-4"
          >
            <Button
              color={modalMode === "add" ? priority : editTask.priority}
              variant="filled"
            >
              {getLabel(priority ? priority : "No Priority")}
            </Button>
          </Dropdown>
          <Button
            type="primary"
            block
            disabled={taskValue.trim().length === 0}
            style={{ marginTop: 12 }}
            onClick={handleModalSubmit}
          >
            {modalMode === "add" ? "Add" : "Save"}
          </Button>
        </Modal>
      }
    </div>
  );
}

export default Home;
