import React, { Component } from 'react'

import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Spinner

} from 'reactstrap';

export default class SearchDate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accountingDateDu: '',
            accountingDateAu: ''



        }

        this.onChange = this.onChange.bind(this);


    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    clickToProps = (param) => {
        this.props.clickToProps(param)
    }
    render() {
        return (
            <Form action="" className="form-horizontal" >

                <FormGroup row>

                    <Col md="8">
                        <fieldset style={{ border: "1px solid #E4E5E6", padding: "0.5% 0.5% 0.5% 1%" }}>
                            <legend style={{ color: "black", fontSize: "14px", marginLeft: "2%", paddingLeft: "3%", width: "10%", fontWeight: "bold" }}>Date</legend>

                            <InputGroup style={{ marginBottom: "1%" }}>

                                <Label htmlFor="name" style={{ marginTop: "0.5%", marginRight: '0.5%' }}> Du : </Label>
                                <Input type="date" name="accountingDateDu" id="accountingDateDu" onChange={this.onChange} style={{ marginRight: "1%" }} />
                                <Label htmlFor="name" style={{ marginTop: "0.5%", marginRight: '0.5%' }}>Au : </Label>
                                <Input type="date" name="accountingDateAu" id="accountingDateAu" onChange={this.onChange} style={{ marginRight: "1%" }} />
                                <InputGroupAddon addonType="prepend" style={{ marginRight: "1%" }}>
                                    <Button type="button" color="primary" onClick={() => this.clickToProps(this.state)} disabled={this.props.spinnerLoadingBtn}>{this.props.spinnerLoadingBtn ? <Spinner size="sm" /> : <i className="fa fa-search"></i>} Recherche</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </fieldset>
                    </Col>
                </FormGroup>

            </Form>

        )
    }
}


