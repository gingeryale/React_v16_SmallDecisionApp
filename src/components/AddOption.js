
import React from 'react';
import ReactDOM from 'react-dom';
import Option from './Option';

export default class AddOption extends React.Component {
  state = { error: undefined };
  
  handleAddOption = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    this.props.handleAddOption(option);
    const error = this.props.error;
    // const error = this.props.handleAddOption(option);
    // this.setState(() => ({ error }));
    e.target.elements.option.value = '';
    
  }
  render() {
    return (
      <div>
        {this.props.error && <p className="add-option-error">{this.props.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button">Add Option</button>
        </form>
      </div>
    );
  }
}