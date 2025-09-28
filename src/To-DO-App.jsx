import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Slider from "./slider";
import AlertComponent from "./Alert";
import "./ToDoApp.css";

export default function ToDoApp() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("all"); // all, completed, pending, deleted, add
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [deletedTasks, setDeletedTasks] = useState([]);

  // Alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // success, info, error

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleAlertClose = () => setAlertOpen(false);

  // Load tasks
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
    const storedDeleted = JSON.parse(localStorage.getItem("deleted") || "[]");
    setDeletedTasks(storedDeleted);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("deleted", JSON.stringify(deletedTasks));
  }, [deletedTasks]);

  const addOrUpdateTask = () => {
    if (!title.trim()) return;

    if (editingIndex !== null) {
      const updated = [...tasks];
      updated[editingIndex] = { ...updated[editingIndex], title, desc };
      setTasks(updated);
      setEditingIndex(null);
      showAlert("Task updated!", "info"); // update → info
    } else {
      setTasks([...tasks, { title, desc, completed: false }]);
      showAlert("Task added!", "success"); // add → success
    }

    setTitle("");
    setDesc("");
    setView("all");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setTitle(tasks[index].title);
    setDesc(tasks[index].desc);
    setEditingIndex(index);
    setView("add");
  };

  const deleteTask = (index) => {
    const deleted = tasks.filter((_, i) => i !== index);
    setDeletedTasks([...deletedTasks, tasks[index]]);
    setTasks(deleted);
    showAlert("Task deleted!", "error"); // delete → error
  };

  const filteredTasks = () => {
    if (view === "all") return tasks;
    if (view === "completed") return tasks.filter((task) => task.completed);
    if (view === "pending") return tasks.filter((task) => !task.completed);
    if (view === "deleted") return deletedTasks;
    return tasks;
  };

  return (
    <div className="app-container">
      {/* Slider on right */}
      <Slider setView={setView} />

      {/* Main Content */}
      <div className="content">
        <h1>To-Do App</h1>

        {view === "add" && (
          <div className="form-container">
            <TextField
              label="Task Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
              sx={{
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-input": { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
              }}
            />

            <TextField
              label="Description"
              variant="outlined"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
              margin="dense"
              sx={{
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-input": { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                  "&:hover fieldset": { borderColor: "#ccc" },
                  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addOrUpdateTask}
              style={{ marginTop: "10px" }}
            >
              {editingIndex !== null ? "Update Task" : "Add Task"}
            </Button>
          </div>
        )}

        {view !== "add" && (
          <div className="task-list">
            {filteredTasks().map((task, index) => (
              <div key={index} className="task-card">
                <div>
                  <h3
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </h3>
                  <p>{task.desc}</p>
                </div>

                {view !== "deleted" && (
                  <div className="task-buttons">
                    <Tooltip title={task.completed ? "Undo" : "Complete"}>
                      <IconButton
                        color={task.completed ? "warning" : "success"}
                        onClick={() => toggleComplete(index)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton color="info" onClick={() => editTask(index)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => deleteTask(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alert Component */}
      <AlertComponent
        open={alertOpen}
        handleClose={handleAlertClose}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}
