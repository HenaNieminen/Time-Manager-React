import { toast } from 'react-toastify';
import { postTasks, postTags } from './backendfunc.jsx';


const createNewTask = async (name, tags) => {
    if (name) {
        const task = {
            name,
            tags,
        };
        try {
            await postTasks(task);
            toast.success("Created a new task");
        } catch (error) {
            console.error('Failed to add task:', error.message);
            toast.error("Failed to create a new task:", error.message);
        }
    } else {
        toast.error("Name is required for the task");
    }
}

const createNewTag = async (name) => {
    if (name) {
        const tag = {
            name,
        };
        try {
            await postTags(tag);
            toast.success("Created a new tag");
        } catch (error) {
            console.error('Failed to add tag:', error.message);
            toast.error("Failed to create a new tag", error.message);
        }
    } else {
        toast.error("Name is required for the tag");
    }
}

const checkDuplicates = (state, selected) => {
    //Goes through the state where tasks are stored and checks if there is a duplicate name
    for (const item of state) {
        if (item.name === selected) {
            return true;
        }
    }
    return false;
};

export { createNewTask, createNewTag, checkDuplicates };
