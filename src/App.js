import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaPlus } from 'react-icons/fa'; // Import Sun, Moon, and Plus icons
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [showAddTaskCard, setShowAddTaskCard] = useState(false);
    const [newTask, setNewTask] = useState({
        text: '',
        date: '',
        duration: '',
        completed: false,
    });
    const [editingTaskId, setEditingTaskId] = useState(null);

    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
        if (savedDarkMode) {
            setIsDarkMode(savedDarkMode);
            document.body.classList.add('bg-dark', 'text-white');
        }

        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));

        if (isDarkMode) {
            document.body.classList.add('bg-dark', 'text-white');
        } else {
            document.body.classList.remove('bg-dark', 'text-white');
        }
    }, [isDarkMode]);

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const handleAddTask = () => {
        setShowAddTaskCard(true);
        setNewTask({ text: '', date: '', duration: '', completed: false });
        setEditingTaskId(null);
    };

    const handleSaveTask = () => {
        if (!newTask.text || !newTask.date || !newTask.duration) {
            alert('Please fill in all fields!');
            return;
        }

        const task = {
            id: editingTaskId || Date.now(),
            ...newTask,
        };

        if (editingTaskId) {
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === editingTaskId ? task : t))
            );
        } else {
            setTasks((prevTasks) => [...prevTasks, task]);
        }

        saveTasks();
        setShowAddTaskCard(false);
        setEditingTaskId(null);
    };

    const handleCancelTask = () => {
        setShowAddTaskCard(false);
    };

    const handleInputChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.id]: e.target.value,
        });
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        saveTasks();
    };

    const handleEditTask = (task) => {
        setNewTask({
            text: task.text,
            date: task.date,
            duration: task.duration.replace(' hours', ''),
            completed: task.completed,
        });
        setEditingTaskId(task.id);
        setShowAddTaskCard(true);
    };

    const toggleCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
        saveTasks();
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Group tasks by date
    const groupedTasks = tasks.reduce((groups, task) => {
        const date = task.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    return (
        <div className="container my-5">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h1>My To-Do List</h1>
                <button
                    className="btn btn-outline-light d-flex align-items-center" 
                    style={{ backgroundColor: "#eceffd", borderColor: "#747ae1", color: "black" }}
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <FaSun className="me" /> : <FaMoon className="me" />}
                    
                </button>
            </header>

            {showAddTaskCard && (
    <div className="modal-backdrop" onClick={handleCancelTask}>
        <div
            className="card p-3 mb-3 custom-card"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
        >
            <h2>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
            <input
                type="text"
                className="form-control mb-2"
                id="text"
                placeholder="Enter your task"
                value={newTask.text}
                onChange={handleInputChange}
            />
            <input
                type="date"
                className="form-control mb-2"
                id="date"
                value={newTask.date}
                onChange={handleInputChange}
            />
            <input
                type="number"
                className="form-control mb-2"
                id="duration"
                placeholder="Duration (hours)"
                value={newTask.duration}
                onChange={handleInputChange}
            />
            <div>
                <button
                    className="btn btn-primary"
                    onClick={handleSaveTask}
                >
                    Save Task
                </button>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={handleCancelTask}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
)}
            {Object.keys(groupedTasks)
                .sort((a, b) => new Date(a) - new Date(b))
                .map((date) => (
                    <div className="card mb-4 card-tasks" key={date}>
                        <div className="card-header">
                            <h3>{date}</h3>
                        </div>
                        <ul className="list-group list-group-flush">
                            {groupedTasks[date].map((task) => (
                                <li
                                    key={task.id}
                                    className={`list-group-item d-flex justify-content-between align-items-center ${
                                        task.completed ? 'list-group-item-success' : ''
                                    }`}
                                >
                                    <div>
                                        <strong>{task.text}</strong>
                                        <div>Duration: {task.duration}</div>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-info me-2"
                                            onClick={() => handleEditTask(task)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-success ms-2"
                                            onClick={() => toggleCompletion(task.id)}
                                        >
                                            {task.completed ? 'Undo' : 'Complete'}
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

            {/* Floating Add Task Button */}
            <div
                className="position-fixed bottom-0 end-0 m-4"
                style={{ zIndex: 1000 }}
            >
                <button
                    className="btn btn-primary rounded-circle p-3 d-flex align-items-center justify-content-center shadow"
                    onClick={handleAddTask}
                    title="Add Task"
                >
                    <FaPlus size={24} />
                </button>
            </div>
        </div>
    );
}

export default App;
