import { postTasks } from './postfunctions.jsx'
import { toast } from 'react-toastify';

const successNote = () => toast("Task added successfully!");
const failureNote = () => toast("Failure adding task. Check your connection or our server status!");
const missingName = () => toast("Name is required for the task");

const createNewTask = async (name, additional_data) => {
    if (name) {
        const task = {
            name,
            additional_data,
        };
        try {
            await postTasks(task);
            successNote();
        } catch (error) {
            console.error('Failed to add task:', error);
            failureNote();
        }
    } else {
        missingName();
    }
}

export { createNewTask };