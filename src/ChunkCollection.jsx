import React from "react";
import axios from "axios";
import ChunkProperty from "./ChunkProperty.jsx";

export default class Chunk extends React.Component {
  constructor(props) {
    super();
    this.identifier = props.identifier;
    this.state = {
      chunks: []
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.editmode.app/api/v1/chunks/`, {
        params: { collection_identifier: this.props.identifier }
      })
      .then(res => {
        this.setState({ chunks: res.data.chunks[0] });
      })
      .catch(err =>
        console.log(
          `Something went wrong trying to retrieve chunk collection: ${err}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
        )
      );
  }

  render() {
    return (
      <>
        {this.state.chunks.content &&
          this.state.chunks.content.map(cnk => {
            let chunk_properties = Object.values(cnk)[0];
            return (
              <ChunkProperty
                chunk_properties={chunk_properties}
                key={chunk_properties.identifier}
              />
            );
          })}
        <span />
      </>
    );
  }
}