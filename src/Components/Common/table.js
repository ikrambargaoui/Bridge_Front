import React, { Component } from 'react'
import TableFilter from 'react-table-filter';
import './pagination.scss'
import EventRow from './EventRow'
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import Search from './SearchBar';
import { PDFDocument } from 'pdf-lib';
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
import SearchDate from './SearchBarDate';
import { findDocByKeyWords } from '../../Services/docsServices';
import { DownloadAPdf, DownloadAPdfArrayBuffer,DownloadACsv } from '../../Services/docsServices';
import Checkbox from '@material-ui/core/Checkbox';


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
            lastDate: '',
            firstDate: '',
            numberDocs: '',
            spinnerLoadingBtn: false,
            selectedDocs: []
        }




    }


    componentWillReceiveProps(next) {


        this.setState({
            data: next.data,
            currentData: next.data,
            selectedDocs: []
        })
        try {
            if (this.props.ComponentName == "AdvancedSearch") {
                this.changeFields(next.data)
            }
        } catch (ex) {

        }

    }


    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems })
    }







    searchDate = (param) => {

        this.setState({
            spinnerLoadingBtn: true
        })

        let request = {
            codeAgency: '',
            accountNumber: '',
            chapitreComptable: '',
            //accountKey: this.state.accountKey,
            accountDev: '',
            typeDocument: '',
            dateComptable: '',
            dateComptableStart: param.accountingDateDu,
            dateComptableEnd: param.accountingDateAu,
            clientCode: '',
        }
        console.log('request', request)
        findDocByKeyWords(request)
            .then((response) => {
                console.log('response from api : ', response)
                this.setState({
                    currentData: (response.length > 0) ? response : [{}],
                    data: response,
                    spinnerLoadingBtn: false,


                });
                this.changeFields((response.length > 0) ? response : [{}])
            })
            .catch((error) => {
                alert(error)
                this.setState({
                    spinnerLoadingBtn: false
                });
            })

    }

    download = (id, name) => {
        console.log('download  ', id, name)
        DownloadAPdf(id)
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name);
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => console.log(err))
    }




    downloadMultiple = (id, name) => {
        return DownloadAPdf(id, { responseType: 'arraybuffer' });

    }

    downloadForMerge = (id) => {
        return DownloadAPdfArrayBuffer(id);  // la nouvelle fonction
    };
    /*
        downloadAllSelected = () => {
            this.state.selectedDocs.forEach(doc => {
                const fileName = doc.fileNameOut || `document_${doc.key}.pdf`;
                this.download(doc.key, fileName);
            });
        };
    */


