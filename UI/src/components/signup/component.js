import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import './style.css'
import axios from 'axios'
import { services } from '../common/constant'

export default class Signup extends React.Component {
    static propTypes = {
        signupReq: PropTypes.func.isRequired,
        getNewUser: PropTypes.object,
        resetSignup: PropTypes.func,
        fetchProgress: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                role: '',
                isProjectContact: true,
                isTechContact: true
            },
            roles: []
        }
    }
    signupuser = (e) => {
        this.props.signupReq(this.state.formData)
    }
    myChangeHandler = (event) => {
        var formData = { ...this.state.formData }
        formData[event.target.name] = event.target.value
        this.setState({ formData });
    }

    componentDidUpdate() {
        if (this.props.getNewUser && this.props.getNewUser !== '') {
            this.props.resetSignup()
            alert(this.props.getNewUser)
            this.props.history.push('/login')
        }
    }
    componentDidMount() {
        axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            var formData = { ...this.state.formData }
            formData['role'] = response.data.data[0]._id
            this.setState({ roles: response.data.data, formData: formData })
        })
    }
    handleChange = (event) => {
        var formData = { ...this.state.formData }
        formData['role'] = event.target.value
        this.setState({ formData });
    }
    render() {
        const { fetchProgress } = this.props
        const roleItems = []
        if (this.state.roles) {
            for (let i = 0; i < this.state.roles.length; i++) {
                roleItems.push(
                    <option key={'req' + i} value={this.state.roles[i]._id}>{this.state.roles[i].name}</option>
                )
            }
        }
        return (
            <div class='register'>
                <h1>User Registration</h1>
                <p><label>First Name</label><input type='text' placeholder='First Name' name='firstname' onChange={this.myChangeHandler} /></p>
                <p><label>Last Name</label><input type='text' placeholder='Last Name' name='lastname' onChange={this.myChangeHandler} /></p>
                <p><label>Email</label><input type='text' placeholder='Email' name='email' onChange={this.myChangeHandler} /></p>
                <p><label>Password</label><input type='password' placeholder='Password' name='password' onChange={this.myChangeHandler} /></p>
                <p><label>Phone</label><input type='text' placeholder='Phone No' name='phone' onChange={this.myChangeHandler} /></p>
                <p><label>Role</label>
                    <select class="form-control" style={{ width: '250px' }}
                        value={this.state.formData.role}
                        onChange={this.handleChange}
                    >{roleItems}
                    </select></p>
                <p><label>Username</label><input type='text' placeholder='Username' name='username' onChange={this.myChangeHandler} /></p>
                <p><button onClick={e => this.signupuser(e)}>Signup</button> <Link to="/login">Back to Login</Link></p>
                {fetchProgress ? <CircularProgress color="secondary" /> : ''}
            </div>
        )
    }
}