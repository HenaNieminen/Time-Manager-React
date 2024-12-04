import { toast } from 'react-toastify';
import backFunc from './backendfunc.jsx'
//I know it may not be the most optimal to export and import all as default, but fuck it
const successNote = () => toast.success("Task added successfully!");
const failureNote = (message) => toast.error(`Failure adding task. Error: ${message} !`);
const missingName = () => toast("Name is required for the task");

const createNewTask = async (name, tags) => {
    if (name) {
        const task = {
            name,
            tags,
        };
        try {
            await backFunc.postTasks(task);
            successNote();
        } catch (error) {
            console.error('Failed to add task:', error.message);
            failureNote(error.message);
        }
    } else {
        missingName();
    }
}

export { createNewTask };