downloadAllSelectedCsv = async () => {
    const { selectedDocs } = this.state;

    let finalCsv = '';
    let isFirstFile = true;

    for (const doc of selectedDocs) {
        try {
            const response = await DownloadACsv(doc.key);
            const csvText = await response.data.text(); 
            const lines = csvText
                .replace(/\r\n/g, '\n') 
                .split('\n')
                .filter(line => line.trim() !== '');

            if (lines.length === 0) continue;

            if (isFirstFile) {
               
                finalCsv += lines.join('\n');
                isFirstFile = false;
            } else {
                // On supprime le header
                finalCsv += '\n' + lines.slice(1).join('\n');
            }

        } catch (err) {
            console.error('Erreur CSV pour le doc', doc.key, err);
        }
    }

    if (!finalCsv) return;

    finalCsv = '\uFEFF' + finalCsv;

    const blob = new Blob([finalCsv], {
        type: 'text/csv;charset=utf-8;'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'Multiple_Docs_CSV.csv';
    link.click();

    URL.revokeObjectURL(url);
};




    downloadAllSelected = async () => {
        const { selectedDocs } = this.state;
        const mergedPdf = await PDFDocument.create();

        for (const doc of selectedDocs) {

            // Récupère un ArrayBuffer propre
            const response = await this.downloadForMerge(doc.key);
            const pdfBytes = response.data;

            // Charge le PDF
            const pdf = await PDFDocument.load(pdfBytes);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

            pages.forEach(page => mergedPdf.addPage(page));
        }

        // Final PDF
        const mergedBytes = await mergedPdf.save();

        // Téléchargement
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = "Multipe_Docs_Pdf.pdf";
        link.click();
    };

    handleToggleDoc = (doc) => {
        this.setState((prevState) => {
            const alreadySelected = prevState.selectedDocs.find(d => d.key === doc.key);
            const updated = alreadySelected
                ? prevState.selectedDocs.filter(d => d.key !== doc.key)
                : [...prevState.selectedDocs, { key: doc.key, fileNameOut: doc.fileNameOut }];

            console.log("Docs sélectionnés :", updated);
            return { selectedDocs: updated };
        });
    };

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
                    el.typeDocument.toString().toLowerCase().includes(search))
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
                    || el.accountingDate &&
                    el.accountingDate.toString().includes(search)
                    || el.editionTime &&
                    el.editionTime.toString().toLowerCase().includes(search)
                    || el.contentieux &&
                    el.contentieux.toString().toLowerCase().includes(search)
                    || el.transfertCtx &&
                    el.transfertCtx.toString().toLowerCase().includes(search)
                    || el.folderNumber &&
                    el.folderNumber.toString().toLowerCase().includes(search)
                    || el.migrefBiat &&
                    el.migrefBiat.toString().toLowerCase().includes(search)
                )

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

            else if (this.props.ComponentName == 'ListUser') {
                data = this.state.data.filter(el => (
                    el.appUserFirstName && el.appUserFirstName.toString().toLowerCase().includes(search)
                    || el.appUserLastName && el.appUserLastName.toString().toLowerCase().includes(search)
                    || el.appUserCode && el.appUserCode.toString().toLowerCase().includes(search)
                    || el.appUserEmail && el.appUserEmail.toString().toLowerCase().includes(search)
                    || el.appUserState && el.appUserState.toString().toLowerCase().includes(search)
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
        this.changeFields((data.length > 0) ? data : [{}])
    }

    changeFields = (newData) => {
        this.tableFilterNode.reset(newData, true)
    }


    /*Filter "Filter Table "*/
    _filterUpdated = (newData, filterConfiguration) => {
        this.setState({
            currentData: newData
        });
    }



    render() {


        if (this.state.data.msg != null && this.props.ComponentName !== "SimpleSearch") {
            return <Alert color="danger">
                {this.state.data.msg}</Alert>
        }


        else if (!this.state.data.length > 0 && this.props.ComponentName !== "SimpleSearch") return <div>Chargement...</div>

        else {
            const items = []

            if (this.props.ComponentName == "AdvancedSearch") {
                items.push(
                    <th key="selectAll">
                        <Checkbox
                            checked={
                                this.state.pageOfItems.length > 0 &&
                                this.state.selectedDocs.length === this.state.pageOfItems.length
                            }
                            onChange={() => {
                                const allSelected =
                                    this.state.selectedDocs.length === this.state.pageOfItems.length;

                                if (allSelected) {
                                    this.setState({ selectedDocs: [] });
                                } else {
                                    this.setState({
                                        selectedDocs: this.state.pageOfItems.map(doc => ({
                                            key: doc.key,
                                            fileNameOut: doc.fileNameOut
                                        }))
                                    });
                                }
                            }}
                        />
                    </th>
                );
            }
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

            else if (this.props.ComponentName == "ListUser") {
                items.push(<th> Actions</th>)
            }

            else if (this.props.ComponentName == "ActionLog") {
                items.push(<th> Détails</th>)
            }


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
                        index={index}
                        selectedDocs={this.state.selectedDocs}
                        onToggleDoc={this.handleToggleDoc}
                        onBeforeNavigate={this.props.onBeforeNavigate}
                        history={this.props.history}
                        onNavigateToDocument={this.props.onNavigateToDocument}
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

                                        <div> {this.props.DisplayComponentName} </div>{/* 
                                        {this.state.ComponentName === "SimpleSearch" ? <div>Date comptable du {this.props.first} au {this.props.last}</div> : null}
                                        {this.state.ComponentName === "SimpleSearch" ? <div>Nombre de documents {this.props.last} : {this.state.data.filter(el => el.accountingDate === this.props.last ).length} </div> : null}
 */}
                                        <div>Nombre total: {this.state.currentData.length} Ligne(s)</div>
                                    </strong>


                                </CardHeader>
                                <CardBody>
                                    {(this.props.ComponentName === "GestionRight")
                                        ||
                                        (this.props.ComponentName === "AllProfils")
                                        ||
                                        (this.props.ComponentName === "GestionColonnes")
                                        ||
                                        (this.props.ComponentName === "GestionProfil")
                                        ? null :
                                        <Search search={this.search} ></Search>
                                    }
                                    {(this.props.ComponentName === "SimpleSearch")
                                        ?
                                        <SearchDate clickToProps={this.searchDate} spinnerLoadingBtn={this.state.spinnerLoadingBtn} ></SearchDate> : null
                                    }

                                    {this.state.selectedDocs.length > 0 && (
                                        <div style={{ marginBottom: '10px' }}>
                                            <button
                                                className="btn btn-primary"
                                                onClick={this.downloadAllSelected}
                                            >
                                                PDF ({this.state.selectedDocs.length})
                                            </button>
                                              <button
                                                className="btn btn-success" style={{ marginLeft: '2px' }}
                                                onClick={this.downloadAllSelectedCsv}
                                            >
                                                CSV ({this.state.selectedDocs.length})
                                            </button>
                                        </div>
                                    )}


                                    {


                                        <Table hover bordered striped responsive size="sm">
                                            <thead>
                                                <TableFilter
                                                    rows={this.state.data}
                                                    onFilterUpdate={this._filterUpdated}
                                                    initialFilters={this.state.filterConfiguration}
                                                    ref={node => { this.tableFilterNode = node }}>
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




