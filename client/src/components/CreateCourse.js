import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Form from './Form';
import Context from "../Context";

export default function CreateCourse() {
    const context = useContext(Context.Context)
    const authUser = context.authenticatedUser;
    let history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);

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
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: authUser.id,
        }

        // create the course and routing to home, if errors appears setting error messages
        context.data.createCourse(course, authUser.emailAddress, authUser.password)
            .then( errors => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                   history.push("/");
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
            <h1>Create Course</h1>
            <div>
                <Form cancel={cancel}
                      errors={errors}
                      submit={submit}
                      submitButtonText="Create Course"
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
                                                      onChange={change} />
                                              </div>
                                          </li>
                                          <li className="course--stats--list--item">
                                              <h4>Materials Needed</h4>
                                              <div>
                                                  <textarea id="materialsNeeded" name="materialsNeeded"
                                                             className=""
                                                             placeholder="List materials..."
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
