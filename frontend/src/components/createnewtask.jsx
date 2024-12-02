import { postTasks } from './postdata.jsx'


const createNewTask = async (name, additional_data) => {
    if (name) {
        const task = {
            name,
            additional_data, // Include additional_data if provided
        };
        try {
            await postTasks(task); // Call the API function to post the task
            alert('Task added successfully!');
        } catch (error) {
            console.error('Failed to add task:', error);
            alert('Error adding the task.');
        }
    } else {
        alert('A name is required for the task');
    }
}

export { createNewTask };