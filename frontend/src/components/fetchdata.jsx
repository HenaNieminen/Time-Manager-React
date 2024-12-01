import axios from 'axios';

const fetchTasks = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3010/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

const fetchTags = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3010/tags');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

const fetchTimes = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3010/timestamps');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

export { fetchTasks, fetchTags, fetchTimes };