import PropTypes from 'prop-types';
/*This is a general component that shows what tags have been inserted
to a task when editing a task or adding one. It will take the state
from adding or editing and will remove the tag from insertion if clicked */
const ShowInsertedTags = ({ tags, setTags, }) => {
    return (
        <div>
            {tags.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => {
                        //To remove tags from the insertion
                        const updatedTags = tags.filter((t) => t !== tag);
                        setTags(updatedTags);
                    }}
                >
                    {tag.name} <span style={{ marginLeft: '5px' }}>X</span>
                </button>
            ))}
        </div>
    );
};

ShowInsertedTags.propTypes = {
    tags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { ShowInsertedTags };
