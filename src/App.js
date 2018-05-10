import React, { PureComponent } from 'react';
import Header from './Header';
import AddContact from './AddContact';
import './App.css';
import ContactRow from './ContactRow';
import { Table } from 'semantic-ui-react'

//Default contact data
const contactData = [
	      {
                
                	"id":"0",
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "john@doe.com",
                    "phoneNumber": "7032921921",
                    "status": "Active"
                
             },
             {
                
                    "id":"1",
                    "firstName": "Mary",
                    "lastName": "Lou",
                    "email": "mary@lou.com",
                    "phoneNumber": "18002929422",
                    "status": "Active"
                
             }
]

//Data is saved to local storage
localStorage.setItem('contactData', JSON.stringify(contactData));

class App extends PureComponent {
	//Constructor
	constructor(props) {
		super(props);
	
		this.state = {
      		contactData: JSON.parse(localStorage.getItem('contactData')),
      		nextId: 2
    	};
	
		this.handleAddContact = this.handleAddContact.bind(this);
		this.handleSaveContact = this.handleSaveContact.bind(this);
		this.handleDeleteContact = this.handleDeleteContact.bind(this);
		this.getContacts = this.getContacts.bind(this);
	}
	
  componentWillMount() {
  	const contactData = this.getContacts();
  	this.setState({ contactData });
  }
  
  //Retrieve contact data
  getContacts() { 
  	return this.state.contactData;
  }
  
  //Method for adding contacts
  handleAddContact(firstName, lastName, email, phoneNumber, status){
  		const contacts = this.getContacts();
  		let id = this.state.nextId;
  		
  		contacts.push({
  			id,
  			firstName,
  			lastName,
  			email,
  			phoneNumber,
  			status
  		});
  		
  		id = id+1;
  		
  		this.setState({ contactData:contacts, nextId:id });
  }
  
  //Method for deleting contacts
  handleDeleteContact(id) {
  		const contactData = this.getContacts();
  		const updatedContactData = contactData.filter(contact => {
  			return contact.id !== id;
  		});
  		this.setState({ contactData:updatedContactData });
  }
  
  //Method for saving contacts
  handleSaveContact(id, firstName, lastName, email, phoneNumber, status) {
        const contactData = this.getContacts();
        const updatedContactData = contactData.map(contact => {
        	if (contact.id === id) {
        		contact.firstName = firstName;
        		contact.lastName = lastName;
				contact.email = email;
				contact.phoneNumber = phoneNumber;
				contact.status = status;
        	}
        	
        	return contact;
        });
        
        this.setState({ contactData:updatedContactData });
  	}
	
  render() {
    return (
    <div>
    	<Header/>
    	<AddContact handleAddContact={this.handleAddContact}/>
    	<div style={{padding:'5px'}}>
    		<Table celled selectable>
    			<Table.Header>
     	 			<Table.Row>
        				<Table.HeaderCell>First Name</Table.HeaderCell>
        				<Table.HeaderCell>Last Name</Table.HeaderCell>
        				<Table.HeaderCell>Email</Table.HeaderCell>
        				<Table.HeaderCell>Phone Number</Table.HeaderCell>
        				<Table.HeaderCell>Status</Table.HeaderCell>
        				<Table.HeaderCell></Table.HeaderCell>
      				</Table.Row>
    			</Table.Header>

    			<Table.Body>
        			{this.state.contactData.map((contactData) =>
              			<ContactRow
                			key={contactData.id}
                			{...contactData}
                			handleDeleteContact = {this.handleDeleteContact}
                			handleSaveContact = {this.handleSaveContact}
              			/>
          			)}
     			</Table.Body>
  			</Table>
  		</div>
  </div>
    );
  }
}

export default App;
