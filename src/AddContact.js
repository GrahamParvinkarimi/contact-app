import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import './App.css'

//Options for contact status select
const options = [
  	{ key: 'i', text: 'Active', value: 'Active', selected: true},
  	{ key: 'a', text: 'Inactive', value: 'Inactive' },
]

class AddContact extends Component {
	//Constructor
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.showAddSection = this.showAddSection.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
		
		this.state = {
			isAdd: false,
			selectValue: ''
		};
	}
	
	//Method to show the add contact section
	showAddSection() {
		this.setState({ isAdd: true, selectValue:'Active' });
  	}
  	
  	//Method to set the status select element's value in the state
  	onSelectChange(e) {
    	this.setState({ selectValue: e.target.textContent });
  	}
	
	//Method for submitting the add contact form
	onSubmit(event, form) {		
		event.preventDefault();
		
		this.props.handleAddContact(this.firstNameInput.value, 
		this.lastNameInput.value, this.emailInput.value, 
		this.phoneNumberInput.value, this.state.selectValue);
		
		this.firstNameInput.value = '';
		this.lastNameInput.value = '';
		this.emailInput.value = '';
		this.phoneNumberInput.value = '';
		
		this.setState({ isAdd:false, selectValue:'' });
	}

	render() {
		return (
			this.state.isAdd 
			
			?
			
			<form onSubmit={this.onSubmit}>
				<Button style={{margin:'5px'}}>Add</Button>
				<div className="ui input">
					<input className="addContact" name="firstName" placeholder="First Name" ref={firstNameInput => this.firstNameInput = firstNameInput} required/>
				</div>
				<div className="ui input">
					<input className="addContact" name="lastName" placeholder="Last Name" ref={lastNameInput => this.lastNameInput = lastNameInput} required/>
				</div>
				<div className="ui input">
					<input className="addContact" name="email" placeholder="Email" type="email" ref={emailInput => this.emailInput = emailInput} required/>
				</div>
				<div className="ui input">
					<input className="addContact" name="phoneNumber" placeholder="Phone Number" type="number" ref={phoneNumberInput => this.phoneNumberInput = phoneNumberInput} required/>
				</div>
				<div className="ui input">
					 <Form.Select placeholder="Please Select" onChange={this.onSelectChange} options={options}/>
				</div>
			</form>
			
			:
			
			<Button style={{marginLeft:'5px'}} onClick={this.showAddSection}>Add Contact</Button>
		);
	}

}

export default AddContact;