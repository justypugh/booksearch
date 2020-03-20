import React, { Component } from 'react';
import DisplaySelection from '../DisplaySelection/DisplaySelection';

export default class PrintType extends Component {
    render() {
        const selectOptions = this.props.selectOptions.printSelections;
        const printOptions = selectOptions.map((options, i) => (
            <option value={options} key={i}>
                {options}
            </option>
        ));

        return (
            <div>
                <DisplaySelection 
                    bookOptions={printOptions}
                    printChangeHandler={this.props.printChangeHandler}
                />
            </div>    
        );
    }
}