import React, { Component } from 'react';

export default function(props) {
  const vet = props.data;
  const specialities = _.map(vet.specialties, 'name');

  return (
    <div className="card mb-4">

      {/* <!-- Card image --> */}
      <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap" />

      {/* <!-- Card content --> */}
      <div className="card-body">
        {/* <!-- Title --> */}
        <h4 className="card-title"><a>{vet.lastName}, {vet.firstName}</a></h4>
        {/* <!-- Button --> */}
        <a href="#" className="btn btn-primary">Button</a>
      </div>
      {/* <!-- Card footer --> */}
      <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
        <ul className="list-unstyled list-inline font-small">
          {
            specialities.map(speciality =>
              <li className="list-inline-item pr-2 white-text">{speciality}</li>
            )
          }
        </ul>
      </div>
    </div>
  );
}