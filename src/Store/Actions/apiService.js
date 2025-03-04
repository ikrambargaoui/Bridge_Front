const URL = require('../../Config/Config').Url;


export default class apiService extends React.Component {

  constructor() {
    super();

    this.state = {
      matricule: '',
      visibile: true,
      nom: '',
      structures: [],
      totalstructures: []
    };
    this.deleteRow = this.deleteRow.bind(this);
    this.postMethod = this.postMethod.bind(this);

    this.getClientCredential = this.getClientCredential.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  postMethod(param) {

    const token = localStorage.getItem('jwtToken');


    var headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token,
      'Access-Control-Allow-Origin': '*'
    }
    axios.post(URL + 'Bridge/Structure/addStructureUser', {
      idUser: this.state.matricule,
      idStructure: param
    }, { headers: headers })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
}