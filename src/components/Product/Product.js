import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = props.product;
  }
  render() {
    const {
      name,
      status,
      species,
      image
    } = this.props.product;
    const self = this;
    return (
      <div className="product thumbnail">
        <img src={ image} alt="product" />
        <div className="caption">
          <p>{this.state.name}</p>
          <p>{species}</p>
          <p className="product__price">{this.state.status}</p>
          <div className="product__button-wrap">
            <Link to= {`/detail/${self.state.id}`} >
              <button
                className={'btn btn-primary'}
                style={{ width: '100%'}}
              >
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string,
  gender: PropTypes.string,
  origin: PropTypes.object,
  location: PropTypes.object,
  image: PropTypes.string,
  episode: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired
};

export default Product;
