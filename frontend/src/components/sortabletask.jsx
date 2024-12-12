import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';

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

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        transition: transition || 'transform 50ms ease',
        backgroundColor: bg || "#FFF",
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