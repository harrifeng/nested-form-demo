var Hotel = React.createClass({
  getInitialState() {
    return {
      hotel: this.props.hotel
    }
  },

  render() {
    return (
      <tr>
        <td>{ this.state.hotel.id } </td>
        <td>{ this.state.hotel.name } </td>
      </tr>
    );
  }
});
