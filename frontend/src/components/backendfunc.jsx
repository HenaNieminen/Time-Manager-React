import axios from 'axios';
import { toast } from 'react-toastify';
import { extractTagNames } from './helpers';


//For fetching data as a single clump. Cowabunga it is with the prop drilling!
const fetchData = async (setTasks, setTags) => {
    try {
        const fetchedTasks = await fetchTasks();
        const fetchedTags = await fetchTags();
        const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);
        /*The reason why I am doing this is to get the tag names properly applied to tasks.
        there probably is a better way of doing this, but I'm now too far into making it
        this way*/
        setTasks(tasksWithTags);
        setTags(fetchedTags);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        toast.error("Failed syncing data:", error.message);
    }
};

const fetchTimeData = async (setTimes) => {
    try {
        const fetchedTimes = await fetchTimes();
        setTimes(fetchedTimes);
    } catch (error) {
        console.error('Error fetching time data:', error.message);
        toast.error("Failed syncing times:", error.message);
    }
}

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
const removeTask = async (taskId) => {
    try {
        await axios.delete(`http://127.0.0.1:3010/tasks/${taskId}`);
    } catch (error) {
        console.error('Error removing task:', error.message);
        throw new Error(error.message);
    }
}

const removeTag = async (tagId) => {
    try {
        await axios.delete(`http://127.0.0.1:3010/tags/${tagId}`);
    } catch (error) {
        console.error('Error removing tag:', error.message);
        throw new Error(error.message);
    }
}

//Edit functions

const editTask = async (taskId, updatedTask) => {
    try {
        await axios.put(`http://127.0.0.1:3010/tasks/${taskId}`, updatedTask);
    } catch (error) {
        console.error('Error editing task or tags:', error.message);
        throw new Error(error.message);
    }
};

const editTag = async (tagId, updatedTag) => {
    try {
        console.log(updatedTag);
        await axios.put(`http://127.0.0.1:3010/tags/${tagId}`, updatedTag);
    } catch (error) {
        console.error('Error editing task or tags:', error.message);
        throw new Error(error.message);
    }
}

export { postTasks,
        postTags,
        postTimes,
        removeTask,
        removeTag,
        fetchTasks,
        fetchTags,
        fetchTimes,
        editTask,
        editTag,
        fetchData,
        fetchTimeData
    };
