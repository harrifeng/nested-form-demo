var Hotel = React.createClass({
  getInitialState: function() {
    return {
      hotel: this.props.hotel
    }
  },

  render: function() {
    return (
      <tr>
        <td>{ this.state.hotel.id } </td>
        <td>{ this.state.hotel.name } </td>
      </tr>
    );
  }
});
