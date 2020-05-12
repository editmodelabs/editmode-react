import React from "react";
import axios from "axios";
import DOMpurify from "dompurify";

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
        let sanitized_content = DOMpurify.sanitize(res.data.content);
        this.setState({
          chunk_data: { ...res.data, content: sanitized_content }
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
        <span data-chunk={this.state.chunk_data.identifier}>
          {this.state.chunk_data.content || this.props.children}
        </span>
      </>
    );
  }
}