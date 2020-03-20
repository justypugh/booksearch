import React, { Component } from 'react';
import './App.css';
import Search from './Search/Search';
import Results from './Results/Results';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPrintType: 'All',
      isBookType: 'no-filter',
      searchEntry: '',
      searchResults: [],
      error: null
    };
  }

  setPrintSelected(sel) {
    console.log('Print selected:, sel');
    this.setState({
      isPrintType: sel
    });
  }

  setBookSelected(sel) {
    console.log('Book selected:, sel');
    this.setState({
      isBookType: sel
    });
  }

  searchInput(inp) {
    console.log('Search has begun. Search entry is:', inp);
    this.setState({
      searchEntry: inp
    });
  }

  // fetch request
  handleSubmit(e) {
    e.preventDefault();
    console.log('submit handled!');
    // fetch request
    const baseURL = 'https://www.googleapis.com/books/v1/volumes?q=search+terms';
    const apiKey= process.env.REACT_APP_GOOGLE_BOOKSEARCH_API;
    let printType = `$printType=${this.state.isPrintType}`;
    let filter = this.state.isBookType !== 'no-filter'
          ? `$filter=${this.state.isBookType}`
          : '';
    let searchEntry = `intitle:${this.state.searchEntry}`;
    const searchURL = `${baseURL}?=${searchEntry}&${filter}&${printType}&${apiKey}`;

    fetch(searchURL)
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then(responseJson => {
      console.log(responseJson);
      this.setState({
        searchResults: responseJson.items
      });
    })
    .catch(e =>{
      console.log(e);
      this.setState({ error: e.message });
    });
  }
  
  render() {

    const selectOptions = {
      printSelections: ['all', 'books', 'magazines'],
      bookSelections: [
        'no-filter',
        'partial',
        'full',
        'free-ebooks',
        'paid-ebooks',
        'ebooks'
      ]
    };

    const error = this.state.error ? (
      <div className='error'>{this.state.error}</div>
    ) : (
      ''
    );

    return (
      <div className='App'>
        <header>
          <h1>Google Book Search</h1>
        </header>
        <main>
          <Search 
            selectOptions={selectOptions}
            handleSubmit={e => this.handleSubmit(e)}
            printChangeHandler={sel => this.setPrintSelected(sel)}
            bookChangeHandler={sel => this.setBookSelected(sel)}
            handleSearchInput={inp => this.searchInput(inp)}
          />
            
          <Results filterBookInfo={this.state.searchResults} />
            {error}
        </main>
      </div>
    );
  }
}

export default App;
