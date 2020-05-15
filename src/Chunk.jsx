import React from "react";
import axios from "axios";
import { renderChunk } from "../src/utils/renderChunk";

export default class Chunk extends React.Component {
  constructor(props) {
    super();
    this.identifier = props.identifier;
    this.state = {
      chunk_data: {}
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.editmode.app/api/v1/chunks/${this.identifier}`)
      .then(res => {
        this.setState({
          chunk_data: res.data
        });
      })
      .catch(err =>
        console.log(
          `Something went wrong trying to retrieve chunk data: ${err}.Have you provided the correct Editmode identifier as a prop to your Chunk component instance?`
        )
      );
  }

  render() {
    return (
      <>
        {this.state.chunk_data.identifier
          ? renderChunk(this.state.chunk_data)
          : this.props.children}
      </>
    );
  }
}