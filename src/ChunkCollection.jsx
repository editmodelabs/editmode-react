import React from "react";
import axios from "axios";
export const CollectionContext = React.createContext();

export default class ChunkCollection extends React.Component {
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
        this.setState({ chunks: res.data.chunks });
      })
      .catch(err =>
        console.log(
          `Something went wrong trying to retrieve chunk collection: ${err}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
        )
      );
  }

  render() {
    return this.state.chunks.length ? (
      this.state.chunks.map(cnk => {
        return (
          <CollectionContext.Provider value={cnk.content} key={cnk.identifier}>
            {this.props.children}
          </CollectionContext.Provider>
        );
      })
    ) : (
      <>{this.props.children}</>
    );
  }
}