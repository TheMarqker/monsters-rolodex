import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component{
  constructor() {
    super();
   
    this.state = {
      monsters: [],
      searchField: ''
    };
    console.log('constructor loads 1st');
  }

  componentDidMount() {
    console.log('Component did mount, loads 3rd')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then((users) => 
      this.setState(
        () => {
      return {monsters: users};
    },
    () => {
      console.log(this.state);
    }
    ));
  }

    // Increase Performance, not rendering extra function whenever render is being called
    onSearchChange = (event) => { 
      console.log(event.target.value);
      const searchField = event.target.value.toLocaleLowerCase();

      this.setState(() => {
        return { searchField };
      }
      );
    }

  render() {
    console.log('render goes 2nd and again at this.state change')

    const { monsters, searchField  } = this.state; // optimizations for readability
    const { onSearchChange } = this; // optimizations for readability onChange={this.onSearchChange}

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className='search-box'
          onChangeHandler={onSearchChange} 
          placeholder='search monsters' 
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;