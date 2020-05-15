import React from "react";
import axios from "axios";
import { BranchContext } from "./Editmode.jsx";
export const CollectionContext = React.createContext();

class ChunkCollection extends React.Component {
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
        params: { collection_identifier: this.props.identifier },
        em_branch: this.context.em_branch
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

ChunkCollection.contextType = BranchContext;

export default ChunkCollection;