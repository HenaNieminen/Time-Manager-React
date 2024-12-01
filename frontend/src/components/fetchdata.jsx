import axios from 'axios';

const fetchTasks = async () => {
    try {
        const response = await axios.get('/tasks');
        console.log(response);
        return response.data;

    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
}

const fetchTags = async () => {
    try {
        const response = await axios.get('/tags');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw error;
    }
}

export { fetchTasks, fetchTags };