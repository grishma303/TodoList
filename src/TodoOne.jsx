import React, {useEffect, useState} from "react";
import './Todo.css';

const Task = ({task, completeTask, index, removeTask}) => {
    return(
        <div
        className="task"
        style={{ textDecoration: task.completed ? "line-through" : "" }}
    >
        {task.title}
        <button className="removeBtn" onClick={()=>removeTask(index)}>X</button>
        <button onClick={()=>completeTask(index)}>{task.completed ? "Completed": "Complete"}</button>
    </div>
    )
};

function CreateTask({addTask}){
    const [value, setValue] = useState("");

    const handleChange = (e) =>{
        setValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(value);
        setValue("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Add new Task"
            className="input"
            />
        </form>
    );
};

const TodoOne = () => {
    const [task, setTask] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
        {
            title: "Do your workout",
            completed: true
        },
        {
            title: "Hangout with friends",
            completed: false
        }
    ])
    const [tasksRemaining, setTasksRemaining] = useState(0);

    useEffect(() => { 
        const pending = task.filter(task => !task.completed).length;
        setTasksRemaining(pending)
        // setTasksRemaining(task.filter(task => !task.completed).length) 
      },[task]);

    const addTask = (title) => {
        const newTask = [...task, {title, completed:false}];
        setTask(newTask);
    }

    const completeTask = index => {
        const newTasks = [...task];
        newTasks[index].completed = true;
        setTask(newTasks);
    };

    const removeTask = (index) => {
        const newTasks = task.filter((_,i) => i !== index);
        setTask(newTasks);
    }

    return(
        <>
            <h1>Todo List</h1>
            <div className="todo-container">
                <div className="header">Pending Tasks( {tasksRemaining})</div>
                <div className="tasks">
                        {task.map((item, index) => (
                            <Task task={item} 
                            key={index} 
                            index={index} 
                            completeTask={completeTask} 
                            
                            removeTask={removeTask}
                            />
                        ))}
                </div>
                <div className="create-task">
                    <CreateTask addTask={addTask}/>
                </div>

            </div>
        </>
    )
}



export default TodoOne;