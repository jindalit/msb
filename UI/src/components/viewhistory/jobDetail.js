import React from 'react'
import axios from 'axios'
import { services } from '../common/constant'
import { Link } from 'react-router-dom';



export default class JobDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: '',
            userList: [],
            reqList: {},
            formData: {
                categoryId: '',
                requestTypeId: '',
                isImmediate: '',
                quantity: '',
                jobName: '',
                contactPerson: '',
                shippingAddress: '',
                description: '',
                timeline: '',
                hardwareFilmware: '',
                userId: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))._id : ''
            }
        }
    }
    componentDidMount() {
        axios.get(services.baseUrl + services.getUsersList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
            let userList = {}
            response.data.data.forEach(elem => {
                userList[elem._id] = elem.firstname + ' ' + elem.lastname
            })
            this.setState({ userList: userList })
            axios.get(services.baseUrl + services.getStatus + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                let status = {}
                response.data.data.forEach(element => {
                    status[element._id] = element.name
                })
                this.setState({
                    status: status
                })
                axios.post(services.baseUrl + services.getById + '?authToken=' + sessionStorage.getItem('authToken'), { '_id': this.props.match.params.id }).then(response => {
                    var data = response.data.data;
                    var formData = { ...this.state.formData }
                    formData['createdAt'] = data.createdAt
                    formData['startDate'] = data.startDate
                    formData['endDate'] = data.endDate
                    formData['status'] = this.state.status[data.status]
                    formData['projectContact'] = userList[data.projectContact]
                    formData['techContact'] = userList[data.techContact]
                    formData['files'] = data.files
                    formData['history'] = data.history
                    formData['jobName'] = data.jobName
                    formData['quantity'] = data.quantity
                    formData['shippingAddress'] = data.shippingAddress
                    this.setState({ formData });
                    axios.get(services.baseUrl + services.reqList + '?authToken=' + sessionStorage.getItem('authToken')).then(response => {
                        let reqList = {}
                        response.data.data.forEach(elem => {
                            reqList[elem._id] = elem.name
                        })
                        this.setState({ reqList });
                    })
                })
            })
        })
    }
    toDataURL = (src, callback, outputFormat) => {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
        };
        img.src = src.replace("\\/g", "/");;
        
    }
    render() {
        const files = []
        if (this.state.formData.files) {
            for (let i = 0; i < this.state.formData.files.length; i++) {
                /* debugger
                this.toDataURL(
                    services.baseUrl + '/' + this.state.formData.files[i].path,
                    dataUrl => {
                        this.setState({ imgpath: dataUrl })
                    }
                ) */
                //this.setState(.replace("\\/g", "/");)
                files.push(
                    <tr>
                        <td>{this.state.formData.files[i].originalname}</td>
                        <td><a target='_blank' href={(services.baseUrl + '/' + this.state.formData.files[i].path).replace("\\/g", "/")} download={this.state.formData.files[i].filename}><i class="fa fa-download" aria-hidden="true"></i> </a></td>
                    </tr>
                )
            }
        }
        let history = []
        let hisData = this.state.formData.history
        if (hisData) {
            hisData.forEach(elem => {
                let allKeys = []
                let allValues = []
                for (const key in elem) {
                    let elemVal = elem[key]
                    if (key !== 'CategoryId' && key !== 'Modified At' && (elemVal !== '' && elemVal !== null)) {
                        elemVal = key === 'Status' ? this.state.status[elemVal] : key === 'Project Contact' || key === 'Tech Contact' || key === 'UserId' ? this.state.userList[elemVal] : key === 'RequestTypeId' ? this.state.reqList[elemVal] : elemVal
                        if (key === 'files') {
                            let fileName = []
                            elemVal.forEach(elem => {
                                fileName.push(elem.originalname)
                            })
                            elemVal = fileName.join()
                        }
                        allKeys.push(<p><b>{key}</b></p>)
                        allValues.push(<p>{elemVal}</p>)
                    }
                }
                history.push(
                    <tr>
                        <td>{elem['Modified At']}</td>
                        <td>{allKeys}</td>
                        <td>{allValues}</td>
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
                            <div class="jobs-table-inner">
                                <span class="back-class"> <Link to='/viewHistory'> Back </Link></span>
                                <h1>Job Details </h1>
                                <div class="table-responsive">
                                    <table class="table table-striped job-table ">
                                        <thead>
                                            <tr>
                                                <th>Job Title </th>
                                                <th>{this.state.formData.jobName}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Date Submitted </td>
                                                <td>{this.state.formData.createdAt}</td>

                                            </tr>
                                            <tr>
                                                <td>Quantity:</td>
                                                <td>{this.state.formData.quantity}</td>
                                            </tr>
                                            {this.state.formData.description ? <tr>
                                                <td>Description:</td>
                                                <td>{this.state.formData.description}</td>
                                            </tr> : ''}

                                            <tr>
                                                <td>Start Date </td>
                                                <td>{this.state.formData.startDate}</td>
                                            </tr>
                                            <tr>
                                                <td>Est Completion Date:</td>
                                                <td>{this.state.formData.endDate}</td>
                                            </tr>

                                            <tr>
                                                <td>Status:</td>
                                                <td>{this.state.formData.status}</td>
                                            </tr>
                                            <tr>
                                                <td>HW Lab Project Contact:</td>
                                                <td> {this.state.formData.projectContact}</td>

                                            </tr>

                                            <tr>
                                                <td>HW Lab Technical  Contact: </td>
                                                <td>{this.state.formData.techContact}</td>

                                            </tr>

                                            <tr>
                                                <td>Address to ship:</td>
                                                <td>{this.state.formData.shippingAddress}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <h4>Project Files </h4>
                                <div class="table-responsive">
                                    <table class="table table-striped ">
                                        <thead>
                                            <tr>
                                                <th>Job Title </th>
                                                <th>{this.state.formData.jobName}</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                files
                                            }


                                        </tbody>
                                    </table>
                                </div>




                                <h4>Job History </h4>
                                <div class="table-responsive">
                                    <table class="table table-striped table-2">
                                        <thead>
                                            <tr>
                                                <th>Rev Date </th>
                                                <th>Change Desc. </th>
                                                <th>Old Value </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history}


                                        </tbody>
                                    </table>
                                </div>


                            </div>
                        </div>
                    </div>






                </div>

            </React.Fragment >
        )
    }
}