import PropTypes from 'prop-types';

const ShowInsertedTags = ({ tags, setTags, }) => {
    return (
        <div>
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
                    &times;
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
