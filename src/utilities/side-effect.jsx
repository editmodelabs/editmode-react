// @ts-nocheck
import React, { Component } from "react";

const isServer = typeof window === "undefined";

export default class extends Component {
  // emitChange = () => {
  //   if (this._hasHeadManager) {
  //     this.props.headManager.updateHead(
  //       this.props.reduceComponentsToState(
  //         [...this.props.headManager.mountedInstances],
  //         this.props
  //       )
  //     );
  //   }
  // };

  constructor(props) {
    super(props);
    this._hasHeadManager =
      this.props.headManager && this.props.headManager.mountedInstances;

    if (isServer && this._hasHeadManager) {
      this.props.headManager.mountedInstances.add(this);
      // this.emitChange();
    }
  }
  componentDidMount() {
    if (this._hasHeadManager) {
      this.props.headManager.mountedInstances.add(this);
    }
    // this.emitChange();
  }
  componentDidUpdate() {
    // this.emitChange();
  }
  componentWillUnmount() {
    if (this._hasHeadManager) {
      this.props.headManager.mountedInstances.delete(this);
    }
    // this.emitChange();
  }

  render() {
    return null;
  }
}
