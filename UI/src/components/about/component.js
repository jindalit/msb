import React from 'react'
import PropTypes from 'prop-types'
import Newsletter from '../common/newsletter'

export default class About extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div class="work-section job-section">
                    <div class="container">
                        <div class="work-section-inner">
                            <h2>About Us </h2>
                        </div>
                    </div>
                </div>
                <div class="about-section">
                    <div class="container">
                        <div class="about-section-inner">
                            <h2>Welcome to the Hardware Lab! </h2>
                            <div class="row">
                                <div class="col-md-7 col-sm-12">
                                    <p>Lorem ipsum dolor sit amet consectetur adipiscing,elit; Cras rhoncus eros quisplacerat volutpat. Duis
                                    euismod id fells vitae imperdiet. Nullam non odio ac neque pulvinar tincidunt. 0,uisque feat, felis in
                                    pretium ultriciest sapien nisi fringilla tellus ac malesuada felis nulla a dolor. Ut commodo nec augue
                  a posuere. Ut consequat tellus dignissim dui scelerisque fermentum. </p>
                                    <br />
                                    <address>
                                        <p><strong>Location: </strong> Microsoft Building 99 Room 4
                  </p>
                                        <p><strong>Hours: </strong> 7am-7pm, Monday-Friday </p>
                                        <p><strong> Contact:</strong><a href="mailto:Lorem@microsoft.com"> Lorem@microsoft.com </a> </p>
                                        <p><strong> Billing Information: </strong> Lorem ipsum dolor sit amet </p>
                                    </address>
                                </div>
                                <div class="col-md-5 col-sm-12">
                                    <div class="about-img">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="meet-section">
                    <div class="container">
                        <div class="meet-section-inner">
                            <h2>Meet the Hardware Lab Team </h2>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras rhoncus eros quis placerat volutpat. Duis
              euismod id fells vitae imperdiet. Nullam non odio ac neque pulvinar tincidunt. Quisque feugiat, fel </p>

                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>


                            </div>

                            <div class="row">
                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <div class="team-section">
                                        <div class="team-img">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                        </div>
                                        <span class="member-name"> John Romualdez</span>
                                        <span class="member-profile"> Lab Manager/EE
                  </span>

                                    </div>
                                </div>


                            </div>





                        </div>
                    </div>
                </div>
                <Newsletter />
            </React.Fragment >
        )
    }
}