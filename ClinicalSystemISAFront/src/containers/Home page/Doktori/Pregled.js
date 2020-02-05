import React, { Component } from "react";
import Calendar from 'react-calendar';





const initialState = { //////////////////// Ova js fajl nije povezan ni sa cim
  pacijenti: null,
  date: null
}


class Pregled extends React.Component {

    state = {
        redirect: false,
        date: new Date()
    }

    onChange = date => this.setState({ date });

  render() {
    console.log(this.props.pacijenti);
    console.log(this.props);
    return (
      <div className="ui segment">

        <h2>Pregled</h2>

        <div class="ui fluid icon input">
            <input type="text" placeholder="Naziv..." />
            {/* <i class="search icon"></i> */}
        </div>

        <div class="ui fluid icon input">
            <input type="text" placeholder="Opis..." />
            {/* <i class="search icon"></i> */}
        </div>

        <hr />

        <h5>Kalendar</h5>
        <div>
            <Calendar
            onChange={this.onChange}
            value={this.state.date}
            />
         </div>
        <hr />
      </div>

     
    );
  }
}



export default Pregled;