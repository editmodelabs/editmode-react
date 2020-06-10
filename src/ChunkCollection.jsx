// @ts-check

import React from "react";
import axios from "axios";
import { Context } from "./Context";

export const CollectionContext = React.createContext(null);

class ChunkCollection extends React.Component {
  constructor(props) {
    super(props);

    this.identifier = props.identifier;
    this.state = {
      chunks: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://api.editmode.com/`, {
        params: { collection_identifier: this.props.identifier },
        // @ts-ignore
        em_branch: this.context.branch,
      })
      .then((res) => {
        this.setState({ chunks: res.data.chunks });
      })
      .catch((err) =>
        console.log(
          `Something went wrong trying to retrieve chunk collection: ${err}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`
        )
      );
  }

  render() {
    return this.state.chunks.length ? (
      this.state.chunks.map((cnk) => {
        return (
          <CollectionContext.Provider value={cnk.content} key={cnk.identifier}>
            <div
              collection-name={cnk.collection.name}
              className={this.props.className}
            >
              {this.props.children}
            </div>
          </CollectionContext.Provider>
        );
      })
    ) : (
      <>{this.props.children}</>
    );
  }
}

ChunkCollection.contextType = Context;

export default ChunkCollection;
