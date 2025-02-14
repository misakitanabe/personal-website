import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import AddTaskForm from "./components/AddTaskForm";
import AddTaskModal from "./components/AddTaskModal";
import { GroceryPanel } from "./components/GroceryPanel";

function App(props) {
  const [taskList, setTaskList] = useState(props.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function addTask(taskName) {
    const newTask = { id: `todo-${nanoid()}`, name: taskName, completed: true };
    setTaskList([...taskList, newTask]);
    setIsModalOpen(false);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        console.log(`toggling task ${id}`);
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  function deleteTask(id) {
    let updatedTasks = []
    taskList?.map((task) => {
      if (id !== task.id) {
        updatedTasks.push(task);
      }
    });
    setTaskList(updatedTasks);
  }

  function onCloseRequested() {
    setIsModalOpen(false);
  }

  return (
    <>
      <AddTaskModal headerLabel="New Task" isOpen={isModalOpen} onCloseRequested={onCloseRequested}>
        <AddTaskForm onNewTask={addTask} />
      </AddTaskModal>

      <main className="ml-4 mr-4"> {/* Tailwind: margin level 4 on all sides */}
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 mt-4 p-1 pr-2 pl-2 rounded-md text-white">New Task</button>
        <section className="">
          <h1 className="text-xl font-bold pt-1">To do</h1>
          <ul>
            {[taskList?.map((task) => <Todo id={task.id} name={task.name} complete={task.complete} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} />)]}
          </ul>
        </section>
        <GroceryPanel onAddToTodos={addTask} />
      </main>
    </>
  );
}

export default App;