import React, { Component } from 'react';
import { Document, Page, pdfjs } from "react-pdf";

import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import { apiCall } from '../../Services/api';
import { ViewAPdf } from '../../Services/docsServices';
import printJS from 'print-js';

import {
  Nav,
  NavItem,
  Button,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class DocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      ready: false,
      inputPage: 1, // <-- nouveau état pour le champ de saisie
    };
  }

  componentDidMount() {
    ViewAPdf(this.props.match.params.value)
      .then(res => {
        const blob = new Blob([res], { type: 'application/pdf' });
        const blobURL = URL.createObjectURL(blob);
        localStorage.setItem("pdfFile", blobURL);
        this.setState({ ready: true });
      })
      .catch(err => console.log(err));
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    this.setState(prevState => ({
      pageNumber: Math.max(prevState.pageNumber - 1, 1),
      inputPage: Math.max(prevState.pageNumber - 1, 1)
    }));
  }

  goToNextPage = () => {
    this.setState(prevState => ({
      pageNumber: Math.min(prevState.pageNumber + 1, prevState.numPages),
      inputPage: Math.min(prevState.pageNumber + 1, prevState.numPages)
    }));
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    // Accepter uniquement les chiffres
    if (/^\d*$/.test(value)) {
      this.setState({ inputPage: value });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.goToInputPage();
    }
  }

  goToInputPage = () => {
    let page = parseInt(this.state.inputPage, 10);
    if (isNaN(page)) return;
    page = Math.max(1, Math.min(page, this.state.numPages));
    this.setState({ pageNumber: page, inputPage: page });
  }

  printDoc = () => {
    ViewAPdf(this.props.match.params.value)
      .then(res => {
        const blob = new Blob([res], { type: "application/pdf" });
        const blobURL = URL.createObjectURL(blob);
        printJS({ printable: blobURL, type: 'pdf', showModal: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { pageNumber, numPages, inputPage, ready } = this.state;
    const dpr = window.devicePixelRatio || 1;

    if (!ready) {
      return <div>Chargement...</div>;
    }

    const filePdf = localStorage.getItem('pdfFile');

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row>
          <Col md="12">
            <Card className="main-card mb-1">
              <CardBody>
                <Nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <NavItem>
                    <Button onClick={() => this.props.history.goBack()} color="secondary">
                      Retour
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button onClick={this.printDoc}>
                      <i className="fa fa-print"></i>
                    </Button>
                  </NavItem>
                  <NavItem>
                    <Button onClick={this.goToPrevPage}>Prev</Button>
                  </NavItem>
                  <NavItem>
                    <span>{pageNumber} / {numPages}</span>
                  </NavItem>
                  <NavItem>
                    <Button onClick={this.goToNextPage}>Next</Button>
                  </NavItem>
                  {/* Champ de saisie pour numéro de page */}
                  <NavItem style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      value={inputPage}
                      onChange={this.handleInputChange}
                      onKeyPress={this.handleKeyPress}
                      style={{ width: "50px", textAlign: "center", marginRight: "5px" }}
                    />
                    <Button onClick={this.goToInputPage}>Go</Button>
                  </NavItem>
                </Nav>

                <Document
                  file={filePdf}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={Math.min(window.innerWidth * 0.9, 900)}
                    scale={dpr}
                  />
                </Document>

                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
