import { Component } from 'react';

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

  render() {
    console.log('render goes 2nd and again at this.state change')

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        <input className='search-box' type='search' placeholder='search monsters' onChange={(event) => {
          console.log(event.target.value);
          const searchField = event.target.value.toLocaleLowerCase();

          this.setState(() => {
            return { searchField };
          }
          );
        }} 
        />
        {filteredMonsters.map((monster) => {
          return (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
          );
        })}
      </div>
 )}
}

export default App;
