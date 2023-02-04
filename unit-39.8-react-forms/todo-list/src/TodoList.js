import React, { useState }from "react";
import NewTodoForm from "./NewTodoForm";

function TodoList () {
    const [todoList, setTodoList] = useState([])

    function addTodo (newTodo) {
        setTodoList(data => {
            return [
                ...data,
                newTodo
            ]
        })
    }

    function deleteTodo (e) {
        const idx = e.target.parentElement.dataset.id
        setTodoList(todoList.filter((todo, currIdx)=>{
            return currIdx !== idx
        }))
    }
    return (
        <div>
            <NewTodoForm addTodo={addTodo}/>
            <div>
                {todoList.map((todo,idx)=>{
                    return <li className ="todo-item" key={todo.key} data-id={idx}>{todo.task} <button onClick={deleteTodo}>X</button></li>
                })}
            </div>
        </div>
    )
}

export default TodoList