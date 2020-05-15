import React from "react";
import { renderChunk } from "./utils/renderChunk.jsx";
import { CollectionContext } from "./ChunkCollection.jsx";

export default class ChunkProperty extends React.Component {
  constructor(props) {
    super();
    this.identifier = props.identifier;
  }

  render() {
    return (
      <CollectionContext.Consumer>
        {chunkData =>
          chunkData && chunkData.length
            ? chunkData.map(cnk =>
                cnk[`${this.identifier}`]
                  ? renderChunk(cnk[`${this.identifier}`], this.props.className)
                  : null
              )
            : null
        }
      </CollectionContext.Consumer>
    );
  }
}