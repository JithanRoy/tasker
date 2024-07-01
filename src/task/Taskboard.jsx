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

  const onSubmitAddTask = () => {
    console.log("Click me baby!");
    setModule(true);
  };

  return (
    <>
      <section className='mb-20'  id="tasks">
        {module && <AddTask onSave={onSubmitAddTask} />}
        <div className="container">
          <SearchTask />
          <div className={`rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16 transition-all duration-300 ${module ? "filter blur-md" : ""}` }>
            <TaskAction onSubmitAddTask={onSubmitAddTask} />
            <TaskList tasks={tasks} />
          </div>
        </div>
      </section>
    </>
  );
}
