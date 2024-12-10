import { toast } from 'react-toastify';
import { postTasks, editTask, postTags } from './backendfunc.jsx';


const createNewTask = async (name, tags) => {
    if (name) {
        const task = {
            name,
            tags,
        };
        try {
            await postTasks(task);
            toast.success("Created a new task");
        } catch (error) {
            console.error('Failed to add task:', error.message);
            toast.error("Failed to create a new task:", error.message);
        }
    } else {
        toast.error("Name is required for the task");
    }
}

const createNewTag = async (name) => {
    if (name) {
        const tag = {
            name,
        };
        try {
            await postTags(tag);
            toast.success("Created a new tag");
        } catch (error) {
            console.error('Failed to add tag:', error.message);
            toast.error("Failed to create a new tag", error.message);
        }
    } else {
        toast.error("Name is required for the tag");
    }
}

const checkDuplicates = (state, selected) => {
    //Goes through the state where tasks are stored and checks if there is a duplicate name
    for (const item of state) {
        if (item.name === selected) {
            return true;
        }
    }
    return false;
};


const removeUndefinedTags= async (id, tasks) => {
    for (const task of tasks) {
        task.tags = task.tags.split(',').filter(tag => tag !== id).join(',');
        await editTask(task.id, task);
    }
};

const extractTagNames = (tasks, tags) => {
    for (let task of tasks) {
        //Go through tags inside the task and map them to tagIds
        const tagIds = task.tags.split(',').map((id) => parseInt(id));
        //Make an empty array to push names into
        let tagNames = [];
        //Go through each tagId mapped into tagIds
        for (let id of tagIds) {
            for (let tag of tags) {
                //Go through fetched tags and see if the split id matches. Then push its name
                if (tag.id === id) {
                    tagNames.push(tag.name);
                    break;
                }
            }
        }
        //Join all tagNames into task
        task.tagNames = tagNames.join(', ');
    }
    return tasks;
}

const extractSingularTags = (tags, allTags) => {
    return tags
        .split(',')
        .map((id) => parseInt(id.trim(), 10))
        .map((id) => allTags.find((tag) => tag.id === id))
        .filter((tag) => tag);
};

export { createNewTask,
        createNewTag,
        checkDuplicates,
        removeUndefinedTags,
        extractTagNames,
        extractSingularTags
};
