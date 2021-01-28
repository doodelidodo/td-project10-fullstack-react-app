import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

//components
import Header from './components/Header';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import PrivateRoute from './PrivateRoute';
import UpdateCourses from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import UnhandledError from "./components/UnhandledError";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Courses}/>
                    <PrivateRoute path="/courses/:id/update" component={UpdateCourses}/>
                    <Route path="/signin" component={UserSignIn}/>
                    <Route path="/signup" component={UserSignUp}/>
                    <Route path="/signout" component={UserSignOut}/>
                    <PrivateRoute exact path="/courses/create" component={CreateCourse}/>
                    <Route path="/courses/:id" component={CourseDetail}/>
                    <Route path="/notfound" component={NotFound}/>
                    <Route path="/forbidden" component={Forbidden}/>
                    <Route path="/error" component={UnhandledError}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
