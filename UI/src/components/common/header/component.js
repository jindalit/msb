import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, useHistory, NavLink } from 'react-router-dom';
import axios from 'axios'
import { services } from '../constant'


export default function Header(props) {
    let history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [role, setRole] = React.useState(null);
    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            axios.get(services.baseUrl + services.roles + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                response.data.data.forEach(element => {
                    if (element._id === JSON.parse(sessionStorage.getItem('user')).role) {
                        setRole(element.name)
                    }
                })
            })

        } else { setRole('User') }
    }, [props])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        sessionStorage.clear()
        history.push('/login')
        handleClose()
    }

    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-light bg-light rounded mb-4">
                <div class="container">
                    <Link to="/" class="navbar-brand"><img src="images/logo_msrhwlabs.png" /></Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <NavLink to={role === 'User' ? "/" : "/admin"} className={"nav-link"} activeClassName='active' exact={true}>SERVICES HOME </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to={role === 'User' ? "/safety" : "/admin/safety"} className={"nav-link"} activeClassName='active'>Safety</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to='/about' className={"nav-link"} activeClassName='active'>ABOUT </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className={"nav-link"} activeClassName='active' to='/tour'>TOURS</NavLink>
                            </li>
                            {role !== 'User' ? <li class="nav-item">
                                <NavLink className={"nav-link"} activeClassName='active' to='/viewHistory'>View History</NavLink>
                            </li> : ''}
                        </ul>
                        <div class="nav-right mt-2 mt-md-0">
                            {/* <ul class="navbar-nav">
                                <li class="nav-item">
                                    <NavLink className={"nav-link"} activeClassName='active' to='/myjobs'>my jobs</NavLink>
                                </li>
                            </ul> */}
                            <span class="nav-person">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </span>
                            <div class="dropdown">
                                <Button class="btn btn-secondary dropdown-toggle" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    {sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).username : 'Welcome User'}
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >

                                    <MenuItem onClick={logOut}>Logout</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )

}
Header.propTypes = {
    getRole: PropTypes.string
}