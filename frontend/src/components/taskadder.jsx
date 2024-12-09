import { ShowInsertedTags } from "./showinsertedtags";
import { checkDuplicates, createNewTask } from "./createnew";
import { fetchData, removeTag } from "./backendfunc";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from 'prop-types';

const TaskAdder = ({ tags, tasks, setTasks, setTags }) => {
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTaskTag, setInsertedTaskTag] = useState([]);

    const addTask = async () => {
        const isDuplicate = checkDuplicates(tasks, insertedTask);
        if (isDuplicate) {
            toast.error('Task already exists!');
            return;
        }
        const tagIds = insertedTaskTag.map((tag) => tag.id);
        await createNewTask(insertedTask, tagIds);
        await fetchData(setTasks, setTags);
    };

    const deleteTag = async (id) => {
        await removeTag(id);
        await fetchData(setTasks, setTags);
    };

    const tagButtonClickForAdding = (tag) => {
        setInsertedTaskTag((prevTags) => {
            if (!prevTags.includes(tag)) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Task Name"
                id="taskName"
                value={insertedTask}
                onChange={(e) => setInsertedTasks(e.target.value)}
            />
            <div>
                <ShowInsertedTags
                    tags={insertedTaskTag}
                    setTags={setInsertedTaskTag}
                />
            </div>
            {tags.map((tag) => (
                <div key={tag.id}>
                    <button onClick={() => tagButtonClickForAdding(tag)}>
                        {tag.name}
                    </button>
                    <button onClick={() => deleteTag(tag.id)}>x</button>
                </div>
            ))}
            <div>
                <button onClick={() => {
                    setInsertedTaskTag([]);
                    setInsertedTasks('');
                    addTask();
                }}>Add Task</button>
            </div>
        </div>
    );
}
TaskAdder.propTypes = {
    tags: PropTypes.array.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { TaskAdder };