import { useState } from 'react';
import PropTypes from 'prop-types';
import { ShowInsertedTags } from './showinsertedtags';
import { editTask, removeTask, fetchData } from './backendfunc';
import { checkDuplicates, extractSingularTags } from './helpers';
import { toast } from 'react-toastify';

const TaskView = ({ tasks, tags, setTasks, setTags }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState([]);

    const adjustTask = async (id) => {
        const originalTask = tasks.find((task) => task.id === id);
        if (originalTask.name !== editedTask) {
            const isDuplicate = await checkDuplicates(tasks, editedTask);
            if (isDuplicate) {
                toast.error('Task already exists!');
                return;
            }
        }
        const tagId = editedTags.map((tag) => tag.id);
        await editTask(id, { name: editedTask, tags: tagId });
        await fetchData(setTasks, setTags);
        setEditMode(null);
    };

    const deleteTask = async (id) => {
        await removeTask(id);
        await fetchData(setTasks, setTags);
    };

    const tagButtonClickForEditing = (tag) => {
        setEditedTags((prevTags) => (!prevTags.includes(tag) ? [...prevTags, tag] : prevTags));
    };

    return (
        <ul>
            <h3>Tasks</h3>
            {tasks.map((task, index) => (
                <li key={index}>
                    {editMode === task.id ? (
                        <div>
                            <input
                                type="text"
                                defaultValue={task.name}
                                onChange={(e) => setEditedTask(e.target.value)}
                            />
                            <ShowInsertedTags tags={editedTags} setTags={setEditedTags} />
                            <div>
                                {tags.map((tag) => (
                                    <button key={tag.id} onClick={() => tagButtonClickForEditing(tag)}>
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => adjustTask(task.id)}>Save</button>
                            <button onClick={() => setEditMode(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>Name: <strong>{task.name}</strong></p>
                            <p>Tags: <strong>{task.tagNames}</strong></p>
                            <button
                                onClick={() => {
                                    setEditMode(task.id);
                                    setEditedTask(task.name);
                                    setEditedTags(extractSingularTags(task.tags, tags));
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

TaskView.propTypes = {
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { TaskView };