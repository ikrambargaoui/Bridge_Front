import React, { Component } from 'react';

class IdleTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIdle: false,
    };
    this.timeoutId = null;
    this.resetTimer = this.resetTimer.bind(this);
    this.handleIdle = this.handleIdle.bind(this);
  }

  componentDidMount() {
   
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => {
      window.addEventListener(event, this.resetTimer);
    });

   
    this.resetTimer();
  }

  componentWillUnmount() {
   
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach((event) => {
      window.removeEventListener(event, this.resetTimer);
    });

  
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

 
  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

   
    this.timeoutId = setTimeout(this.handleIdle, 600000); 
    this.setState({ isIdle: false });
  }

  
  handleIdle() {
    this.setState({ isIdle: true });
    this.props.onIdle(); 
  }

  render() {
    if (this.state.isIdle) {
      return <div>Vous avez été déconnecté en raison d'une inactivité prolongée.</div>;
    }

    return this.props.children;
  }
}

export default IdleTimer;
