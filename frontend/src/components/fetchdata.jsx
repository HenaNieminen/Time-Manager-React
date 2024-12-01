import axios from 'axios';

const fetchTasks = async () => {
    try {
        //Fetch all tasks from the database
        const response = await axios.get('http://127.0.0.1:3010/tasks');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

const fetchTags = async () => {
    try {
        //Fetch all tags from the database
        const response = await axios.get('http://127.0.0.1:3010/tags');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
}

const fetchTimes = async () => {
    try {
        //Fetch all timestamps from the database
        const response = await axios.get('http://127.0.0.1:3010/timestamps');
        return response.data;
    } catch (error) {
        console.error('Error fetching tags:', error);
    }
}

export { fetchTasks, fetchTags, fetchTimes };