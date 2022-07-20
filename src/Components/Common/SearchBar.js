import React, { Component } from 'react'

import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon
  
} from 'reactstrap';

export default class Search extends Component {
    render() {
        return (
            <Form action="" method="post" className="form-horizontal">
            <FormGroup row>
                <Col md="12">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary"><i className="fa fa-search"></i> Rechercher</Button>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Rechercher...." onKeyUp={this.props.search} />

                </InputGroup>
                </Col>
            </FormGroup>
        </Form>

        )
    }
}


