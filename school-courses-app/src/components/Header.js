import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from "../Context";

export default function Header() {
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;

    return(
        <div className="header">
            <div className="bounds">
                <Link to="/">
                    <h1 className="header--logo">Courses</h1>
                </Link>
                <nav>
                    {authUser ? (
                        <React.Fragment>
                            <span>Welcome, {authUser.firstName}!</span>
                            <Link to="/signout">Sign Out</Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link className="signup" to="/signup">Sign Up</Link>
                            <Link className="signin" to="/signin">Sign In</Link>
                        </React.Fragment>
                    )}
                </nav>
            </div>
        </div>
    )
}
