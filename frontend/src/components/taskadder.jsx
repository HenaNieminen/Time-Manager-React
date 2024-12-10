import { ShowInsertedTags } from "./showinsertedtags";
import { checkDuplicates, createNewTask, removeUndefinedTags } from "./helpers";
import { fetchData, removeTag } from "./backendfunc";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from 'prop-types';

const TaskAdder = ({ tags, tasks, setTasks, setTags }) => {
    //useStates for inserting new tasks or tags
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTaskTag, setInsertedTaskTag] = useState([]);
    //Check if the task already exist and then send it to the database
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
    //Delete the tag, go through any task that holds it and remove the entries
    const deleteTag = async (id, tasks) => {
        await removeUndefinedTags(id, tasks);
        await removeTag(id);
        await fetchData(setTasks, setTags);
    };
    //Add the tag to the task if it hasn't been placed. Otherwise igonre
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
                    <button onClick={() => deleteTag(tag.id, tasks, tags)}>x</button>
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