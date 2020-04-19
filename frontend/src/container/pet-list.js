import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class PetsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      selectedPet: 'Choose a Pet',
    }

    this.handleSelectedPet = this.handleSelectedPet.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleSelectedPet(event) {
    dropdownOpen: !this.state.dropdownOpen,
      this.setState({
        selectedPet: event.target.innerText,
      })
    this.props.onPetSelect(event.target.value);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderPetsList() {
    if (!this.props.pets || this.props.pets.length < 1) {
      return (
        <div>No Pets found!</div>
      )
    }

    return this.props.pets.map((pet) => {
      return (
        <DropdownItem 
          key={pet._id} 
          onClick={this.handleSelectedPet}
          value={pet._id}>
          {pet.name}
        </DropdownItem>
      )
    });
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.selectedPet}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>Choose a Pet</DropdownItem>
          {this.renderPetsList()}
        </DropdownMenu>
      </Dropdown>
    )
  }
}