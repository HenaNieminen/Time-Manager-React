import "../styles/main.css"
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTasks, fetchTags, fetchTimes } from '../components/fetchdata.jsx';

const FrontPage = () => {
    let [tasks, setTasks] = useState([]);
    let [tags, setTags] = useState([]);
    let [times, setTimes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await fetchTasks();
            setTasks(fetchedTasks);

            const fetchedTags = await fetchTags();
            setTags(fetchedTags);

            const fetchedTimes = await fetchTimes();
            setTimes(fetchedTimes);
        }
        fetchData();
    }, []);


    return (
        <>
        <h1>Hello. This is still under construction</h1>
        <Link to="/settings">Go to settings page</Link>
        <Link to="/info">Go to info page</Link>
        
        </>
    );
};

export default FrontPage;
