import { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import AddTaskForm from "./components/AddTaskForm";

function App(props) {
  const [taskList, setTaskList] = useState(props.tasks)

  function addTask(taskName) {
    const newTask = { id: `todo-${nanoid()}`, name: taskName, completed: true };
    setTaskList([...taskList, newTask]);
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

  return (
    <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
      <AddTaskForm onNewTask={addTask} />
      <section>
        <h1 className="text-xl font-bold">To do</h1>
        <ul>
          {[taskList?.map((task) => <Todo id={task.id} name={task.name} complete={task.complete} key={task.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} />)]}
        </ul>
      </section>
    </main>
  );
}

export default App;