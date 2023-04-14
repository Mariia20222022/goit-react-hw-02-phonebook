import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';
class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string.isRequired,
    addContact: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    filterContacts: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
  };
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const usedName = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
    if (usedName) {
      alert(`${name} is already in contacts`, 'sorry');
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
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

        <ContactForm onSubmit={this.addContact} />
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
