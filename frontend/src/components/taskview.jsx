import { useState } from 'react';
import PropTypes from 'prop-types';
import { ShowInsertedTags } from './showinsertedtags';
import { editTask, removeTask, fetchData } from './backendfunc';
import { checkDuplicates, extractSingularTags } from './helpers';
import { toast } from 'react-toastify';
import { DndContext } from '@dnd-kit/core';

const TaskView = ({ tasks, tags, setTasks, setTags }) => {
    const [editMode, setEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState([]);
    //const [sortTags, setSortTags] = useState([]);

    //Adjust task data and send the edited data to the backend
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
    //Delete the task from the database
    const deleteTask = async (id) => {
        await removeTask(id);
        await fetchData(setTasks, setTags);
    };
    //Add the tag to a task if it has not been previously placed. Ignore if it's already there
    const tagButtonClickForEditing = (tag) => {
        setEditedTags((prevTags) => {
            if (!prevTags.includes(tag)) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;
        if (active && over && active.id !== over.id) {
            const oldIndex = tasks.findIndex(task => task.id === active.id);
            const newIndex = tasks.findIndex(task => task.id === over.id);
            const updatedTasks = [...tasks];
            const [movedTask] = updatedTasks.splice(oldIndex, 1);
            updatedTasks.splice(newIndex, 0, movedTask);
            setTasks(updatedTasks);
        }
    };

    return (
        <>
        <h3>Tasks</h3>
            <DndContext onDragEnd={handleDragEnd}>
                {tasks.map((task) => (
                editMode === task.id ? (
                    <div key={task.id}>
                        <input
                            type="text"
                            defaultValue={task.name}
                            onChange={(e) => setEditedTask(e.target.value)}
                        />
                    <ShowInsertedTags tags={editedTags} setTags={setEditedTags} />
                    <div>
                        {tags.map((tag) => (
                            <button key={tag.id}
                            onClick={() => tagButtonClickForEditing(tag)}>
                            {tag.name}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => adjustTask(task.id)}>Save</button>
                    <button onClick={() => setEditMode(null)}>Cancel</button>
                    </div>
                    ) : (
                    <div key={task.id}>
                        <p>Name: <strong>{task.name}</strong></p>
                        <p>Tags: <strong>{task.tagNames}</strong></p>
                        <button
                            onClick={() => {
                            setEditMode(task.id);
                            setEditedTask(task.name);
                            setEditedTags(extractSingularTags(task.tags, tags));
                        }}>Edit
                        </button>
                        <button onClick={() => deleteTask(task.id)}>
                        Delete</button>
                    </div>
                    )
                ))}
            </DndContext>
        </>
    );
};

TaskView.propTypes = {
    tasks: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { TaskView };