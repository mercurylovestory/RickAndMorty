import ProductList from '../containers/ProductList';
//import ProductList from './ProductList/ProductList';
import React from 'react';
import Image from 'react-bootstrap/Image';
import { AiOutlineSearch as Search } from 'react-icons/ai';
import { Dropdown } from 'reactjs-dropdown-component';
import service from '../services';

const character = [
  {
    label: 'unknown',
    value: 'unknown'
  },
  {
    label: 'alive',
    value: 'alive'
  },
  {
    label: 'dead',
    value: 'dead'
  }
];

const gender = [
  {
    label: 'unknown',
    value: 'unknown'
  },
  {
    label: 'male',
    value: 'male'
  },
  {
    label: 'female',
    value: 'female'
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
      },
      results: []
    };
    /*
    var products = [
      {
        id: 21,
        name: "Aqua Morty",
        specie: "Humanoid",
        status: "sell"
      },
      {
        id: "1",
        name: "hat",
        specie: "big",
        status: "sell"
      },
      {
        id: "2",
        name: "cup",
        specie: "medium",
        status: "sell"
      },
      {
        id: "3",
        name: "mouse",
        specie: "small",
        status: "sell"
      },
      {
        id: "4",
        name: "keyboard",
        specie: "small",
        status: "sell"
      },
      {
        id: "5",
        name: "computer",
        specie: "medium",
        status: "sell"
      },
      {
        id: "6",
        name: "camera",
        specie: "small",
        status: "sell"
      }
    ];*/
//    this.state = { products: products};
  }

  async loadItems() {
    const self = this;
    await fetch("https://rickandmortyapi.com/api/character/?page=1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
          this.setState({ products: []});
          this.setState({ products: [...result.results]});
          console.log( this.state);
        },
        (error) => {
          console.log(error);
          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }
      );
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
    //this.getSingleCharacters(1);
    this.getAllCharacters();
  }

  render() {
    console.log( this.state.results);
    const results = this.state.results;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <a href="#default">
            <Image src="holder.js/100px250" fluid />
          </a>
        </div>
        <div className="row">
          <div className="leftMenu">
            <div className="searchComponent">
              <div className="search-container">
                <input type="text" placeholder="Search" name="search" />
                <button onClick={e => this.onSearchClick(e)}>
                  <Search />
                </button>
              </div>
            </div>
            <Dropdown
              className="character"
              name="character"
              title="Select character"
              list={character}
            />
            <br />
            <Dropdown
              className="gender"
              name="gender"
              title="Select gender"
              list={gender}
            />
          </div>
          <div className="col-md-8" style = {{ paddingTop: "0px", marginTop: "30px", borderLeft : "solid 1px gray", height: "100%", display: "table" }}>
            <ProductList products = { results }/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
