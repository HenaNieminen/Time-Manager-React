import axios from 'axios';
import { toast } from 'react-toastify';
import { extractTagNames } from './extractTagNames';


//For fetching data as a single clump. Cowabunga it is with the prop drilling!
const fetchData = async (setTasks, setTags) => {
    try {
        const fetchedTasks = await fetchTasks();
        const fetchedTags = await fetchTags();
        const tasksWithTags = extractTagNames(fetchedTasks, fetchedTags);

        setTasks(tasksWithTags);
        setTags(fetchedTags);
    } catch (error) {
        toast.error("Failed syncing data:", error.message);
    }
};

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
        toast.success('Task removed successfully!');
    } catch (error) {
        console.error('Error removing task:', error.message);
        throw new Error(error.message);
    }
}

const removeTag = async (tagId) => {
    try {
        await axios.delete(`http://127.0.0.1:3010/tags/${tagId}`);
        toast.success('Tag removed successfully!');
    } catch (error) {
        console.error('Error removing tag:', error.message);
        throw new Error(error.message);
    }
}

//Edit functions

const editTask = async (taskId, updatedTask) => {
    try {
        await axios.put(`http://127.0.0.1:3010/tasks/${taskId}`, updatedTask);
        toast.success('Task and tags updated successfully!');
    } catch (error) {
        console.error('Error editing task or tags:', error.message);
        throw new Error(error.message);
    }
};

const editTag = async (tagId, updatedTag) => {
    try {
        const tagUpdate = {
            tagId,
            name: updatedTag
        };
        await axios.put(`http://127.0.0.1:3010/tags/${tagId}`, tagUpdate);
        toast.success('Tag updated successfully!');
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
        fetchData };
//11 FUNCTIONS!!!
