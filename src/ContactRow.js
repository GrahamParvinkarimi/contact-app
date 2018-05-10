import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './ContactRow.css';
import { Table, Button} from 'semantic-ui-react'

class ContactRow extends PureComponent {
	//Constructor
	constructor(props) {
		super(props);
		
		this.state = {
			isEdit: false,
			selectValue: ''
		};

		this.handleEditContact = this.handleEditContact.bind(this);
		this.handleSaveContact = this.handleSaveContact.bind(this);
		this.handleDeleteContact = this.handleDeleteContact.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}
	
	//Method to set the status select element's value in the state
	onSelectChange(e) {
    	this.setState({ selectValue: e.target.value });
  	}
	
	//Method for showing the edit section
	handleEditContact() {
		this.setState({ isEdit: true, selectValue:this.props.status });
  	}
	
	//Method for deleting contacts
	handleDeleteContact() {
		const {handleDeleteContact, id} = this.props;
  		handleDeleteContact(id);
  	}
  	
  	//Method for saving contacts
  	handleSaveContact(event) {
  		event.preventDefault();
  		
  		this.props.handleSaveContact(this.idInput.value, this.firstNameInput.value, 
		this.lastNameInput.value, this.emailInput.value, 
		this.phoneNumberInput.value, this.state.selectValue);
		
		this.setState({ isEdit: false });
  	}

  render() {
  	const {firstName, lastName, email, phoneNumber, status, id} = this.props;
  
    return (
      this.state.isEdit ?
      	(
      	<Table.Row>
      		<Table.Cell>
      			<form id="form1" onSubmit={this.handleSaveContact}>
      			<input form="form1" placeholder="First Name" ref={firstNameInput => this.firstNameInput = firstNameInput}
      			defaultValue={firstName} required/>
      			</form>
      		</Table.Cell>
        	<Table.Cell>
        		<input form="form1" placeholder="Last Name" ref={lastNameInput => this.lastNameInput = lastNameInput}
        		defaultValue={lastName} required/>
        	</Table.Cell>
        	<Table.Cell>
        		<input form="form1" placeholder="Email" type="email" ref={emailInput => this.emailInput = emailInput}
        		defaultValue={email} required/>
        	</Table.Cell>
        	<Table.Cell>
        		<input form="form1" placeholder="Phone Number" type="number" ref={phoneNumberInput => this.phoneNumberInput = phoneNumberInput}
        		defaultValue={phoneNumber} required/>
        	</Table.Cell>
        	<Table.Cell>
        		<select onChange={this.onSelectChange}
        		defaultValue={status}>
        			<option value="Active">Active</option>
        			<option value="Inactive">Inactive</option>
        		</select>
        	</Table.Cell>
        	<Table.Cell>
        		<input form="form1" type="hidden" value={id} ref={idInput => this.idInput = idInput} required/>
        		<Button form="form1">Save</Button>
        	</Table.Cell>
        </Table.Row>
      	)
			
      	:
      	
      	(
      	<Table.Row>
        	<Table.Cell>{firstName}</Table.Cell>
        	<Table.Cell>{lastName}</Table.Cell>
        	<Table.Cell>{email}</Table.Cell>
        	<Table.Cell>{phoneNumber}</Table.Cell>
        	<Table.Cell>{status}</Table.Cell>
        	<Table.Cell>
        	<Button onClick={this.handleEditContact}>Edit</Button><Button onClick={this.handleDeleteContact}>Delete</Button>
        	</Table.Cell>
        </Table.Row>
        )
    );
  }
}
ContactRow.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  status: PropTypes.string,
};
export default ContactRow;