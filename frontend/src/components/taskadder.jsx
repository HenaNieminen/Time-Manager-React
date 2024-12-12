import { ShowInsertedTags } from "./showinsertedtags";
import { checkDuplicates, createNewTask, removeUndefinedTags } from "./helpers";
import { fetchData, removeTag, editTag } from "./backendfunc";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from 'prop-types';
import '../styles/adders.css'

const TaskAdder = ({ tags, tasks, setTasks, setTags }) => {
    //useStates for inserting new tasks or tags
    const [insertedTask, setInsertedTasks] = useState('');
    const [insertedTaskTag, setInsertedTaskTag] = useState([]);
    const [tagDeleteMode, setTagDeleteMode] = useState(null);
    const [tagEditMode, setTagEditMode] = useState(null);
    const [editedTag, setEditedTag] = useState('');

    //Check if the task already exists and then send it to the database
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
    const adjustTag = async (id) => {
        if (editedTag.length === 0) {
            toast.error('Tag name cannot be empty!');
            setTagEditMode(null);
            return;
        }
        const originalTag = tags.find((tag) => tag.id === id);
        if (originalTag.name !== editedTag) {
            const isDuplicate = await checkDuplicates(tasks, editedTag);
            if (isDuplicate) {
                toast.error('Tag already exists!');
                return;
            }
        }
        //Combine the editedTag value with the ID to send it to the backend properly
        const newTag = { id, name: editedTag };
        await editTag(id, newTag);
        await fetchData(setTasks, setTags);
        setTagEditMode(null);
    }
    //Add the tag to the task if it hasn't been placed. Otherwise igonre
    const tagButtonClickForAdding = (tag) => {
        setInsertedTaskTag((prevTags) => {
            if (!prevTags.includes(tag)) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };

    const toggleDeleteMode = () => {
        if (tagEditMode) {
            setTagEditMode(null);
        }
        setTagDeleteMode((prevMode) => !prevMode);
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
            <button onClick={() => {
                setInsertedTaskTag([]);
                setInsertedTasks('');
                addTask();
            }}>Add Task</button>
            {insertedTaskTag.length > 0 && (
                <div>
                    <ShowInsertedTags
                        tags={insertedTaskTag}
                        setTags={setInsertedTaskTag}
                    />
                </div>
            )}
                <div className="tagRow" >
                    {tags.map((tag) => (
                        tagEditMode === tag.id ? (
                            <div key={tag.id}>
                                <input
                                    type="text"
                                    value={editedTag}
                                    onChange={(e) => setEditedTag(e.target.value)}
                                />
                                <button onClick={() => adjustTag(tag.id)}>Save</button>
                                <button onClick={() => setTagEditMode(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div key={tag.id}>
                                <button onClick={() => tagButtonClickForAdding(tag)}>
                                    {tag.name}
                                </button>
                                {!tagDeleteMode && (
                                    <button
                                        onClick={() => {
                                            setTagEditMode(tag.id);
                                            setEditedTag(tag.name);
                                        }}>Edit</button>
                                )}
                                {tagDeleteMode && (
                                    <button onClick={() => deleteTag(tag.id, tasks)}>x</button>
                                )}
                            </div>
                        )
                    ))}
                </div>
            {tags.length > 0 && (
                <button onClick={toggleDeleteMode}>
                    {tagDeleteMode ? 'Return' : 'Delete tags'}
                </button>
            )}
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