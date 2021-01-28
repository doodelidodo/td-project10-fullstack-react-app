import React, { useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from './Form';
import Context from "../Context";

export default function UserSignIn (props) {
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
    context.actions.signIn(emailAddress, password)
        .then((user) => {
          if (user === null) {
            this.setState(() => {
              return { errors: [ 'Sign-in was unsuccessful' ] };
            });
          } else {
            history.goBack();
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
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }
