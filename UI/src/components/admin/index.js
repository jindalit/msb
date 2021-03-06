import React from 'react'
import { Link } from 'react-router-dom';
import Dialog from '../home/dialog'

export default class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false
        }
    }
    closeDialog = () => {
        // console.log('asd')
        this.setState({
            dialogState: false
        })
    }
    openDialog = (e) => {
        this.setState({
            dialogState: true
        })
    }
    render() {
        return (
            <React.Fragment>
                <div class="content-section requst-section">
                    <div class="work-section">
                        <div class="container">
                            <div class="work-section-inner">
                                <h2>Requests  </h2>
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="work-col">
                                            <h3>Requests  </h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus eros quis placerat volutpat. Duis euismod id felis vitae imperdiet. NuIlam non odio ac neque pulvi-nar tincidunt. Quisque feugiat, felis in pretium ultricies  </p>

                                            <Link to='/admin/reqList' class="create-button btn-demo">REQUEST QUEUE  </Link>

                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="work-col">
                                            <h3>My Assigned Tasks </h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus eros quis placerat volutpat. Duis euismod id felis vitae imperdiet. NuIlam non odio ac neque pulvi-nar tincidunt. Quisque feugiat, felis in pretium ultricies  </p>
                                            <Link to='/myjobs' class="create-button btn-demo">ASSIGNED TASKS QUEUE </Link>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-sm-12">
                                        <div class="work-col">
                                            <h3>A new Request </h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus eros quis placerat volutpat. Duis euismod id felis vitae imperdiet. NuIlam non odio ac neque pulvi-nar tincidunt. Quisque feugiat, felis in pretium ultricies  </p>
                                            <a onClick={this.openDialog} class="create-button btn-demo"> NEW REQUEST   </a>
                                        </div>
                                    </div>


                                </div>



                            </div>
                        </div>
                    </div>

                    <div class="overview-section requst-1">
                        <div class="container">
                            <div class="overview-section-inner">
                                <h1> Safety </h1>
                                <Link to="/admin/safety" class="safety-bottom">SAFETY HOME  </Link>
                                <Link to="/admin/newincident" class="safety-bottom">FILE SAFETY INCIDENT</Link>
                            </div>
                        </div>
                    </div>


                    <div class="project-section requst-1">
                        <div class="container">
                            <div class="project-section-inner">
                                <h1>Tours </h1>
                                <Link to="/tour" class="safety-bottom">VIEW SCHEDULE TOURS  </Link>



                            </div>
                        </div>
                    </div>
                    <div class="overview-section requst-1">
                        <div class="container">
                            <div class="overview-section-inner">
                                <h1>Learning </h1>
                                <Link to="/admin/learning" class="safety-bottom">VIEW LEARNING TRACKING  </Link>
                                <Link to="/safety" class="safety-bottom">VIEW TRAINING  </Link>


                            </div>
                        </div>
                    </div> </div>

                <Dialog enable={this.state.dialogState} closeDialog={this.closeDialog} />

            </React.Fragment>
        )
    }
}