class Header extends React.Component {
  static propTypes = {
    logo: React.PropTypes.string,
    onSearchPerformed: React.PropTypes.func
  };

  render() {
    return <div className="header">
      <img className="logo centered" src={this.props.logo} />
      <br />
      <SearchBar placeholder="Search for Marvel characters or teams..." 
                 onPerformSearch={this.props.onSearchPerformed.bind(this)} />
    </div>;
  }
}