import React from 'react';

import contacts from '../data/contacts.json';

const sortAscending = false;
const sortDescending = true;

const gender = ["Other", "Female", "Male"]

const api_key = "b0b4722826f6b50f8449e873151132fd";
const pictureBaseUrl = "https://image.tmdb.org/t/p/w500";

class ContactList extends React.Component {

    //************************************************************************
    // create a copy of the full list and add a unique id
    // fullData = contacts.map((item, id) => ({ id, ...item }));

    //************************************************************************
    // create a copy of the full list
    fullData = contacts.slice();

    //************************************************************************
    // state of this react component
    state = {
        // this array contains the visible contacts
        contactData: this.fullData.slice(0, 5),

        // this array contains the all added contacts
        contactDataFull: this.fullData.slice(0, 5),

        // sort orders for fields
        sortOrderName: sortAscending,
        sortOrderGender: sortAscending,
        sortOrderPopularity: sortDescending,
    }

    //************************************************************************
    // Get a new id: search for the highest id in array and add 1
    // this is only necessary if we want to add a new entry which has no id!
    getNewID = () => {
        return this.fullData.reduce((a, b) => (a.id > b.id) ? a : b).id + 1
    }

    //************************************************************************
    // add a random contact to the list
    handleAddContact = () => {

        // create a work copy of the current contact list
        let tmpArr = this.state.contactDataFull.slice();

        // next remove all entries already in the contact list
        // get all existing ids from contact list
        let idArr = tmpArr.map(elt => elt.id);

        // and get a list with contacts noit in our contact list
        let tmpFull = this.fullData.filter(contact => !idArr.includes(contact.id));

        // if tmpFull has contacts select a random one
        if (tmpFull.length > 0) {
            let idx = Math.floor(Math.random() * tmpFull.length);
            tmpArr.push(tmpFull[idx]);
        }
        this.setState({ contactData: tmpArr });
        this.setState({ contactDataFull: tmpArr });
    }

    //************************************************************************
    // update a contact from the list
    handleUpdateContact = (id) => {

        let tmpArr = this.state.contactDataFull.slice();

        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                let idx = this.state.contactDataFull.findIndex(c => (c.id === id))

                tmpArr[idx].pictureUrl = pictureBaseUrl + data.profile_path;
                tmpArr[idx].gender = data.gender;
                tmpArr[idx].popularity = data.popularity;

                this.setState({ contactData: tmpArr });
                this.setState({ contactDataFull: tmpArr });
            })
            .catch(err => {
                console.log(err);
            });
    }

    //************************************************************************
    // delete a contact from the list
    handleDeleteContact = (id) => {
        let tmpArr = this.state.contactData.slice();
        let index = tmpArr.findIndex(user => (user.id === id));
        tmpArr.splice(index, 1);
        this.setState({ contactData: tmpArr });
        this.setState({ contactDataFull: tmpArr });
    }

    //************************************************************************
    // sort all contacts by name (ascending first)
    handleSortByName = () => {
        let tmpArr = this.state.contactData.slice();
        tmpArr.sort((a, b) => (a.name > b.name ? 1 : -1));
        if (this.state.sortOrderName === sortDescending) {
            tmpArr.reverse();
        }
        this.setState({ sortOrderName: !this.state.sortOrderName });
        this.setState({ sortOrderGender: sortDescending });
        this.setState({ sortOrderPopularity: sortDescending });
        this.setState({ contactData: tmpArr });
        this.setState({ contactDataFull: tmpArr });
    }

    //************************************************************************
    // sort all contacts by popularity (descending first)
    handleSortByPopularity = () => {
        let tmpArr = this.state.contactData.slice();
        tmpArr.sort((a, b) => (a.popularity - b.popularity));
        if (this.state.sortOrderPopularity === sortDescending) {
            tmpArr.reverse();
        }
        this.setState({ sortOrderPopularity: !this.state.sortOrderPopularity });
        this.setState({ sortOrderName: sortAscending });
        this.setState({ sortOrderGender: sortAscending });
        this.setState({ contactData: tmpArr });
        this.setState({ contactDataFull: tmpArr });
    }

    //************************************************************************
    // sort all contacts by gender (ascending first)
    handleSortByGender = () => {
        let tmpArr = this.state.contactData.slice();
        tmpArr.sort((a, b) => (gender[a.gender] > gender[b.gender] ? 1 : -1));
        if (this.state.sortOrderGender === sortDescending) {
            tmpArr.reverse();
        }
        this.setState({ sortOrderGender: !this.state.sortOrderGender });
        this.setState({ sortOrderName: sortAscending });
        this.setState({ sortOrderPopularity: sortDescending });
        this.setState({ contactData: tmpArr });
        this.setState({ contactDataFull: tmpArr });
    }

    //************************************************************************
    // Filter contacts by name (give at least 3 letters)
    handleFilter = () => {
        let searchText = document.getElementById('txtFilter').value.toLowerCase();
        if (searchText.length < 3) {
            this.setState({ contactData: this.state.contactDataFull.slice() });
            return;
        }
        let tmpArr = this.state.contactDataFull.filter(contact => (
            contact.name.toLowerCase().includes(searchText)
        ));
        this.setState({ contactData: tmpArr });
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
                            <button className="headerStyle buttonStyle" onClick={this.handleAddContact}>Add Contact</button>
                            <input className="headerStyle input" type="text" id="txtFilter" placeholder="Filter by name" onInput={this.handleFilter} />
                        </div>

                        {/************************************************************************************/}
                        <div className="ContactList grid">
                            <p className="headerStyle">Picture</p>
                            <p className="headerStyle buttonStyle" onClick={this.handleSortByName}>Name</p>
                            <p className="headerStyle buttonStyle" onClick={this.handleSortByGender}>Gender</p>
                            <p className="headerStyle buttonStyle" onClick={this.handleSortByPopularity}>Popularity</p>
                            <p className="headerStyle">Action</p>
                        </div>
                    </header>

                    {/************************************************************************************/}
                    {this.state.contactData.map(contact =>
                        <div className="ContactItem grid" key={contact.id}>
                            <img src={contact.pictureUrl} alt={contact.name} onLoad={this.handleImageLoaded} />
                            <h3>{contact.name}</h3>
                            <h3>{gender[contact.gender]}</h3>
                            <h3>{contact.popularity.toFixed(2)}</h3>
                            <div>
                                <div className="headerStyle buttonStyle" onClick={() => this.handleUpdateContact(contact.id)}>Update</div>
                                <div className="headerStyle buttonStyle" onClick={() => this.handleDeleteContact(contact.id)}>DELETE</div>
                            </div>
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