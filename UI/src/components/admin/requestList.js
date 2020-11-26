import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Dialog from '../home/dialog'
import { services } from '../common/constant'

export default class RequestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reqestList: [],
            statusList: [],
            contactList: [],
            dates: [],
            projectCont: [],
            techCont: [],
            status: [],
            userList: {},
            classList: []
        }
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
    }
    openDialog = (e, id) => {
        this.setState({
            dialogState: true,
            reqId: id
        })
    }
    componentDidMount() {
        axios.get(services.baseUrl + services.historyList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            var dates = [...this.state.dates];
            let projectCont = [...this.state.projectCont]
            let techCont = [...this.state.techCont]
            let status = [...this.state.status]
            response.data.data.forEach((elem, i) => {
                dates[i] = elem.startDate ? elem.startDate.split('/')[2] + '-' + elem.startDate.split('/')[0] + '-' + elem.startDate.split('/')[1] : '';
                projectCont[i] = elem.projectContact
                techCont[i] = elem.techContact
                status[i] = elem.status
            })
            this.setState({ dates, reqestList: response.data.data, projectCont, techCont, status })
            axios.get(services.baseUrl + services.getStatus + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                this.setState({
                    statusList: response.data.data
                })
                axios.get(services.baseUrl + services.getUsersList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                    let userList = {}
                    response.data.data.forEach(elem => {
                        if (elem.role !== '5eba3be3c4cf091fbc7d4307') {
                            userList[elem._id] = elem.firstname + ' ' + elem.lastname
                        }
                    })
                    this.setState({ userList })
                })
                axios.get(services.baseUrl + services.getContactUser + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                    this.setState({ contactList: response.data.data })
                })
            })
        })


    }
    handleChange = (event, i, col) => {
        if (col === 'dates') {
            let dates = [...this.state.dates];
            dates[i] = event.target.value;
            this.setState({ dates });
        } else if (col === 'status') {
            let status = [...this.state.status];
            status[i] = event.target.value;
            this.setState({ status });
        } else if (col === 'projectCont') {
            let projectCont = [...this.state.projectCont];
            projectCont[i] = event.target.value;
            this.setState({ projectCont });
        } else if (col === 'techCont') {
            let techCont = [...this.state.techCont];
            techCont[i] = event.target.value;
            this.setState({ techCont });
        }

    }
    validate = elem => {
        let validate = true
        if (!elem.projectContact) {
            alert('Please select projectContact')
            validate = false
        } else if (!elem.techContact) {
            alert('Please select techContact')
            validate = false
        } else if (!elem.status) {
            alert('Please select status')
            validate = false
        } else if (!elem.startDate) {
            alert('Please select startDate')
            validate = false
        }
        return validate
    }
    assignJob = (e, elem) => {
        if (this.validate(elem)) {
            var bodyFormData = new FormData();
            for (let x in elem) {
                if (elem[x]) {
                    bodyFormData.set(x, elem[x])
                }
            }
            axios({
                method: 'put',
                url: services.baseUrl + services.updateRequest + '?authToken=' + sessionStorage.getItem('authToken') + '&_id=' + elem._id,
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(response => {
                alert("Request assign successfully")
            })
        }
    }
    searchByName = e => {
        let currentValue = e.target.value.toLowerCase()
        let items = []
        this.state.reqestList.forEach((elem, index) => {
            if (elem.jobName && elem.jobName.toLowerCase().includes(currentValue)) {
                items.push('show')
            }
            else {
                items.push('hide')
            }
        })
        this.setState({
            classList: items
        })
    }
    render() {
        let status = []
        if (this.state.statusList) {
            this.state.statusList.forEach((elem, i) => {
                status.push(
                    <option value={elem._id}>{elem.name}</option>
                )
            })
        }
        let projectContct = []
        let techContact = []
        /* if (this.state.contactList) {
            this.state.contactList.forEach((elem, i) => {
                elem[0].userDetail.forEach(list => {
                    if (list.isProjectContact) {
                        projectContct.push(<option value={list._id}>{list.username}</option>)
                    }
                    if (list.isTechContact) {
                        techContact.push(<option value={list._id}>{list.username}</option>)
                    }
                })
            })
        } */
        if (this.state.userList) {
            projectContct.push(<option value='-1'></option>)
            techContact.push(<option value='-1'></option>)
            for (var key in this.state.userList) {
                projectContct.push(<option value={key}>{this.state.userList[key]}</option>)
                techContact.push(<option value={key}>{this.state.userList[key]}</option>)
            }
        }
        let items = []
        let list = this.state.reqestList

        if (list) {
            list.forEach((elem, index) => {
                items.push(
                    <tr key={'req-' + index} className={this.state.classList[index]}>
                        <td>{elem.status !== '5eaa4eb7a111ad0cfce91ef2' ? <a onClick={e => { this.openDialog(e, elem._id) }} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>{elem.jobName}</a> : elem.jobName}</td>
                        <td>{elem.createdAt}</td>
                        <td><input type='date' onChange={e => { this.handleChange(e, index, 'dates'); elem.startDate = e.target.value }} value={this.state.dates[index]} /></td>
                        <td><select value={this.state.status[index]} onChange={e => { this.handleChange(e, index, 'status'); elem.status = e.target.value }}>
                            {status}
                        </select></td>
                        <td><select value={this.state.projectCont[index]} onChange={e => { this.handleChange(e, index, 'projectCont'); elem.projectContact = e.target.value }}>
                            {projectContct}
                        </select></td>
                        <td><select value={this.state.techCont[index]} onChange={e => { this.handleChange(e, index, 'techCont'); elem.techContact = e.target.value }}>
                            {techContact}
                        </select></td>
                        <td><a style={{ cursor: 'pointer', color: 'blue' }} onClick={e => { this.assignJob(e, elem) }}>Assign Job</a></td>
                    </tr>
                )
            })
        }
        return (
            <React.Fragment>
                <div class="content-section">
                    <div class="work-section job-section">
                        <div class="container">
                            <div class="work-section-inner">
                                <h2>Services </h2>
                            </div>
                        </div>
                    </div>
                    <div class="jobs-table">
                        <div class="container">

                            <h1>New Request Queue</h1>
                            <input type='text' class='form-control' placeholder='Search By Job Name' style={{ width: '200px', marginBottom: '20px' }} onChange={this.searchByName} />
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Title </th>
                                            <th>Date Submitted</th>
                                            <th>Start Date</th>
                                            <th>Status </th>
                                            <th>Project Contact</th>
                                            <th>Tech Contact</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                    <span class="back-class"> <Link to="/admin"> Back to Home</Link></span>
                </div>
                <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} reqId={this.state.reqId} />
            </React.Fragment >
        )
    }
}