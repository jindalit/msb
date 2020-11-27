import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './protected.route'
import Header from './components/common/header'
import Footer from './components/common/footer'
import HomeMain from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Saftey from './components/saftey';
import About from './components/about';
import Tours from './components/tours';
import NewIncident from './components/admin/incident/newIncident';
import SafteyHome from './components/admin/incident';
import ViewIncident from './components/admin/incident/viewIncident'
import RequestList from './components/admin/requestList';
import AdminJobs from './components/admin/myJobs';
import AdminHome from './components/admin';
import Learning from './components/admin/learning';
import MyJobs from './components/myjobs';
import ViewHistory from './components/viewhistory'
import JobDetail from './components/viewhistory/jobDetail'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className={"App"}>

        <Router>
          <Header />
          <Switch>
            <ProtectedRoute exact path="/" component={HomeMain} />
            <ProtectedRoute path="/safety" component={Saftey} />
            <ProtectedRoute path="/about" component={About} />
            <ProtectedRoute path="/tour" component={Tours} />
            <ProtectedRoute path="/myjobs" component={MyJobs} />
            <ProtectedRoute path="/admin/newincident" component={NewIncident} />
            <ProtectedRoute path='/admin/viewIncident/:id' component={ViewIncident} />
            <ProtectedRoute path="/admin/reqList" component={RequestList} />
            <ProtectedRoute path="/admin/adminJobs" component={AdminJobs} />
            <ProtectedRoute path="/admin/safety" component={SafteyHome} />
            <ProtectedRoute path="/admin/learning" component={Learning} />
            <ProtectedRoute path="/admin" component={AdminHome} />
            <ProtectedRoute path='/viewHistory' component={ViewHistory} />
            
            <Route path='/jobDetail/:id' component={JobDetail} />
            <Route path="/login" component={Login} />
            <Route path='/Signup' component={Signup} />
            <Route path="*">
              No Match
            </Route>
          </Switch>
          <Footer />
        </Router>
        
      </div>
    );
  }
}

export default App;
