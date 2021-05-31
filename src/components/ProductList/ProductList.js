import React from 'react';
import PropTypes from 'prop-types';
import Product from '../../containers/Product';
import Pagination from '../Pagination';


const PER_PAGE = 10;
const TOTAL_COUNT = 450;

class ProductList extends React.Component{
  constructor (props) {
    super(props);
    //this.setState({products: props.products});
    this.state = {products: props.products};
  }
  render() {
    const products = this.props.products;
    return (
      <div className="body">
        <div >
          <ul className="product-list">
            {products.map(product => (
              <li key={product.id} className="product-list__item">
                <Product product = {product} />
              </li>
            ))}
          </ul>
          <div className="text-right">
          <Pagination
            pageRangeDisplayed={10}
            totalItemsCount={TOTAL_COUNT}
          />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductList;
