import { useState } from "react";
import SearchTask from "./SearchTask";
import { TaskAction } from "./TaskAction";
import { TaskList } from "./TaskList";
import AddTask from "./AddTask";

export default function Taskboard() {
  const defaultTask = {
    "id": crypto.randomUUID(),
    "title": "Learn React to became a pro",
    "description":
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    "tags": ["web", "react", "js"],
    "priority": "High",
    "isFavorite": true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [module, setModule] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const onSaveData = (newTask, isAdd) => {
    if(isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if(task.id === newTask.id) {
            return newTask;
          } 
          return task;
        })
      )
    }
    setModule(false);
  }

  const handleTaskEdit = (task) => {
    setTaskToUpdate(task);
    setModule(true);
  }

  const onHandleCloseModule = () => {
    setModule(false);
    setTaskToUpdate(null);
  }

  const onHandleDelete = (taskId) => {
    const afterDeleteTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(afterDeleteTasks);
  }

  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  const handleFavTask = (taskId) => {
    TaskList(tasks.map((task) => {
      if(task.id === taskId) {
        return {...task, isFavorite: !task.isFavorite};
      } else {
        return task;
      }
    }))
  }

  return (
    <>
      <section className='mb-20'  id="tasks">
        {module && <AddTask onSave={onSaveData} taskToUpdate={taskToUpdate} onCloseModule={onHandleCloseModule} />}
        <div className="container">
          <SearchTask />
          <div className={`rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16 transition-all duration-300 ${module ? "filter blur-md" : ""}` }>
            <TaskAction onDeleteAllTask={handleDeleteAllTask} showModule={setModule} />
            <TaskList tasks={tasks} onEdit={handleTaskEdit} onDelete={onHandleDelete} onFav={handleFavTask} />
          </div>
        </div>
      </section>
    </>
  );
}
