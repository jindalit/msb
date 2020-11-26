import React from 'react'
import PropTypes from 'prop-types'

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div class="container">
                    <div class="footer-inner">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <img src="images/logo_msrhwlabs_grey.png" />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <ul class="footer-nav">
                                    <li><a href="index.html"> SERVICES HOME </a></li>
                                    <li> <a href="safety.html">Safety</a>
                                    </li>
                                    <li><a href="about.html"> ABOUT US</a></li>
                                    <li><a href="tour.html"> TOURS  </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}