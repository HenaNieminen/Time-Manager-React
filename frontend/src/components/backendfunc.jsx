import axios from 'axios';
import { toast } from 'react-toastify';

//Fetch functions
const fetchTasks = async () => {
    try {
        // Fetch all tasks from the database
        const response = await axios.get('http://127.0.0.1:3010/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        throw new Error(error.message);
        // Returns an empty array if fails, giving no data
    }
}

const fetchTags = async () => {
    try {
        // Fetch all tags from the database
        const response = await axios.get('http://127.0.0.1:3010/tags');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error.message);
        throw new Error(error.message);
    }
}

const fetchTimes = async () => {
    try {
        // Fetch all timestamps from the database
        const response = await axios.get('http://127.0.0.1:3010/timestamps');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error.message);
        throw new Error(error.message);
    }
}

//Post functions
const postTasks = async (task) => {
    try {
        //Post a given task object to the database
        await axios.post('http://127.0.0.1:3010/tasks', task);
    } catch (error) {
        console.error('Error posting tasks:', error.message);
        throw new Error(error.message);
    }
}

const postTags = async (tag) => {
    try {
        //Post a given tag object to the database
        await axios.post('http://127.0.0.1:3010/tags', tag);
    } catch (error) {
        console.error('Error posting tags:', error.message);
        throw new Error(error.message);
    }
}

const postTimes = async (time) => {
    try {
        //Post a given timestamp object to the database
        await axios.post('http://127.0.0.1:3010/timestamps', time)
    } catch (error) {
        console.error('Error posting times:', error.message);
        throw new Error(error.message);
    }
}

//Remove functions
const success = () => toast.success(`Task deleted!`);

const removeTask = async (taskId) => {
    try {
        // Remove the task with the given taskId from the database
        await axios.delete(`http://127.0.0.1:3010/tasks/${taskId}`);
        success();
    } catch (error) {
        console.error('Error removing task:', error.message);
        throw new Error(error.message);
    }
}

export default { postTasks, postTags, postTimes, removeTask, fetchTasks, fetchTags, fetchTimes };
