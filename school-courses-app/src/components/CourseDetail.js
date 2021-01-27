import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from "axios";

import Context from "../Context";

export default function CourseDetails (props) {
    const context = useContext(Context.Context);
    const history = useHistory();
    const authUser = context.authenticatedUser;

    const id = props.match.params.id;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [owner, setOwner] = useState(false);

    useEffect(() => {
        axios(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setEstimatedTime(response.data.estimatedTime);
                setMaterialsNeeded(response.data.materialsNeeded);
                setFirstName(response.data.user.firstName);
                setLastName(response.data.user.lastName);
                if(authUser.id === response.data.user.id) {
                    setOwner(true);
                }
            })
            .catch(error => console.log('Error fetching and parsing data', error));
    });

    const deleteCourse = () => {
        context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
            .then(() => history.push('/'))
            .catch((err) => {
                    console.log(err);
                    history.push('/error');
        });
    }

    return (
        <div>
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">

                            {
                                owner ? (
                                    <span>
                                        <Link className="button" to={'/courses/' + id + '/update'}>Update Course</Link>
                                        <Link className="button" to="#" onClick={deleteCourse}>Delete Course</Link>
                                    </span>
                                ) :
                                    null
                            }
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
            </div>
            <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <h3 className="course--title">{title}</h3>
                        <p>By {firstName + " " + lastName}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown>
                            {description}
                        </ReactMarkdown>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                <h4>Estimated Time</h4>
                                <h3>{estimatedTime}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    <ReactMarkdown>
                                        {materialsNeeded}
                                    </ReactMarkdown>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
