var Hotels = React.createClass({
  getInitialState: function() {
    return {
      hotels: this.props.hotels,
      hotel: {
        name: ''
      },
      tmp: 'hello',
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


  _handleNameChange(idx, event) {
    var newHotels = this.state.hotels;
    newHotels[idx].name = event.target.value
    this.setState({hotels: newHotels});
  },

  _handleToggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  },

  render: function() {
    if (this.state.editMode) {
      hotels = this.props.hotels.map( (hotel, idx) =>{
        return (
          <tr key={idx}>
            <td>
              {hotel.id}
            </td>
            <td>
              <input type="text" onChange={(event) => this._handleNameChange(idx, event)} key={idx} defaultValue={hotel.name}/>
            </td>
          </tr>
        );
      });

      return (
        <div>
          <h1>Edit Mode</h1>
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

    } else {
      hotels = this.props.hotels.map( function(hotel, idx) {
        return (
          <Hotel hotel= {hotel} key ={idx} />
        );
      });
      return (
        <div>
          <h1>Normal Mode</h1>
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
  }
});
