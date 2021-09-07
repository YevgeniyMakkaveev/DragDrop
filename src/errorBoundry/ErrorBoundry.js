import React, { Component } from "react";

export default class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <p>Произошла ошибка, обновите приложение.</p>;
    }
    return this.props.children;
  }
}
