import React, {useState, useEffect} from "react";


const Todo = () =>{
    const [value ,setValue] = useState("");
    const [todoData, setTodoData] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [editValue, setEditValue] = useState ("");
    const URL = "https://dummyjson.com/todos";

    useEffect(()=>{
         fetch(URL).
        then((res) => res.json()).
        then((data) => {console.log(data);setTodoData(data.todos);}).
        catch((error)=>{
            console.error('Error fetching data:', error);
        })
    }, [])

    const handleChange = (e) => {
        setValue(e.target.value);
    }
    const AddTask = () => {
        const newTodo = {id : todoData.length +1 , todo: value} ;
        const addTodos = [...todoData, newTodo];
        setTodoData(addTodos);
        setValue("");
    }

    const handleItemClick = (id, todo) => {
        setSelectedId(id === selectedId ? null : id);
        setEditValue(todo);
      };
const handleEditChange = (e) => {
    setEditValue(e.target.value)
}

const saveTodo = () => {
    const updatedTodos = todoData.map((item) => (
        item.id === selectedId ? {...item , todo:editValue} : item
    ));
    setTodoData(updatedTodos);
    setSelectedId(null);
}

    return(
        <>
        <h1>Todo List</h1>
        <input type="text" value={value} onChange={handleChange}/>
        <button onClick={AddTask}>Add</button>
        <ul>
            {todoData.map((item)=> (
                <li key={item.id} onClick={()=>handleItemClick(item.id, item.todo)}>
                    {selectedId === item.id ?
                    (<input type="text"  value={editValue} onChange={handleEditChange} onBlur={saveTodo} autoFocus/>) :
                    (item.todo)}
                   
                    </li>
            ))}
        </ul>
        </>
    )
}

export default Todo;