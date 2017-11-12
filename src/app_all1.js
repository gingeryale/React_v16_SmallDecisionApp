import React from 'react';
import ReactDOM from 'react-dom';

class Indie extends React.Component {
constructor(props){
super(props);
 this.showOption=this.showOption.bind(this);
 this.handleAddNew=this.handleAddNew.bind(this);
 this.clearAll=this.clearAll.bind(this);
 this.deleteMe=this.deleteMe.bind(this);
 this.state = {
  options: ['aa', 'bb'],
  error: undefined
  }
}

showOption(){
const randomNum = Math.floor(Math.random()*(this.state.options).length);
const randomOpt = this.state.options[randomNum];
alert(randomOpt);
}

handleAddNew(option){

     if(!option){
         return this.setState( () => ({error:'Enter Valid Value to add Item' })) ;
     } else if (this.state.options.indexOf(option) > -1) {
         return this.setState( () => ({error:'Option Already Exists' })) ;
     } 
 
     //clear error if item added to options array
     this.setState( (state) => ({options: this.state.options.concat(option), error: undefined}) );
    }

deleteMe(deleteOpt){
  this.setState((ps)=>({
    options: ps.options.filter((option) => deleteOpt !== option)
  }));
}

clearAll(){
console.log('cleared');
this.setState(()=>({
  options: [],
  error: undefined
}));
}

  render() {
    return (
      <div>
      <Header />
      <Action  hasOptions={this.state.options.length > 0} showOption={this.showOption}/>
      <Options options={this.state.options} 
               clearAll={this.clearAll}
               deleteMe={this.deleteMe}
               />
      <AddNew handleAddNew={this.handleAddNew} error={this.state.error}/>
      </div>
    )
  }
}

const Header = (props) => (
  <div>
  <h1>Making Choices</h1>
  </div>
)

const Action = (props) => (
  <div>
  <button disabled={!props.hasOptions} onClick={props.showOption}>Select Something</button>
  </div>
)

class Options extends React.Component {
  render() {
    return (
    <div>
    {this.props.options.length === 0 && <p>Please add an option to get started!</p>}
    {this.props.options.map((oo)=>
    <Option 
    key={oo} 
    textVal={oo} 
    deleteMe={this.props.deleteMe}
    />)}
    <button onClick={this.props.clearAll}>Clear All</button>
    </div>
    )
  }
}

const Option = (props) => (
  <div>
  {props.textVal}<button onClick={(e)=>props.deleteMe(props.textVal)}>Remove</button>
  </div>
)

class AddNew extends React.Component {
constructor(props){
super(props);
this.handleAddNew=this.handleAddNew.bind(this);
this.state={ error: undefined }
}

handleAddNew(e){
  e.preventDefault();
  const option = e.target.elements.newOpt.value.trim();
  //const error = this.props.handleAddNew(option);
  this.props.handleAddNew(option);
  const error = this.props.error;
  //this.setState(() => ({ error }));

  // if(!error){ e.target.elements.newOpt.value = ''; }
  e.target.elements.newOpt.value = ''; 
}

  render () {
  return(
  <div>
  {this.props.error && <p>{this.props.error}</p>}
  <form onSubmit={this.handleAddNew}>
  <input type="text" name="newOpt" />
  <button>add</button>
  </form>
  </div>
  )
  }
}


ReactDOM.render(<Indie />, document.getElementById('app'));