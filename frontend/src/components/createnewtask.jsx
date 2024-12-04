import { postTasks } from './postfunctions.jsx'
import { toast } from 'react-toastify';

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
            await postTasks(task);
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
