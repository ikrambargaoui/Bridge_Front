import React, { Component } from 'react';
import { Document, Page, pdfjs } from "react-pdf";

import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import { } from '../Tables/example.scss';
import { } from '../Tables/lib/styles.css';
import { apiCall } from '../../Services/api'

import { ViewAPdf} from '../../Services/docsServices'
import printJS  from 'print-js'

import {
  Nav,
  NavItem,
  Button,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class DocumentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      ready: false
    };
  }

  componentDidMount() {
    ViewAPdf(this.props.match.params.value)
      .then(res => {
        console.log(res)
        var blob = new Blob([res], { type: 'application/pdf' });
        var blobURL = URL.createObjectURL(blob)
        localStorage.setItem("pdfFile", blobURL)
        this.setState({ ready: true })
      })
      .catch(err => console.log(err))
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber <= 1) { this.setState(({ pageNumber: 1 })) }
    else this.setState(({ pageNumber: this.state.pageNumber - 1 }));
  }

  goToNextPage = () => {
    if (this.state.pageNumber >= this.state.numPages) { this.setState(({ pageNumber: this.state.numPages })) }
    else this.setState(({ pageNumber: this.state.pageNumber + 1 }));
  }

  printDoc = () => {
 
    ViewAPdf(this.props.match.params.value)
      .then(res => {
        console.log(res)
        var blob = new Blob([res], { type: "application/pdf" });
        var blobURL = URL.createObjectURL(blob)
        printJS({printable:blobURL, type:'pdf', showModal:false});
      })
      .catch(err => console.log(err))
  }
  render() {
    const { pageNumber, numPages } = this.state;

    if (!this.state.ready) {
      return <div>Loading...</div>
    }
    else {
      const filePdf = (localStorage.getItem('pdfFile'));
      console.log('in render: ', filePdf)
      return (

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row >
            <Col md="12">
              <Card className="main-card mb-1">
                <CardBody>
                  <Nav style={{ display: "flex", justifyContent: "space-around" }}>
                  <NavItem>
                      <Button onClick={this.printDoc} style={{}}>  <i className="fa fa-print"></i></Button>
                    </NavItem>
                    <NavItem>
                      <Button onClick={this.goToPrevPage} style={{}}>Prev</Button>
                    </NavItem>
                    {this.state.pageNumber}
                    <NavItem>
                      <Button onClick={this.goToNextPage}>Next</Button>
                    </NavItem>
                  </Nav>

                  <Document
                    file={filePdf}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} width={600} />
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
}
