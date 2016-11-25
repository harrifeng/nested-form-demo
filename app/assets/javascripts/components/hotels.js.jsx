var Hotels = React.createClass({
  getInitialState: function() {
    return {
      hotels: this.props.hotels,
      hotel: {
        name: ''
      },
      editMode: false,
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
          editMode: this.state.editMode,
          errors: {}
        });
      }
    });
  },

  _handleAddOneInput(){
    var newHotels = this.state.hotels;
    newHotels.push({name: ''});
    this.setState({hotels: newHotels});
  },


  _handleNameChange(e) {
    var newHotel = this.state.hotel;
    newHotel.name = e.target.value;
    this.setState({hotel: newHotel});
  },

  _handleToggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  },

  render: function() {
    if (this.state.editMode) {
      hotels = this.props.hotels.map( function(hotel, idx) {
        return (
          <tr key={idx}>
            <td>
              {hotel.id}
            </td>
            <td>
              <input type="text" onChange={this._handleNameChange} defaultValue={hotel.name}/>
            </td>
          </tr>
        );
      });
    } else {
      hotels = this.props.hotels.map( function(hotel, idx) {
        return (
          <Hotel hotel= {hotel} key ={idx} />
        );
      });
    }

    title = this.state.editMode ? "Hotel EditMode" : "Hotel NormalMode"
    return (
      <div>
        <h1>{title}</h1>
        <button onClick={this._handleAddOneInput}> Add Input</button>
        <button onClick={this._handleToggleEditMode}> Toggle Edit Mode</button>
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
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
