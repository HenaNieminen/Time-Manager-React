import { useState, useEffect,  } from 'react';
import { fetchData } from './backendfunc.jsx';
import { TaskView } from './taskview.jsx';
import { TaskAdder } from './taskadder.jsx';
import { TagAdder } from './tagadder.jsx';
import "../styles/main.css";

/*I know this is probably not the best way of implementing this, but the general
idea is to have setStates at the very top and then drill them as props to all elements.
fetchData is a general function that will fetch all data needed and it is also accessible
to the other components in the backendfunc file. Those functions in return will automatically
update the data to the backend so all changes should be seen by every component immediately
without worrying about saving or having updated data only being seen for that one component
that manipulated it. Major refactoring would be in place, but for the sake of this being
my first project, I'd rather not go the extra mile of refactoring without a clue how,
and then returning a non functional POS (Piece of software ;) )*/
const TaskWindow = () => {
    //Data use states to drill into props
    const [tasks, setTasks] = useState([]);
    const [tags, setTags] = useState([]);
    const [times, setTimes] = useState([]);

    useEffect(() => {
        //Fetch all data when component mounts
        fetchData(setTasks, setTags, setTimes);
    }, []);

    return (
        <>
            <div className="windowRow">
                <div>
                    {/*Agressive amounts of prop drilling. Yummy!*/}
                    <TaskView
                    tasks={tasks}
                    tags={tags}
                    times={times}
                    setTasks={setTasks}
                    setTags={setTags}
                    setTimes={setTimes}
                    />
                </div>
            </div>
            <div className="windowRow">
                {/*Can't get enough of prop drilling! */}
                <TaskAdder
                tags={tags}
                tasks={tasks}
                setTasks={setTasks}
                setTags={setTags}
                />
            </div>
            <div className="windowRow">
                <TagAdder
                tags={tags}
                setTasks={setTasks}
                setTags={setTags} />
            </div>
        </>
    );
};

export default TaskWindow;
