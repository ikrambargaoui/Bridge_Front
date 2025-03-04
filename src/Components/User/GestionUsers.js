import React, { Component } from 'react';
import AddUser from './AddUser';
import ListUser from './ListUser';
export default class GestionUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            componentAdd: false,
            componentList: true
        };


    }



    setComponentAddOn = () => {
        this.setState({
            componentAdd: true,
            componentList: false
        })
    }

    setComponentAddOff = () => {
        this.setState({
            componentAdd: false,
            componentList: true
        })
    }

   




    render() {

        return (

            this.state.componentAdd ? <AddUser setComponentAddOff={this.setComponentAddOff}/> : <ListUser  setComponentAddOn={this.setComponentAddOn}  />



        )


    }




}