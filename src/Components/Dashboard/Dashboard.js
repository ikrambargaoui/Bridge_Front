import React, { Component } from 'react';
import { connect } from 'react-redux'

import { getMoreInformationAboutUser } from '../../Services/userService'
import axios from 'axios';

import { Line, Pie } from 'react-chartjs-2';
import { Card, CardBody, CardColumns, CardHeader } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
const URL = require('../../Config/Config').Url;



const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      line: {},
      bar: {},
      polar: {},
      pie: {},
      dataAgence: {}

    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomColors(max) {
    var colors = [];
    for (var i = 0; i < max; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }


  componentWillMount() {
    getMoreInformationAboutUser()
      .then(dataRes => {
        this.setState({ dataAgence: dataRes })
         const token = localStorage.getItem('jwtToken');
        var headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }



        // Per Type
        axios.get(URL + '/Bridge/dashboard/pertype/', { headers: headers })
          .then((response) => {
            this.setState({

              line: {
                labels: response.data.map(a => a.key),
                datasets: [
                  {
                    label: 'Stat des Docs par Type',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: response.data.map(a => a.value)
                  },
                ],
              }

            });
          })
          .catch((error) => {
            alert(error)
          })

        // Per Type and Age
        axios.get(URL + '/Bridge/dashboard/pertype/age/' + dataRes.codeStructure, { headers: headers })
          .then((response) => {

            this.setState({

              bar: {
                labels: response.data.map(a => a.key),
                datasets: [
                  {
                    label: 'Le nombre d\'état généré par type - AGE ' + dataRes.codeStructure,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: response.data.map(a => a.value)
                  },
                ],
              }

            });

          })
          .catch((error) => {
            alert(error)
          })


        // Per Type and Date
        axios.get(URL + '/Bridge/dashboard/pertype/age/'+ dataRes.codeStructure, { headers: headers })
          .then((response) => {

            this.setState({

              polar: {
                datasets: [
                  {
                    data: response.data.map(a => a.value),
                    backgroundColor: this.getRandomColors(response.data.length),
                    label: 'Légende ' 
                  }],
                labels: response.data.map(a => a.key),
              }

            });

          })
          .catch((error) => {
            alert(error)
          })


        // Per Type and Age
        axios.get(URL + '/Bridge/dashboard/pertype/' , { headers: headers })
          .then((response) => {

            this.setState({

              pie: {
                labels: response.data.map(a => a.key),
                datasets: [
                  {
                    data: response.data.map(a => a.value),
                    backgroundColor: this.getRandomColors(response.data.length),
                    hoverBackgroundColor: this.getRandomColors(response.data.length)
                  }],
              }


            });

          })
          .catch((error) => {
            alert(error)
          })


      })
      .catch(err => console.error)




  }

  componentWillReceiveProps(next) {
    this.setState({ documents: next.docs })
    console.log('user docs: ', next.docs)
  }

  render() {
    return (
      <div className="animated fadeIn">


        <div className="animated fadeIn">
          <CardColumns className="cols-2">

            <Card>
              <CardHeader>
                Stat des documents par type (toutes les agences)
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Line data={this.state.line} options={options} />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Stat des documents par type  (AGE : {this.state.dataAgence.codeStructure})
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Line data={this.state.bar} options={options} />
                </div>
              </CardBody>
            </Card>

          </CardColumns>
          <CardColumns className="cols-2">
            <Card>
              <CardHeader>
                Stat des documents par type (toutes les agences)
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Pie data={this.state.pie} />
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                Stat des documents par type  (AGE : {this.state.dataAgence.codeStructure})
                <div className="card-header-actions">
                  <a href="http://www.chartjs.org" className="card-header-action">
                    <small className="text-muted">docs</small>
                  </a>
                </div>
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Pie data={this.state.polar} />
                </div>
              </CardBody>
            </Card>

          </CardColumns>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  docs: state.Docs.DocumentsOfUser
})

export default connect(mapStateToProps, {  })(Dashboard);
