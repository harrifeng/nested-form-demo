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
    newHotels.push({
      name: '',
      added: true,
    });
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

  _handleSubmitAll() {
    var that = this;

    $.ajax({
      method: 'POST',
      data: {
        hotels: that.state.hotels,
      },
      url: '/hotels/update_multiple.json',
      success: function(res) {
        console.log("success");
        console.log(res.props);
        that.setState({
          hotels: res.props,
          editMode: false
        });
      }
    });
  },

  _handleRemoveOneInput(idx, event) {
    var arr = this.state.hotels;
    arr.splice(idx, 1);
    this.setState({hotels: arr});
  },

  render: function() {
    if (this.state.editMode) {
      hotels = this.state.hotels.map( (hotel, idx) =>{
        delete_sign = hotel.added ?  (<button onClick={(event) => this._handleRemoveOneInput(idx, event)}> remove</button>) : (<div></div>)
        return (
          <tr key={idx}>
            <td>
              {hotel.id}
            </td>
            <td>
              <input type="text" onChange={(event) => this._handleNameChange(idx, event)} key={idx} value={hotel.name}/>
              {delete_sign}
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
          <button onClick={this._handleSubmitAll}>Submit All</button>
        </div>
      );

    } else {
      hotels = this.state.hotels.map( function(hotel, idx) {
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
