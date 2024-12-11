import PropTypes from 'prop-types';
/*This is a general component that shows what tags have been inserted
to a task when editing a task or adding one. It will take the state
from adding or editing and will remove the tag from insertion if clicked */
const ShowInsertedTags = ({ tags, setTags, }) => {
    return (
        <div style={{ textAlign: 'center', margin: '0px' }}>
            <h4>Inserted tags</h4>
            {tags.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => {
                        const updatedTags = tags.filter((t) => t !== tag);
                        setTags(updatedTags);
                    }}
                >
                    {tag.name}
                </button>
            ))}
        </div>
    );
};
//Prop validation. Eslint keeps nagging about it if you don't have prop validation
ShowInsertedTags.propTypes = {
    tags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
};

export { ShowInsertedTags };
