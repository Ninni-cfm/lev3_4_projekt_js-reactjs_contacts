import React from 'react';

import contacts from '../data/contacts.json';

const sortAscending = false;
const sortDescending = true;

class ContactList extends React.Component {

    //************************************************************************
    // create a copy of the full 
    fullData = contacts.map((item, id) => ({ id, ...item }));

    //************************************************************************
    // state of this react component
    state = {
        stateData: this.fullData.slice(0, 10),
        stateData2: this.fullData.slice(0, 10),
        sortOrderName: sortAscending,
        sortOrderPopularity: sortDescending,

        newContact: this.fullData.slice(0)
    }

    //************************************************************************
    // Get a new id: search for the highest id in array and add 1
    getNewID = () => {
        return this.fullData.reduce((a, b) => (a.id > b.id) ? a : b).id + 1
    }

    //************************************************************************
    // add random contact to the list
    handleAddContact = () => {
        // if (this.fullData.length == this.state.stateData2.length)
        //     return;

        // do {
        // this.setState({ newContact: this.fullData[newId] });
        // }
        // while (this.state.stateData.findIndex(contact => (contact.id === this.state.newContact.id)) >= 0);

        let tmpArr = this.state.stateData.slice();
        let newId = Math.floor(Math.random() * this.fullData.length);
        tmpArr.push(this.fullData[newId]);
        this.setState({ stateData: tmpArr });
        this.setState({ stateData2: tmpArr });
    }

    //************************************************************************
    // delete a contact from the list
    handleDeleteContact = (id) => {
        let tmpArr = this.state.stateData.slice();
        let index = tmpArr.findIndex(user => (user.id === id));
        tmpArr.splice(index, 1);
        this.setState({ stateData: tmpArr });
        this.setState({ stateData2: tmpArr });
    }

    //************************************************************************
    // sort all contacts by name (ascending first)
    handleSortByName = () => {
        let tmpArr = this.state.stateData.slice();
        tmpArr.sort((a, b) => (a.name > b.name ? 1 : -1));
        if (this.state.sortOrderName === sortDescending) {
            tmpArr.reverse();
        }
        this.setState({ sortOrderName: !this.state.sortOrderName });
        this.setState({ sortOrderPopularity: sortDescending });
        this.setState({ stateData: tmpArr });
        this.setState({ stateData2: tmpArr });
    }

    //************************************************************************
    // sort all contacts by popularity (descending first)
    handleSortByPopularity = () => {
        let tmpArr = this.state.stateData.slice();
        tmpArr.sort((a, b) => (a.popularity - b.popularity));
        if (this.state.sortOrderPopularity === sortDescending) {
            tmpArr.reverse();
        }
        this.setState({ sortOrderPopularity: !this.state.sortOrderPopularity });
        this.setState({ sortOrderName: sortAscending });
        this.setState({ stateData: tmpArr });
        this.setState({ stateData2: tmpArr });
    }

    //************************************************************************
    // Filter contacts by name (give at least 3 letters)
    handleFilter = () => {
        let searchText = document.getElementById('txtFilter').value.toLowerCase();
        if (searchText.length < 3) {
            this.setState({ stateData: this.state.stateData2.slice() });
            return;
        }
        let tmpArr = this.state.stateData2.filter(contact => (
            contact.name.toLowerCase().includes(searchText)
        ));
        this.setState({ stateData: tmpArr });
    }

    //************************************************************************
    // create (render) the contact list
    render() {
        try {
            return (
                <div className="Contacts">

                    <header className="ContactsHeader">
                        {/************************************************************************************/}
                        <div className="grid">
                            <button className="headerStyle" onClick={this.handleAddContact}>Add Contact</button>
                            <input className="headerStyle input" type="text" id="txtFilter" placeholder="Filter by name" onInput={this.handleFilter} />
                        </div>

                        {/************************************************************************************/}
                        <div className="ContactList grid">
                            <p className="headerStyle">Picture</p>
                            <p className="headerStyle buttonStyle" onClick={this.handleSortByName}>Name</p>
                            <p className="headerStyle buttonStyle" onClick={this.handleSortByPopularity}>Popularity</p>
                            <p className="headerStyle">Action</p>
                        </div>
                    </header>

                    {/************************************************************************************/}
                    {this.state.stateData.map(contact =>
                        <div className="ContactItem grid" key={contact.id}>
                            <img src={contact.pictureUrl} alt={contact.name} onLoad={this.handleImageLoaded} />
                            <h3>{contact.name}</h3>
                            <h3>{contact.popularity.toFixed(2)}</h3>
                            <button className="headerStyle" onClick={() => this.handleDeleteContact(contact.id)}>DELETE</button>
                        </div>
                    )}
                </div>
            );
        } catch (error) {
            console.log(error);
        }
    }
}

export default ContactList;