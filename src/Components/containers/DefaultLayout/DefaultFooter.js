import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findLastVersion } from '../../../Services/VersionsServices';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: "",
      version: ""
    }
  }


  async componentDidMount() {
    this.setState({ year: new Date().getFullYear() });

    try {
      const response = await findLastVersion();
      this.setState({
        version: response,
      });
    } catch (error) {
      console.error(error);
    }
  }





  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="http://www.imex.com.tn/">IMEX</a> &copy; Bridge des banques {this.state.year}</span>
        <span style={{ marginLeft: "5px", fontSize: "13px"}}>
          version: 7.0.2.{this.state.version}
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
