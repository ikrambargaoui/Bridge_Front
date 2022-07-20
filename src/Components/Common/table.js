import React, { Component } from 'react'
import TableFilter from 'react-table-filter';
import './pagination.scss'
import EventRow from './EventRow'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import Search from './SearchBar';
import Pagination from './pagination'
import { connect } from 'react-redux'
import {
    Alert,
    Col,
    Card,
    CardBody,
    Row,
    CardHeader,
    Table,
} from 'reactstrap';


class SearchTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            currentData: props.data,
            pageOfItems: [],
            filterText: '',
            details: props.details,
            ComponentName: props.ComponentName,

        }




    }
    componentWillReceiveProps(next) {
        this.setState({
            data: next.data,
            currentData: next.data,
        })
    }


    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems })
    }


    /*
Search sur toute les colonnes
*/
    search = (e) => {
        let search = e.target.value.toLowerCase()
        let data = []
        if (search == "") {
            data = this.state.data
        }
        else {
            if (this.props.ComponentName == "SimpleSearch" || (this.props.ComponentName == "AdvancedSearch")) {
                data = this.state.data.filter(el => (
                    el.typeDocument &&
                    el.typeDocument.toString
                    ().toLowerCase().includes(search))
                    || el.accountNumber &&
                    el.accountNumber.toString().toLowerCase().includes(search)
                    || el.clientAgency &&
                    el.clientAgency.toString().toLowerCase().includes(search)
                    || el.accountKey &&
                    el.accountKey.toString().toLowerCase().includes(search)
                    || el.accountDev &&
                    el.accountDev.toString().toLowerCase().includes(search)
                    || el.accountBranch &&
                    el.accountBranch.toString().toLowerCase().includes(search)
                    || el.clientCode &&
                    el.clientCode.toString().toLowerCase().includes(search)
                    || el.code &&
                    el.code.toString().toLowerCase().includes(search)
                    || el.libelleStructure &&
                    el.libelleStructure.toString().toLowerCase().includes(search)
                    || el.accountingsSection &&
                    el.accountingsSection.toString().toLowerCase().includes(search)
                    || el.editionTime &&
                    el.editionTime.toString().toLowerCase().includes(search))
                // || el.action.actionLib &&
                // el.action.actionLib.toString().toLowerCase().includes(search)
                // || el.structure.libelleStructure &&
                // el.structure.libelleStructure.toString().toLowerCase().includes(search)
                // || el.user.appUserCode &&
                // el.user.appUserCode.toString().toLowerCase().includes(search)
                // || el.docType &&
                // el.docType.toString().toLowerCase().includes(search)
                // || el.ip &&
                // el.ip.toString().toLowerCase().includes(search)
                // || el.date &&
                // el.date.toString().toLowerCase().includes(search))
            }

            else if (this.props.ComponentName == "ActionLog") {
                data = this.state.data.filter(el => (
                    el.user != null && el.user.appUserCode != null && el.user.appUserCode.toString().toLowerCase().includes(search)
                    || el.action != null && el.action.actionLib != null && el.action.actionLib.toString().toLowerCase().includes(search)
                    || el.structure != null && el.structure.libelleStructure != null && el.structure.libelleStructure.toString().toLowerCase().includes(search)
                )
                )
            }

            else if (this.props.ComponentName == "GestionHabilitation") {
                data = this.state.data.filter(el => (
                    el.code && el.code.toString().toLowerCase().includes(search)

                )
                )
            }

            else if (this.props.ComponentName == "GestionStructure") {
                data = this.state.data.filter(el => (
                    el.libelleStructure && el.libelleStructure.toString().toLowerCase().includes(search)

                )
                )
            }

            else if (this.props.ComponentName == "GestionProfil") {

                data = this.state.data.filter(el => (
                    el.profileName && el.profileName.toString().toLowerCase().includes(search)
                    || el.profileDescription && el.profileDescription.toString().toLowerCase().includes(search)
                )
                )
            }

            else if (this.props.ComponentName == 'Profil') {
                data = this.state.data.filter(el => (
                       el.appUserFirstName && el.appUserFirstName.toString().toLowerCase().includes(search)
                    || el.appUserLastName && el.appUserLastName.toString().toLowerCase().includes(search)
                )
                )
            }

            else if (this.props.ComponentName == 'GestionDelegation') {
                data = this.state.data.filter(el => (
                       el.dateDebDelegation && el.dateDebDelegation.toString().toLowerCase().includes(search)
                    || el.dateFinDelegation && el.dateFinDelegation.toString().toLowerCase().includes(search)
                    || el.delegueNom && el.delegueNom.toString().toLowerCase().includes(search)
                )
                )
            }


            
            else data = this.state.data
        }
        this.setState({
            currentData: (data.length > 0) ? data : [{}]
        })
    }


    /*Filter "Filter Table "*/
    _filterUpdated = (newData, filterConfiguration) => {
        this.setState({
            currentData: newData
        });
    }



    render() {

        if (this.state.data.msg != null) {
            return <Alert color="danger">
                {this.state.data.msg}</Alert>
        }


        else if (!this.state.data.length > 0) return <div>Loading....</div>

        else {
            const items = []
            for (var i = 0; i < this.props.details.length; i++) {
                if (this.props.details[i].nomColonne === 'accountingDate') {
                    let key = (this.props.details[i].nomColonne);
                    items.push(<th filterkey={key}>{this.props.details[i].colonneDisplay}</th>)
                }

                else items.push(<th filterkey={this.props.details[i].nomColonne}>
                    {this.props.details[i].colonneDisplay}</th>)
            }


            if (this.props.ComponentName == "Profil") {
                items.push(<th> Profil</th>)
            }

            else if (this.props.ComponentName == "AllProfils") {  //AllProfils
                items.push(<th> Droits</th>)
            }
            else if (this.props.ComponentName == "SimpleSearch") {
                items.unshift(<th> N°</th>)
                items.push(<th> Actions</th>)
            }

            /*   else if (this.props.ComponentName == "GestionColonnes") {
            
              items.push(<th> Visibilité</th>)
          }  */
            else {
                if (this.props.ComponentName == "GestionColonnes") {


                }
                else
                    items.push(<th> Actions</th>)
            }

            let rows = []

            this.state.pageOfItems.map((a, index) =>
                rows.push(
                    <EventRow
                        rank={this.props.data.indexOf(a)}
                        modificate={(mod) => this.props.modification(mod)}
                        event={a}
                        details={this.props.details}
                        ComponentName={this.props.ComponentName}
                        matricule={this.props.matricule}
                        key={a.id}
                        idUser={this.props.idUser}
                    />
                )
            )




            return (

                <div className="animated fadeIn">
                    <Row>
                        <Col>
                            <Card>
                                <CardHeader>
                                    <i className={this.props.icon}></i>
                                    <strong style={{ display: 'flex', justifyContent: 'space-between' }}>

                                        <div> {this.props.DisplayComponentName} </div>
                                        <div>Total: {this.state.data.length} Ligne(s)</div>
                                    </strong>
                                </CardHeader>
                                <CardBody>
                                    { (this.props.ComponentName==="GestionRight")
                                    ||
                                    (this.props.ComponentName==="AllProfils")
                                    ||
                                    (this.props.ComponentName==="GestionColonnes")
                                    ||
                                    (this.props.ComponentName==="GestionProfil")
                                    ? null :
                                    <Search search={this.search} ></Search>
                                    }
                                    {
                                        <Table hover bordered striped responsive size="sm">
                                            <thead>
                                                <TableFilter
                                                    rows={this.state.data}
                                                    onFilterUpdate={this._filterUpdated}>
                                                    {items}
                                                </TableFilter>
                                            </thead>
                                            <tbody>
                                                {rows}
                                            </tbody>
                                        </Table>
                                    }
                                    {
                                        (this.state.currentData.length < 1) ? null :
                                            (this.state.currentData.length === this.state.data.length) ?
                                                <Pagination items={this.state.data} onChangePage={this.onChangePage} /> :
                                                <Pagination items={this.state.currentData} onChangePage={this.onChangePage} />
                                    }

                                </CardBody></Card></Col></Row>

                </div>
            )

        }
    }
    static defaultProps = {

        details: []
    }
}

const mapStateToProps = state => ({
    roles: state.userInfo.user.roles
})


export default connect(mapStateToProps)(SearchTable)




