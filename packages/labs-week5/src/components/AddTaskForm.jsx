import { useState } from "react";

function AddTaskForm(props) {
    const [taskName, setTaskName] = useState("");

    function handleChange(e) {
        setTaskName(e.target.value);
    }

    function handleButtonClicked() {
        props.onNewTask(taskName); // onNewTask is from props
        setTaskName("");
    }

    return (
        <div>
            <input onChange={handleChange} value={taskName} placeholder="New task name" className="border-1 border-solid rounded-md mr-2 py-1.5 pr-3 pl-2 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
            <button onClick={handleButtonClicked} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 p-1 pr-2 pl-2 rounded-md text-white">
                Add task
            </button>
        </div>
    );
}

export default AddTaskForm;