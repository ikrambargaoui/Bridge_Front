const URL = require('../../Config/Config').Url;


export default class apiService extends React.Component {
    
    constructor(){
        super();
       
        this.state = {
         matricule: '',
         visibile: true,
         nom:'',
         structures:[],
         totalstructures:[]
        };
        this.deleteRow = this.deleteRow.bind(this);
        this.postMethod = this.postMethod.bind(this);

        this.getClientCredential = this.getClientCredential.bind(this);
        this.onChange = this.onChange.bind(this);
        
      }
      postMethod(param){
        var  headers={
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiaDAwMzQ0NSIsImlhdCI6MTU0OTM3MTE5NSwiY29kZSI6ImJoMDAzNDQ1Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9CVVNTSU5FU1NfVU5JVF9NQU5BR0VSIn1dfQ.TsaMOct4GApSlg7bEfTFQCGQG273P8g55Lfk2LJa1CI",
            'Access-Control-Allow-Origin':'*'
        }
      axios.post( URL + 'Rest/Api/Structure/addStructureUser', {
        idUser: this.state.matricule,
        idStructure: param
      },{headers: headers})
      .then(function (response) {
        console.log(response);
   
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}