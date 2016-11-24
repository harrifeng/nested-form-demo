var Hotels = React.createClass({
  render: function() {
    hotels = this.props.hotels.map( function(hotel) {
      return (
        <tr key={hotel.id}>
          <td>{hotel.name}</td>
        </tr>
      );
    });
    return (
      <div>
        <h1>Hotels</h1>
        <div id="hotels">
          <table>
            <thead>
              <tr>
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
