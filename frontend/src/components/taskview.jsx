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
import '../styles/tags.css'

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
    //Add the tag to the state if its not previously there
    const handleTagClick = (tag, setTagsFunction) => {
        setTagsFunction((prevTags) => {
            const tagExists = prevTags.some((t) => t.id === tag.id);
            if (!tagExists) {
                return [...prevTags, tag];
            }
            return prevTags;
        });
    };
    //Tag click for editing a task
    const tagButtonClickForEditing = (tag) => {
        handleTagClick(tag, setEditedTags);
    };
    //Tag click for adding filters
    const addTagFilters = (tag) => {
        handleTagClick(tag, setTagFilters);
    };
    //Sensors for drag and drop
    const sensors = useSensors(
        //Use the mouse sensor to control the task cards
        useSensor(PointerSensor)
    );

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        //Define the active and over IDs
        const activeTaskId = active.id;
        const overTaskId = over.id;
        //Find the whole tasks
        const activeTask = tasks.find((task) => task.id === activeTaskId);
        const overTask = tasks.find((task) => task.id === overTaskId);

        /*Do a switcheroo on the tasks and swap their order by returning the opposites
        when their ID shows up. Otherwise keep the same order and just return the task
        for the new updatedTasks state */
        const updatedTasks = tasks.map((task) => {
            if (task.id === activeTaskId) return overTask;
            if (task.id === overTaskId) return activeTask;
            return task;
        });
        //Set the updatedTasks as the new state
        setTasks(updatedTasks);
        try {
            //Sync the new task order with the backend
            await Promise.all([
                editTask(activeTaskId, overTask),
                editTask(overTaskId, activeTask),
            ]);
            await fetchData(setTasks, setTags);
        } catch (error) {
            console.error("Error swapping task IDs:", error.message);
        }
    };
    //Refactor this. It doesnt make any sense
    const filteredTasks = tasks.filter((task) => {
        if (tagFilters.length === 0) return true;
        const taskTagIds = task.tags.split(',').map(Number);
        return taskTagIds.some((tagId) => tagFilters.some((filter) => filter.id === tagId));
    });

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h2>Tasks</h2>
            </div>
            <div style={{marginBottom: '20px'}}>
                <h3>Filter by tag</h3>
                    {tagFilters.length > 0 && (
                        <div className="tagsInserted">
                            <ShowInsertedTags
                            tags={tagFilters}
                            setTags={setTagFilters}
                            />
                        </div>
                    )}
                <div className='tagRow'>
                {tags.map((tag) => (
                    <button key={tag.id} onClick={() => addTagFilters(tag)}>
                        {tag.name}
                    </button>
                ))}
                </div>
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
                            <SortableTask key={task.id} id={task.id} bg="#FFF">
                                {/*When task is in edit mode*/ }
                            <div key={task.id}>
                                <div className='adder'>
                                    <input
                                        type="text"
                                        defaultValue={task.name}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                </div>
                                {editedTags.length > 0 && (
                                    <div className="tagsInserted">
                                        <ShowInsertedTags
                                            tags={editedTags}
                                            setTags={setEditedTags}
                                        />
                                    </div>
                                )}
                                <div className='tagRow'>
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
                                    {/*When task is in idle mode*/}
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