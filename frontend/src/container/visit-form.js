import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  Alert,
  Container, 
  Button, 
  Dropdown,
  DropdownToggle,
  DropdownMenu, 
  DropdownItem} from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { 
  fetchVets,
  fetchPets,
  submit,
 } from '../actions';
import PetsList from './pet-list';
import SuccessModal from '../components/success-modal';


class VisitForm extends Component{
  constructor(props){
    super(props);

    this.state = {
      vets: this.props.fetchVets(),
      pets: this.props.fetchPets(),
      dropdownOpen: false,
      selectedVet: 'Choose a Provider',
      showConfirmation: false
    }

    this.handleSelectProvider = this.handleSelectProvider.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.renderSuccessModal = this.renderSuccessModal.bind(this);
  }

  handleChange(date){
    const time = moment(date).format("hha");
    this.setState({
      appointmentDate: date,
      time,
      showConfirmation: true,
    });
    
  }

  handleSelectProvider(event) {
    dropdownOpen: !this.state.dropdownOpen,
    this.setState({
      selectedVet: event.target.innerText,
      selectedVetId: event.target.value

    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  renderVisitForm() {
    if (!this.props.vets || this.props.vets.length < 1) {
      return (
        <div>No Vets found!</div>
      )
    }

    return this.props.vets.map((vet) => {
      return (
        <DropdownItem key={vet._id} value={vet._id} onClick={this.handleSelectProvider}>{vet.lastName}, {vet.firstName}</DropdownItem>
      )
    });
  }

  renderConfirmationString() {
    return (
    <h3 className="confirmationText">
      {
          <span>Scheduling a <span className="confirmationHighlight"> 1 hour </span>
        appointment {this.state.appointmentDate && <span>
              on <span className="confirmationHighlight">
          {moment(this.state.appointmentDate).format('dddd[,] MMMM Do')}
          </span> at <span className="confirmationHighlight">{this.state.time} </span>
            </span>}
      </span>}
    </h3> );
  }

  renderSuccessModal() {
    const status = _.get(this.props, 'visitRequest.request.status');
    if (status === 200) {
      window.alert(`Visit successully created`);
    } else if (status === 409) {
      window.alert(`This Date/Time slot is not available. Please choose some other Vet or Date/Time`);
    }
  }

  handleSubmit() {
    const payload = {
      visitDate: moment(this.state.appointmentDate).toISOString(),
      visitTime: this.state.time,
      description: this.state.description,
      pet: this.state.selectedPetId,
      vet: this.state.selectedVetId,
    }
    this.props.submit(payload);
    this.renderSuccessModal();
  }

  handleDescription(event){
    this.setState({
      description: event.target.value,
    });
  }

  render() {
    return (
      <Container>
        {this.renderConfirmationString()}
        <div className="shadow-lg p-3 mb-5 bg-white rounded">Step1: Choose a Provider.
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.state.selectedVet}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>Choose a Provder</DropdownItem>
              {this.renderVisitForm()}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          Step2: Choose a date for your visit.
          <DatePicker
            selected={this.state.appointmentDate}
            onChange={this.handleChange}
            showTimeSelect
            timeIntervals={60}
            minDate={moment()}
            maxDate={moment().add(2, "weeks")}
            minTime={moment().hours(9).minutes(0)}
            maxTime={moment().hours(17).minutes(0)}
            dateFormat="LLL"
            filterDate={this.isWeekday}
          />
        </div>
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          Step3: Fill your Pet's information
          <PetsList pets={this.props.pets} onPetSelect={ (petId) => {
            this.setState({
              selectedPetId: petId,
            })
          }
          } />
          <br/>
          Reason for visit:
          <br/>
          <textarea onChange={this.handleDescription}/> <br/>
          <Button color="primary" size="lg" active onClick={this.handleSubmit} >Submit</Button>
        </div>
      </Container>
    )
  } 
}

function mapStateToProps(state) {
  // object returned from here will end up in this.props
  return {
    vets: state.vets,
    pets: state.pets,
    visitRequest: state.visitRequest
  }
}

// object returned from here will end up in this.props
// Whenever selectedVet is called, the result should be passed 
// to all the reducers
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchVets,
    fetchPets,
    submit,
  },dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitForm);