var Hotels = React.createClass({
  getInitialState: function() {
    return {
      hotels: this.props.employees,
      hotel: {
        name: ''
      },
      errors: {}
    };
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
                  <input type="text"/>
                </td>
                <td>
                  <button onClick={this.handleAddHotel}> Add This Hotel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});
