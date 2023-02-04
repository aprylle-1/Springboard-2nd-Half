import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
function NewTodoForm ({addTodo}) { 

    const [dataForm, setDataForm] = useState({task : ""})

    function handleFormChange (e) {
        const { name, value } = e.target
        setDataForm(data => {
            return {
                ...data,
                [name] : value
            }
        })
    }

    function handleAddTodo (e) {
        e.preventDefault()
        addTodo({
            task : dataForm.task,
            key : uuid()
        })
        setDataForm({task : ""})
    }
    return (
        <form onSubmit={handleAddTodo} className="NewTodoForm">
            <label htmlFor="task">Task</label>
            <input
            onChange={handleFormChange}
            name = "task"
            id = "task"
            value = {dataForm.task}
            />
            <button>Add todo</button>
        </form>
    )
}

export default NewTodoForm