import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: ""
    }
  }
  
  componentDidMount() {
    this.setState({ year: new Date().getFullYear() })
  }
  
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="http://www.imex.com.tn/">IMEX</a> &copy; Bridge des banques {this.state.year}</span>
        {/* <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span> */}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
