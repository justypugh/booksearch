import React, { Component } from 'react';
import './Search.css';
import PrintType from '../PrintType/PrintType';
import BookType from '../BookType/BookType';

export default class Search extends Component {
    render() {
        return (
            <section>
                <form 
                className='search-form'
                onSubmit={e => this.props.handleSubmit(e)}
                >
                <label className='search-label' htmlFor='search'>
                    <span>Search: </span>
                    <input 
                        type='text'
                        name='search'
                        id='search'
                        placeholder='henry'
                        onChange={inp => this.props.handleSearchInput(inp.target.value)}
                    />
                </label>
                
                <input type='submit' value='Submit' />
                </form>

                <label htmlFor='print-type'>Print Type: 
                    <PrintType
                        selectOptions={this.props.selectOptions}
                        printChangeHandler={this.props.printChangeHandler}
                    />
                </label>
                

                <label htmlFor='book-type'>Book Type: </label>
                <BookType 
                        selectOptions={this.props.selectOptions}
                        bookChangeHandler={this.props.bookChangeHandler}
                    />
            </section>
        );
    }
}