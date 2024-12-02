import axios from 'axios';

const fetchTasks = async () => {
    try {
        // Fetch all tasks from the database
        const response = await axios.get('http://127.0.0.1:3010/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error("Server is probably down or fucky wucky");
        // Returns an empty array if fails, giving no data
    }
}

const fetchTags = async () => {
    try {
        // Fetch all tags from the database
        const response = await axios.get('http://127.0.0.1:3010/tags');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error("Server is probably down or fucky wucky");
    }
}

const fetchTimes = async () => {
    try {
        // Fetch all timestamps from the database
        const response = await axios.get('http://127.0.0.1:3010/timestamps');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
        throw new Error("Server is probably down or fucky wucky");
    }
}

export { fetchTasks, fetchTags, fetchTimes };