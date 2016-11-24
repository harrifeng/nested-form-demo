var Hotels = React.createClass({
  getInitialState: function() {
    return {
      hotels: this.props.hotels,
      hotel: {
        name: ''
      },
      errors: {}
    };
  },

  _handleAddHotel: function()  {
    var that = this;

    $.ajax({
      method: 'POST',
      data: {
        hotel: that.state.hotel,
      },
      url: '/hotels.json',
      success: function(res) {
        var newHotelList = that.state.hotels;
        newHotelList.push(res);
        that.setState({
          hotels: newHotelList,
          hotel: {
            name: ''
          },
          errors: {}
        });
      }
    });
  },

  _handleNameChange(e) {
    var newHotel = this.state.hotel;
    newHotel.name = e.target.value;
    this.setState({hotel: newHotel});
  },


  render: function() {
    hotels = this.props.hotels.map( function(hotel) {
      return (
        <Hotel hotel= {hotel} key ={hotel.id} />
      );
    });
    return (
      <div>
        <h1>Hotels</h1>
        <div id="hotels">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {hotels}
              <tr>
                <td>
                </td>
                <td>
                  <input type="text" onChange={this._handleNameChange} value={this.state.hotel.name}/>
                </td>
                <td>
                  <button onClick={this._handleAddHotel}> Add This Hotel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
