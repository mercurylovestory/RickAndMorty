import ProductList from '../containers/ProductList';
import React from 'react';
import Image from 'react-bootstrap/Image';
import SearchField from "react-search-field";
import service from '../services';
import Pagination from './Pagination';
import PropTypes from 'prop-types';

const PER_PAGE = 10;
const TOTAL_COUNT = 450;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield:'',
      gender: '',
      status: '',
      activePage: 1,
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
      },
      results: []
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  onInputChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  onSearchClick = (value)=>{
    this.getFilteredCharacterByName(value);
  }

  handleGenderChange = (event) => {
    console.log(event.target.value);
    this.setState({gender: event.target.value});
    this.getFilteredCharacterByGender(event.target.value);
  }

  handleStatusChange = (event) => {
    console.log(event.target.value);
    this.setState({status: event.target.value});
    this.getFilteredCharacterByStatus(event.target.value);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
    this.getSingleCharacters(pageNumber);
  }

  getAllCharacters() {
    service.getCharacterAll()
      .then(response => {
        this.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFilteredCharacters(name, status, gender) {
    service.getFilteredCharacter(name, status, gender)
      .then(response => {
        this.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFilteredCharacterByName(name){
    service.getFilteredCharacterByName(name)
      .then(response => {
        this.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFilteredCharacterByGender(gender){
    service.getFilteredCharacterByGender(gender)
      .then(response => {
        this.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getFilteredCharacterByStatus(status){
    service.getFilteredCharacterByStatus(status)
      .then(response => {
        this.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  getSingleCharacters(id) {
    const self = this;
    service.getSingleCharacter(id)
      .then(response => {
        self.setState({
          info: response.data.info,
          results: response.data.results
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.getAllCharacters();
  }

  render() {
    const self = this;
    console.log( this.state.results);
    const results = this.state.results;
    return (
      <div className="panel panel-default">
        <div className="panel-heading" style={{borderBottom:'solid 1px grey', textAlign:'center'}}>
          <a href="#default">
            <Image src="https://www.pngitem.com/pimgs/m/499-4990481_rick-and-morty-logo-png-rick-and-morty.png" style={{width:'200px', height: '50px'}} fluid />
          </a>
        </div>
        <div className="row">
          <div className="leftMenu">
            <div className="searchComponent">
              <div className="search-container">
                <SearchField
                  placeholder="Search..."
                  onSearchClick= {this.onSearchClick}
                  classNames="test-class"
                />
              </div>
            </div>
            <select onChange={this.handleStatusChange} style={{width: "90%", height: "30px", marginLeft: "20px", marginBottom: '30px'}} >
              <option value="unknown">unknown</option>
              <option value="alive">alive</option>
              <option value="dead">dead</option>
            </select>
            <br />
            <select onChange={this.handleGenderChange} style={{width: "90%", height: "30px", marginLeft: "20px"}}>
              <option value="unknown">unknown</option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="col-md-8" style = {{ paddingTop: "0px", marginTop: "30px", borderLeft : "solid 1px grey", height: "100%", display: "table" }}>
            <ProductList products = { results }/>
          </div>
          <div className="text-right">
            <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={1}
              totalItemsCount={34}
              pageRangeDisplayed={9}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
