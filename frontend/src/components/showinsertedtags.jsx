import PropTypes from 'prop-types';

const ShowInsertedTags = ({ state, setState, }) => {
    return (
        <div>
            <h3>Inserted Tags</h3>
            {state.map((tag, index) => (
                <button
                    key={index}
                    onClick={() => {
                        const updatedTags = state.filter((t) => t !== tag); // Remove the clicked tag
                        setState(updatedTags); // Update the state
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
    state: PropTypes.array.isRequired,
    setState: PropTypes.func.isRequired,
};

export { ShowInsertedTags };
