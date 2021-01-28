import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Form from './Form';
import Context from "../Context";
import axios from "axios";

export default function CreateCourse(props) {
    const context = useContext(Context.Context);
    const history = useHistory();
    const authUser = context.authenticatedUser;

    const id = props.match.params.id;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        //fetching the course with the param course id
        axios(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                const authUser = context.authenticatedUser;
                //if user id not matching with signed in user id, reroute to forbidden page
                if(response.data.user.id !== authUser.id) {
                    history.push('/forbidden');
                }
                setTitle(response.data.title);
                setDescription(response.data.description);
                setEstimatedTime(response.data.estimatedTime);
                setMaterialsNeeded(response.data.materialsNeeded);
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
                if(error.response.status === 404) {
                    history.push('/notfound');
                } else if(error.response.status === 403) {
                    history.push('/forbidden');
                } else {
                    history.push('/error')
                }
            });
    },[history, id, context.authenticatedUser]);

    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "estimatedTime":
                setEstimatedTime(value);
                break;
            case "materialsNeeded":
                setMaterialsNeeded(value);
                break;
            default:
                return;
        }
    }

    const submit = () => {
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id,
        }

        //update the course and reroute to course details, if errors show errors
        context.data.updateCourse(course, authUser.emailAddress, authUser.password)
            .then( errors => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    history.push("/courses/" + id);
                }
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    }

    const cancel = () => {
        history.push('/');
    }

    return (
        <div className="bounds course--detail">
            <h1>Update Course</h1>
            <div>
                <Form cancel={cancel}
                      errors={errors}
                      submit={submit}
                      submitButtonText="Update Course"
                      elements={() => (
                          <React.Fragment>
                              <div className="grid-66">
                                  <div className="course--header">
                                      <h4 className="course--label">Course</h4>
                                      <div>
                                          <input id="title"
                                                 name="title"
                                                 type="text"
                                                 className="input-title course--title--input"
                                                 placeholder="Course title..."
                                                 value={title}
                                                 onChange={change}/>
                                      </div>
                                      <p>{"By " + authUser.firstName + " " + authUser.lastName}</p>
                                  </div>
                                  <div className="course--description">
                                      <div>
                                              <textarea
                                                  id="description"
                                                  name="description"
                                                  className=""
                                                  placeholder="Course description..."
                                                  value={description}
                                                  onChange={change}>
                                              </textarea>
                                      </div>
                                  </div>
                              </div>
                              <div className="grid-25 grid-right">
                                  <div className="course--stats">
                                      <ul className="course--stats--list">
                                          <li className="course--stats--list--item">
                                              <h4>Estimated Time</h4>
                                              <div>
                                                  <input
                                                      id="estimatedTime"
                                                      name="estimatedTime"
                                                      type="text"
                                                      className="course--time--input"
                                                      placeholder="Hours"
                                                      value={estimatedTime}
                                                      onChange={change} />
                                              </div>
                                          </li>
                                          <li className="course--stats--list--item">
                                              <h4>Materials Needed</h4>
                                              <div>
                                                  <textarea id="materialsNeeded" name="materialsNeeded"
                                                            className=""
                                                            placeholder="List materials..."
                                                            value={materialsNeeded}
                                                            onChange={change} >
                                                  </textarea>
                                              </div>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </React.Fragment>
                      )}/>
            </div>
        </div>
    );
}
