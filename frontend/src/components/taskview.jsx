import { useState } from 'react';
import PropTypes from 'prop-types';
import { ShowInsertedTags } from './showinsertedtags';
import { editTask, removeTask, fetchData } from './backendfunc';
import { checkDuplicates, extractSingularTags } from './helpers';
import { toast } from 'react-toastify';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import  SortableTask  from './sortabletask.jsx';
import '../styles/taskcards.css';

const TaskView = ({ tasks, tags, setTasks, setTags }) => {
    const [taskEditMode, setTaskEditMode] = useState(null);
    const [editedTask, setEditedTask] = useState('');
    const [editedTags, setEditedTags] = useState([]);
    const [tagFilters, setTagFilters] = useState([]);

    //Adjust task data and send the edited data to the backend
    const adjustTask = async (id) => {
        if (editedTask.length === 0) {
            toast.error('Task name cannot be empty!');
            return;
        }
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
        setTaskEditMode(null);
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

    const sensors = useSensors(
        //Use the mouse sensor primarily
        useSensor(PointerSensor)
    );

    const addTagFilters = (tag) => {
        setTagFilters((prevFilters) => {
            if (!prevFilters.includes(tag)) {
                return [...prevFilters, tag];
            }
            return prevFilters;
        });
    };


    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        const activeTaskId = active.id;
        const overTaskId = over.id;
        const activeTask = tasks.find((task) => task.id === activeTaskId);
        const overTask = tasks.find((task) => task.id === overTaskId);
        try {
            //I had trouble with this by awaiting both sequentially rather than promising them all in succession
            await Promise.all([
                editTask(activeTask.id, overTask),
                editTask(overTask.id, activeTask),
            ]);
            await fetchData(setTasks, setTags);
        } catch (error) {
            console.error("Error swapping task IDs:", error.message);
            toast.error("Failed to reorder tasks.");
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (tagFilters.length === 0) return true;
        const taskTagIds = task.tags.split(',').map(Number);
        return taskTagIds.some((tagId) => tagFilters.includes(tagId));
    });

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h2>Tasks</h2>
            </div>
            <div style={{marginBottom: '20px'}}>
                <h3>Filter by tag</h3>
                <div className="tagRow">
                    <ShowInsertedTags
                    tags={tagFilters}
                    setTags={setTagFilters}
                    />
                </div>
                {tags.map((tag) => (
                    <button key={tag.id} onClick={() => addTagFilters(tag.id)}>
                        {tag.name}
                    </button>
                ))}
            </div>
            {filteredTasks.length === 0 && (
                <h1>No tasks found</h1>
            )}
            <DndContext
                collisionDetection={closestCenter}
                sensors={sensors}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={filteredTasks.map((task) => task.id)}
                    strategy={rectSortingStrategy}
                >
                <div className="taskContainer">
                    {filteredTasks.map((task) => (
                        taskEditMode === task.id ? (
                            <SortableTask key={task.id} id={task.id} bg="#FFD700">
                            <div key={task.id}>
                                <input
                                    type="text"
                                    defaultValue={task.name}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                />
                                {editedTags.length > 0 && (
                                    <div>
                                        <ShowInsertedTags
                                            tags={editedTags}
                                            setTags={setEditedTags}
                                        />
                                    </div>
                                )}
                                <div>
                                    {tags.map((tag) => (
                                        <button key={tag.id}
                                            onClick={() => tagButtonClickForEditing(tag)}>
                                            {tag.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="manipulateBar">
                                    <button onClick={() => adjustTask(task.id)}>Save</button>
                                    <button onClick={() => setTaskEditMode(null)}>Cancel</button>
                                </div>
                            </div>
                            </SortableTask>
                        ) : (
                            <SortableTask key={task.id} id={task.id} bg="#FFF">
                                <p className="nameContainer">Name: <strong>{task.name}</strong></p>
                                <p className="nameContainer">Tags: <strong>{task.tagNames}</strong></p>
                                <div className="manipulateBar">
                                    <button
                                        onClick={() => {
                                            setTaskEditMode(task.id);
                                            setEditedTask(task.name);
                                            setEditedTags(extractSingularTags(task.tags, tags));
                                        }}>Edit</button>
                                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                                </div>
                            </SortableTask>
                        )
                    ))}
                </div>
                </SortableContext>
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