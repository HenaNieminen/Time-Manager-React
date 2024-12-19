import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import PropTypes from 'prop-types';

//This code is a bit of a mishmash of your class example and Casmoden solutions example from here https://www.youtube.com/watch?v=DVqVQwg_6_4
export default function SortableTask({ id, children, bg }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        animateLayoutChanges: defaultAnimateLayoutChanges,
    });
    /*Style has transform with coordinates and transition has a snappy 50ms ease
    by default*/
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition: transition || 'transform 50ms ease',
        backgroundColor: bg || "#FFFFFFFF",
        //Background color was planned for each task where user could select its color by using the additional_data in tasks
    }

    return (
        /*I had trouble making edit and delete buttons work when taskcards were
        applied, so Co-Pilot suggested a solution where you put the listeners
        to a certain spot of the card and make a drag handle*/
        <div className="sortableTask" ref={setNodeRef} style={style}>
            <div {...attributes} {...listeners} className="dragHandle">
                <span>☰</span>
            </div>
            {children}
        </div>
    );
}

SortableTask.propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.node,
    bg: PropTypes.string,
};
