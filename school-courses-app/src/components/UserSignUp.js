import React, { useState, useContext} from 'react';
import { Link, useHistory} from 'react-router-dom';
import Form from './Form';
import Context from '../Context'

export default function UserSignUp() {
  const context = useContext(Context.Context)
  let history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEMail] = useState('');
  const [password, setPass] = useState('');
  const [confirmPassword, setConfirmPass] = useState('');
  const [errors,setErrors] = useState([])
  const change = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
        case "firstName":
            setFirstName(value);
            break;
        case "lastName":
            setLastName(value);
            break;
        case "emailAddress":
            setEMail(value);
            break;
        case "password":
            setPass(value);
            break;
        case "confirmPassword":
            setConfirmPass(value);
            break;
      default:
        return;
    }
  }

  const submit = () => {
    // Create user
    const user = {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword,
    };

    if (user.password !== user.confirmPassword) {
       setErrors({errors: ['Password do not match']})
    } else {
        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    setErrors(errors)
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            history.push('/authenticated');
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    }
  }

  const cancel = () => {
   history.push('/');
  }
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={change}
                  placeholder="First Name" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={change}
                  placeholder="Last Name" />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  onChange={change}
                  placeholder="Email" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={change}
                  placeholder="Password" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={change}
                  placeholder="Confirm Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
}
