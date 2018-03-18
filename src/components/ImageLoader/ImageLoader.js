import React, { Component } from "react";
import PropTypes from "prop-types";

import preload from "../../assets/preload.png";

class ImageLoader extends Component {
  constructor(props) {
    super(props);
    this.staticImg = null;
  }

  componentDidMount() {
    const hdLoaderImg = new Image();

    hdLoaderImg.src = this.props.srcLoaded;

    hdLoaderImg.onload = () => {
      this.staticImg.setAttribute(
        "style",
        `background-image: url('${this.props.srcLoaded}')`
      );
      this.staticImg.classList.add("iron-image-fade-in");
    };
  }

  render() {
    return (
      <div className="iron-image-container" style={this.props.style}>
        <div
          className="iron-image-loaded"
          ref={imageLoadedElem => (this.staticImg = imageLoadedElem)}
        />
        <div
          className="iron-image-preload"
          style={{
            backgroundImage: `url('${this.props.srcPreload || preload}')`
          }}
        />
      </div>
    );
  }
}

ImageLoader.propTypes = {
  srcLoaded: PropTypes.string.isRequired,
  srcPreload: PropTypes.string,
  style: PropTypes.object
};

export default ImageLoader;
