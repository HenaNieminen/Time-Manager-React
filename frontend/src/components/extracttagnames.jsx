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
};

const extractSingularTags = (task) => {
    return task.tags.split(',').map((id) => parseInt(id));
};

export { extractTagNames };