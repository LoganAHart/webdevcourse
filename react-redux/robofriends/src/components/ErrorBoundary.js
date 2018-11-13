import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super();
    this.state = {
      hasError: false,
      errorInfo: '',
    }
  }
  
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    return this.state.hasError ?
      (<h1>Error Encountered With Component</h1>) :
      (this.props.children)
  }
}

export default ErrorBoundary;
