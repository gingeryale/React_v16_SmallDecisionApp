import React from 'react';
import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
   state = { options: [], SelectedOption: undefined, error: undefined };
 
  componentDidMount = () => {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // Do nothing at all
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount = () => {
    console.log('componentWillUnmount');
  }
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [], error: undefined }));
  }
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ SelectedOption: option }));
  }
  handleAddOption = (option) => {
    if (!option) {
      return this.setState(()=>({ error: 'Enter valid value to add item' }));
    } else if (this.state.options.indexOf(option) > -1) {
      return this.setState(()=>({ error:'This option already exists' }));
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option), error: undefined
    }));
  }
  handleClearModal = () => {
    this.setState(() => ({ SelectedOption: undefined }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer…';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
              error={this.state.error}
            />
          </div>
        </div>
        <OptionModal SelectedOption={this.state.SelectedOption} handleClearModal={this.handleClearModal} />
      </div>
    );
  }
}
