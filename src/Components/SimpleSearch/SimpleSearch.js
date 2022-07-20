import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../Common/pagination.scss'
import { getUser } from '../../Store/Actions/userActions'
import { getDocsOfUser } from '../../Store/Actions/GetDocs'
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
            cols: null
        }
    }


    componentDidMount() {
        this.props.getDocsOfUser()
        
      this.props.getColumns();
    }

    componentWillReceiveProps(next) {
        this.setState({ data: next.document, details: next.cols })
        if (this.state.data.length > 0) {
            this.setState({
                ready: true
            })
        }
        else if (this.state.document !== next.document) { this.setState({ data: next.document }) }
    }
    render() {
        const name = "SimpleSearch";
        const displayName = "Consulter vos documents...";
        const icon = "fa fa-folder-open";

        return (
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
            </Col>
        );
    }
}


const mapStateToProps = state => ({
    document: state.Docs.DocumentsOfUser,
    cols: state.cols
})


export default connect(mapStateToProps, { getUser, getDocsOfUser, getColumns })(SimpleSearch)