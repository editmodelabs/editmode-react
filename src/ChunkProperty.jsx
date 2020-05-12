import React from "react";
import DOMpurify from "dompurify";

export default class ChunkProperty extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let cnk = this.props.chunk_properties;
    cnk = {...cnk, content: DOMpurify.sanitize(cnk.content)}
    switch (cnk.chunk_type){
      case "single_line_text":
        return <span data-chunk={cnk.identifier}>{cnk.content}</span>
      case "image":
        return <img src={cnk.content} alt=""/>
      default:
        return <span>{cnk.content}</span>
    }
  }
}