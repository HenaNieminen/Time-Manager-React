import { toast } from 'react-toastify';
import backFunc from './backendfunc.jsx';

const successNote = (type) => toast.success(`${type} added successfully!`);
const failureNote = (type, message) => toast.error(`Failure adding ${type}. Error: ${message} !`);
const missingName = (type) => toast(`${type} name is required`);

const createNewTask = async (name, tags) => {
    if (name) {
        const task = {
            name,
            tags,
        };
        try {
            await backFunc.postTasks(task);
            successNote('Task');
        } catch (error) {
            console.error('Failed to add task:', error.message);
            failureNote('task', error.message);
        }
    } else {
        missingName('Task');
    }
}

const createNewTag = async (tag) => {
    if (tag) {
        try {
            await backFunc.postTags(tag);
            successNote('Tag');
        } catch (error) {
            console.error('Failed to add tag:', error.message);
            failureNote('tag', error.message);
        }
    } else {
        missingName('Tag');
    }
}

export { createNewTask, createNewTag };
