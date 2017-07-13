class Header extends React.Component {
  static propTypes = {
    logo: React.PropTypes.string
  };

  render() {
    return <div className="header">
      <img className="logo centered" src={this.props.logo} />
      <br />
      <SearchBar />
    </div>;
  }
}