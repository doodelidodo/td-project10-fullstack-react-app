import React, { useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import Context from "../Context";

export default function CreateCourse (props) {
    const context = useContext(Context.Context)
    let history = useHistory();

    const [emailAddress, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [errors] = useState([]);

    const change = (event) => {
        const value = event.target.value;
        switch (event.target.name) {
            case "emailAddress":
                setEmail(value);
                break;
            case "password":
                setPass(value);
                break;
            default:
                return;
        }
    }

    const submit = () => {
        const { from } = props.location.state || { from: { pathname: '/authenticated' } };

        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: [ 'Sign-in was unsuccessful' ] };
                    });
                } else {
                    history.push(from);
                }
            })
            .catch((error) => {
                console.error(error);
                history.push('/error');
            });
    }

    const cancel = () => {
        history.push('/');
    }

    return (
        <div className="bounds">
            <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="text"
                                value={emailAddress}
                                onChange={change}
                                placeholder="Email Address" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={change}
                                placeholder="Password" />
                        </React.Fragment>
                    )} />
                <div>
                    <div className="bounds course--detail">
                        <h1>Create Course</h1>
                        <div>
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        <li>Please provide a value for "Title"</li>
                                        <li>Please provide a value for "Description"</li>
                                    </ul>
                                </div>
                            </div>
                            <form>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div><input id="title" name="title" type="text"
                                                    className="input-title course--title--input"
                                                    placeholder="Course title..."
                                                    value=""/></div>
                                        <p>By Joe Smith</p>
                                    </div>
                                    <div className="course--description">
                                        <div><textarea id="description" name="description" className=""
                                                       placeholder="Course description..."></textarea></div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div><input id="estimatedTime" name="estimatedTime" type="text"
                                                            className="course--time--input"
                                                            placeholder="Hours" value="" /></div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div><textarea id="materialsNeeded" name="materialsNeeded" className=""
                                                               placeholder="List materials..."></textarea></div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Create Course</button>
                                    <button className="button button-secondary"
                                            onClick="event.preventDefault(); location.href='index.html';">Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
