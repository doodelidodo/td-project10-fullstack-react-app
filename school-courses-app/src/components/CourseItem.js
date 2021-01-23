import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from "../Context";

export default function CourseItem(props) {
    const course = props.course;
    return(
        <div className="grid-33">
            <Link className="course--module course--link" to={"/courses/" + course.id}>
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
            </Link>
        </div>
    )
}
