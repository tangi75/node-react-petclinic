import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

 class VetDetails extends Component {
  render() {
    const selectedVet = this.props.selectedVet;
    if (!selectedVet) {
      return <div> Please select a Vet to get started.</div>
    }
    return (
      <div>
        <b> { selectedVet.firstName }</b>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedVet: state.selectedVet,
  }
}

export default connect(mapStateToProps)(VetDetails);