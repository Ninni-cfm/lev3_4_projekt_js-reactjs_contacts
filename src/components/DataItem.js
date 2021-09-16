import React from 'react';

import dataTable from '../data/data.json'

class DataItem extends React.Component {

    state = {
        stateData: dataTable.slice()
    }

    //************************************************************************************************
    // Get a new id: search for the highest id in array and add 1
    getNewID = () => {
        return dataTable.reduce((a, b) => (a.id > b.id) ? a : b).id + 1
    }

    handleAddUser = () => {
        let tmpArr = this.state.stateData.slice();
        let newUser = {
            "id": this.getNewID(),
            "first_name": this.state.inputFirstName,
            "last_name": this.state.inputLastName,
            "email": this.state.inputEmail,
        };

        tmpArr.push(newUser);
        dataTable.push(newUser);
        this.setState({ stateData: tmpArr });
    }
    handleDeleteUser = (id) => {
        let index = dataTable.findIndex(user => (user.id === id));
        dataTable.splice(index, 1);
        this.setState({ stateData: dataTable });
    }
    handleSortFirstName = () => {
        let tmpArr = this.state.stateData.slice();
        tmpArr.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
        this.setState({ stateData: tmpArr });
    }
    handleSortLastName = () => {
        let tmpArr = this.state.stateData.slice();
        tmpArr.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
        this.setState({ stateData: tmpArr });
    }
    handleSortId = () => {
        let tmpArr = this.state.stateData.slice();
        tmpArr.sort((a, b) => (a.id - b.id));
        this.setState({ stateData: tmpArr });
    }
    handleInput = () => {
        let searchText = document.getElementById('txtSearch').value.toLowerCase();
        if (searchText.length < 3) {
            this.setState({ stateData: dataTable.slice() });
            return;
        }
        let tmpArr = dataTable.filter(user => (
            user.first_name.toLowerCase().includes(searchText) ||
            user.last_name.toLowerCase().includes(searchText)
        ));
        this.setState({ stateData: tmpArr });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleAddUser}>Add User</button>
                <button onClick={this.handleSortLastName}>Sort by Last name</button>
                <button onClick={this.handleSortFirstName}>Sort by first name</button>
                <button onClick={this.handleSortId}>Sort by ID</button>
                <input type="text" id="txtSearch" placeholder="search" onInput={this.handleInput} />

                <form>
                    <input type="text"
                        onChange={(e) => this.setState({ inputFirstName: e.target.value })}
                        value={this.state.inputFirstName}
                        placeholder="First name"
                    />
                    <input type="text"
                        onChange={(e) => this.setState({ inputLastName: e.target.value })}
                        value={this.state.inputLastName}
                        placeholder="Last name"
                    />
                    <input type="text"
                        onChange={(e) => this.setState({ inputEmail: e.target.value })}
                        value={this.state.inputEmail}
                        placeholder="Email"
                    />
                    <input type="button" value="Save" onClick={this.handleAddUser} />
                </form>


                {this.state.stateData.map(user =>
                    <div key={user.id}>
                        <h3>
                            {user.id}:&nbsp;
                            {user.last_name}, &nbsp;
                            {user.first_name} &nbsp;
                            <a href={`mailto:${user.email}`}>Email me!</a> &nbsp;
                            <button onClick={() => this.handleDeleteUser(user.id)}>DELETE</button>
                        </h3>
                    </div>
                )}
            </div>
        );
    }
}

export default DataItem;