import { createNewTag, checkDuplicates } from "./helpers";
import { fetchData } from "./backendfunc";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from 'prop-types';
import '../styles//adders.css'

const TagAdder = ({ tags, setTasks, setTags }) => {
    const [addedTag, setAddedTag] = useState('');

    const addTag = async () => {
        const isDuplicate = checkDuplicates(tags, addedTag);
        if (isDuplicate) {
            toast.error('Tag already exists!');
            return;
        }
        await createNewTag(addedTag);
        await fetchData(setTasks, setTags);
    };

    return (
        <div className="adder">
            <input
                type="text"
                placeholder="Tag name"
                id="tagName"
                value={addedTag}
                onChange={(e) => setAddedTag(e.target.value)}
            />
            <button onClick={() => { addTag(); setAddedTag(''); }}>Add Tag</button>
        </div>
    );
};

TagAdder.propTypes = {
    tags: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { TagAdder };
