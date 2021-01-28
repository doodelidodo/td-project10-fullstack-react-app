import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";

import CourseItem from "./CourseItem";
import Context from "../Context";

export default function Courses () {
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;
    const [data, setData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios(`http://localhost:5000/api/courses`)
            .then(response => setData(response.data.courses))
            .catch(error => {
                console.log('Error fetching and parsing data', error)
                history.push('/error');
            });
    }, []);

    let courses = data.map(course => <CourseItem course={course} key={course.id} />);

    return (
        <div className="bounds">

            {courses}

            {
                authUser ?
                    (
                        <div className="grid-33">
                            <Link to="/courses/create" className="course--module course--add--module">
                                <h3 className="course--add--title">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         viewBox="0 0 13 13" className="add">
                                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                    </svg>
                                    New Course
                                </h3>
                            </Link>
                        </div>
                    )
                    :
                    ""
            }

        </div>
    );
}
