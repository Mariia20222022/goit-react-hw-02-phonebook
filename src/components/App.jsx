import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = newContact => {
    const existingNames = this.state.contacts.map(contact => contact.name);
    if (existingNames.includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleFilterChange = event => {
    const filter = event.target.value;
    this.setState({ filter: filter });
  };

  filterContacts = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleAddContact}
          contacts={this.state.contacts}
        />
        <p className={css.subtitle}>Contacts:</p>
        <Filter value={this.state.filter} onChange={this.handleFilterChange} />

        <ContactList
          contacts={filteredContacts}
          filter={filter}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
