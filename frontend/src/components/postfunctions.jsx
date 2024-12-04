import axios from 'axios';

const postTasks = async (task) => {
    try {
        //Post a given task object to the database
        await axios.post('http://127.0.0.1:3010/tasks', task);
    } catch (error) {
        console.error('Error posting tasks:', error);
        throw new Error(error);
    }
}

const postTags = async (tag) => {
    try {
        //Post a given tag object to the database
        await axios.post('http://127.0.0.1:3010/tags', tag);
    } catch (error) {
        console.error('Error posting tags:', error);
        throw new Error(error);
    }
}

const postTimes = async (time) => {
    try {
        //Post a given timestamp object to the database
        await axios.post('http://127.0.0.1:3010/timestamps', time)
    } catch (error) {
        console.error('Error posting times:', error);
        throw new Error(error);
    }
}

export { postTasks, postTags, postTimes };
