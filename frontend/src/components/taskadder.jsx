import { ShowInsertedTags } from "./showinsertedtags";
import { checkDuplicates, createNewTask, removeUndefinedTags } from "./helpers";
import { fetchData, removeTag, editTag } from "./backendfunc";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from 'prop-types';
import '../styles/tags.css'
import '../styles/taskcards.css';

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
    //Set mode on for tag deletion
    const toggleDeleteMode = () => {
        if (tagEditMode) {
            setTagEditMode(null);
        }
        setTagDeleteMode((prevMode) => !prevMode);
    };

    return (
        <div>
            <div className="adder">
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
            </div>
            {insertedTaskTag.length > 0 && (
                <div className="tagsInserted">
                    {/*Show inserted tags into a new task*/ }
                    <h4>Inserted tags:</h4>
                    <ShowInsertedTags
                        tags={insertedTaskTag}
                        setTags={setInsertedTaskTag}
                    />
                </div>
            )}
            <div className="tagRow">
                {tags.map((tag) => (
                    <div key={tag.id}>
                        {tagEditMode === tag.id ? (
                            //Edit mode inputs
                            <>
                                <input
                                    type="text"
                                    value={editedTag}
                                    onChange={(e) => setEditedTag(e.target.value)}
                                />
                                <button onClick={() => adjustTag(tag.id)}>Save</button>
                                <button onClick={() => setTagEditMode(null)}>Cancel</button>
                            </>
                        ) : (
                            //Normal mode
                            <>
                                <button onClick={() => tagButtonClickForAdding(tag)}>
                                    {tag.name}
                                </button>
                                {tagEditMode && (
                                    //Render an edit button
                                    <button
                                        onClick={() => {
                                            setTagEditMode(tag.id);
                                            setEditedTag(tag.name);
                                            setTagDeleteMode(null);
                                        }}
                                    >
                                        ed.
                                    </button>
                                )}
                                {tagDeleteMode && (
                                    //Render a red delete button in delete mode
                                    <button onClick={() => deleteTag(tag.id, tasks)} style={{ backgroundColor: "red" }}>X</button>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
            {tags.length > 0 && (
                <div className="manipulateBar" >
                    {/*Tag editing and deleting. Both cannot be on at the same time*/ }
                    <button onClick={toggleDeleteMode}>
                        {tagDeleteMode ? 'Return' : 'Delete tags'}
                    </button>
                    <button onClick={() => {
                        setTagEditMode(tagEditMode ? null : true);
                        setTagDeleteMode(null);
                    }}>
                        {tagEditMode ? 'Return' : 'Edit tags'}
                    </button>
                </div>
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