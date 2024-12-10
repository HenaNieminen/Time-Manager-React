import { useState, useEffect,  } from 'react';
import { fetchData } from './backendfunc.jsx';
import { TaskView } from './taskview.jsx';
import { TaskAdder } from './taskadder.jsx';
import { TagAdder } from './tagadder.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchData(setTasks, setTags);
    }, []);

    return (
        <>
            <div className="window-row">
                <div className="task-window">
                    {/*Agressive amounts of prop drilling. Yummy!*/}
                    <TaskView
                    tasks={tasks}
                    tags={tags}
                    setTasks={setTasks}
                    setTags={setTags}
                    />
                </div>
            </div>
            <div>
                {/*Can't get enough of prop drilling! */}
                <TaskAdder
                tags={tags}
                tasks={tasks}
                setTasks={setTasks}
                setTags={setTags}
                />
            </div>
            <div>
                <TagAdder
                tags={tags}
                setTasks={setTasks}
                setTags={setTags} />
            </div>
        </>
    );
};

export default TaskWindow;
