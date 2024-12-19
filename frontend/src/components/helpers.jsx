import { toast } from 'react-toastify';
import { postTasks, editTask, postTags } from './backendfunc.jsx';

//Function to help creating a new task. Will post the task to the backend
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
//The same for tags
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
        //To lowercase on both to ignore cases
        if (item.name.toLowerCase() === selected.toLowerCase()) {
            return true;
        }
    }
    return false;
};


const removeUndefinedTags = async (id, tasks) => {
    /*Goes through each task, seeing if the deleted tag's id is found and then filters it out.
    The tagids in the task object are in string so that's why it needs conversions*/
    for (const task of tasks) {
        const tagIds = task.tags.split(',').map(tag => tag.trim());
        const updatedTagIds = tagIds.filter(tag => tag !== id.toString());
        const updatedTags = updatedTagIds.join(',');

        if (task.tags !== updatedTags) {
            task.tags = updatedTags;
            await editTask(task.id, task);
        }
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
        /*Join all tagNames into task. This may seem inane, but it makes displaying them easier.
        Don't know a better solution*/
        task.tagNames = tagNames.join(', ');
    }
    return tasks;
}

const extractSingularTags = (tags, allTags) => {
    //Get the tagIds into an array
    const tagIds = tags.split(',').map((id) => parseInt(id));
    const extractedTags = tagIds.map((id) => {
        //See which tags match
        return allTags.find((tag) => tag.id === id);
    });
    //Filters any undefined values out
    const filteredTags = extractedTags.filter((tag) => tag);
    return filteredTags;
};

export { createNewTask,
        createNewTag,
        checkDuplicates,
        removeUndefinedTags,
        extractTagNames,
        extractSingularTags
};
