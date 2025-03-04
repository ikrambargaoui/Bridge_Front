import React, { Component, Fragment } from 'react';
import Lottie from 'react-lottie';
import { Col, Row } from 'reactstrap';
import * as animationData from './119603-mobile-banking.json'
import logoImex from "./logo_imex.png"
import logo from './Logo-BIAT.png'
class Acceuil extends Component {





    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <Fragment style={{ backgroundColor: "white" }}>
                <Row style={{ marginTop: "15%" }} >
                    <Col md={3}></Col>
                    <Col md={4}><img src={logoImex} style={{ marginTop: "8%" }} width="300" height="80" alt="LOGO_IMEX" /></Col>
                    <Col md={3}><img src={logo} width="200" height="130" alt="LOGO_BIAT" /></Col>
                    <Col md={2}></Col>
                </Row>
                {/* <Row>
                    <Lottie options={defaultOptions}
                        height={400}
                        width={400} />
                </Row> */}

                <Row style={{ justifyContent: 'center', marginTop: "5%" }}>
                    <h4>BRIDGE des banques</h4>
                </Row>




            </Fragment>

        )

    }
}


export default Acceuil;