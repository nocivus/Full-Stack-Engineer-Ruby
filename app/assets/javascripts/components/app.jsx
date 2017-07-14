class App extends React.Component {
  static proptTypes = {
    logo: React.PropTypes.string
  };

  render() {
    return <div className="container">
      <Header logo={this.props.logo} />
      <ComicsList / >
    </div>;
  }
}