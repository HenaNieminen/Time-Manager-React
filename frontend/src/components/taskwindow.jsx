import { useState, useEffect,  } from 'react';
import { removeTag, fetchData } from './backendfunc.jsx';
import { toast } from 'react-toastify';
import { TaskView } from './taskview.jsx';
import { TaskAdder } from './taskadder.jsx';
import { createNewTag, checkDuplicates } from './createnew.jsx';
import "../styles/main.css";

const TaskWindow = () => {
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [addedTag, setAddedTag] = useState('');

    const addTag = async () => {
        const isDuplicate = checkDuplicates(tags, addedTag);
        if (isDuplicate) {
            toast.error('Tag already exists!');
            return;
        }
        await createNewTag(addedTag);
        await fetchData(setTasks, setTags);
    };

    const deleteTag = async (id) => {
        await removeTag(id);
        await fetchData(setTasks, setTags);
    };

    useEffect(() => {
        fetchData(setTasks, setTags);
    }, [setTags, setTasks]);

    return (
        <>
            <div className="window-row">
                <div className="task-window">
                    {/*Agressive amounts of prop drilling. Yummy!*/}
                    <TaskView tasks={tasks}
                    tags={tags}
                    setTasks={setTasks}
                    setTags={setTags}
                    />
                </div>
            </div>
            <div>
                <TaskAdder tags={tags}
                tasks={tasks}
                setTasks={setTasks}
                setTags={setTags}
                />
            </div>
            <input
                type="text"
                placeholder="Tag name"
                id="tagName"
                value={addedTag}
                onChange={(e) => setAddedTag(e.target.value)}
            />
            <button onClick={() => { addTag(); setAddedTag('') }}>Add Tag </button>
        </>
    );
};

export default TaskWindow;
