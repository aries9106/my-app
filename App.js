import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data.json'; /*** Imported Json file Provided***/


class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      opened: false,
      keyVal: null
		};
	}
  
/*** Click Method to expand the Price values and display all the prices **/
	handleClick(message) {
    const { opened } = this.state;

		
    if(message  === this.state.keyVal){
      this.setState({
        opened: !opened,
      });
    }

    this.setState({
      keyVal: message
    });
    
	}
  

/*** this method contains code to display reservation details in table format and map all the values from data.json file ***/
  render() {
    const reservationData = data;
    const { opened } = this.state;
    const { keyVal } = this.state;
    console.log(reservationData);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <table id="reservation">
            <thead>
              <tr>
                <th>Primary Guest</th>
                <th>Room Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price per day</th>
                <th>Amenity Names</th>
              </tr>
            </thead>
            <tbody>
            {reservationData.map((data,i) =>(
              <tr key={i}>
                {data.guestInfo
                .filter(( content=> content.type === 'Primary'))
                .map((val,index) =>(
                  <td key={index}>{val.name}</td>
                ))}
                <td>{data.roomDetails.Name}</td>
                <td>{data.startDate}</td>
                <td>{data.endDate}</td>
                <td>
                  <div onClick={e => this.handleClick(i)}>{data.price.perDay[0].RoomPrice + data.price.perDay[0].RoomTax + data.price.perDay[0].RoomFees}</div>
                    { (opened && (keyVal === i))  ?
                    <div>
                      <div>Room Price : {data.price.perDay[0].RoomPrice}</div>
                      <div>Room Tax : {data.price.perDay[0].RoomTax}</div>
                      <div>Room Fees : {data.price.perDay[0].RoomFees}</div>
                    </div> :null
                  }
                </td>
                <td>
                <ul>
                  {data.amenities
                  .map((val,index) =>(
                    <li key={index}>{val.name}</li>
                  ))}
                </ul>    
                </td>
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
