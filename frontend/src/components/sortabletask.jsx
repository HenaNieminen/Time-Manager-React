import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableTask({ id, children, bg }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: bg,
    };

    return (
        <div className="sortableTask" ref={setNodeRef} style={style}>
            <div {...attributes} {...listeners} className="drag-handle">
                <span>☰</span>
            </div>
            {children}
        </div>
    );
}