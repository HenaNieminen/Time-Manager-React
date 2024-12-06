import { toast } from 'react-toastify';
import backFunc from './backendfunc.jsx';


const createNewTask = async (name, tags) => {
    if (name) {
        const task = {
            name,
            tags,
        };
        try {
            await backFunc.postTasks(task);
            toast.success("Created a new task");
        } catch (error) {
            console.error('Failed to add task:', error.message);
            toast.failure("Failed to create a new task:", error.message);
        }
    } else {
        toast.failure("Name is required for the task");
    }
}

const createNewTag = async (name) => {
    if (name) {
        const tag = {
            name,
        };
        try {
            await backFunc.postTags(tag);
            toast.success("Created a new tag");
        } catch (error) {
            console.error('Failed to add tag:', error.message);
            toast.failure("Failed to create a new tag", error.message);
        }
    } else {
        toast.failure("Name is required for the tag");
    }
}

const checkDuplicates = (state, newTaskName) => {
    //Goes through the state where tasks are stored and checks if there is a duplicate name
    for (const task of state) {
        if (task.name === newTaskName) {
            return true;
        }
    }
    return false;
};

export { createNewTask, createNewTag, checkDuplicates };
