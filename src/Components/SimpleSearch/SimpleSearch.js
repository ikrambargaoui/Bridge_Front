import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Common/pagination.scss'
import { getUser } from '../../Store/Actions/userActions'

import { getColumns } from '../../Store/Actions/columnConfig'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import SearchTable from '../Common/table'
import {
    Col,
    Card,
    CardBody,

} from 'reactstrap';

class SimpleSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            ready: false,
            details: null,
            cols: null,
            last: '',
            first: ''
        }
    }


    componentDidMount() {
       

        this.props.getColumns();
    }

    componentWillReceiveProps(next) {
        this.setState({ data: next.document, details: next.cols })
        if (this.state.data.length > 0) {
           /*  const first = this.state.data.reduce((prev, current) => new Date(prev.accountingDate).toLocaleDateString() > new Date(current.accountingDate).toLocaleDateString() ? prev.accountingDate : current.accountingDate)
            const last = this.state.data.reduce((prev, current) => new Date(prev.accountingDate).toLocaleDateString() < new Date(current.accountingDate).toLocaleDateString() ? prev.accountingDate : current.accountingDate) */

            this.setState({
                ready: true,

            })

        }
        else if (this.state.document !== next.document) {
          /*   const first = next.document.reduce((prev, current) => new Date(prev.accountingDate).toLocaleDateString() > new Date(current.accountingDate).toLocaleDateString() ? prev.accountingDate : current.accountingDate)
            const last = next.document.reduce((prev, current) => new Date(prev.accountingDate).toLocaleDateString() < new Date(current.accountingDate).toLocaleDateString() ? prev.accountingDate : current.accountingDate)

 */

            this.setState({
                data: next.document

            })
        }
    }
    render() {

        
            const name = "SimpleSearch";
            const displayName = "Consulter vos documents...";
            const icon = "fa fa-folder-open";
            
            return (
                this.state.data.length>0?
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <SearchTable
                                details={this.props.cols.cols}
                                data={this.state.data}
                                ComponentName={name}
                                DisplayComponentName={displayName}
                                icon={icon}
                            />
                        </CardBody>
                    </Card>
                </Col>:"Chargement ..."
            );
        }
    }


const mapStateToProps = state => ({
    document: state.Docs.DocumentsOfUser,
    cols: state.cols
})


export default connect(mapStateToProps, { getUser, getColumns })(SimpleSearch)