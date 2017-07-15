class App extends React.Component {
  static proptTypes = {
    logo: React.PropTypes.string,
    loadingImage: React.PropTypes.string,
  };

  _handleSearchPerformed(searchQuery) {
    this.refs.comics.onSearchPerformed(searchQuery);
  }

  render() {
    return <div className="container">
      <Header logo={this.props.logo} onSearchPerformed={this._handleSearchPerformed.bind(this)} />
      <ComicsList ref="comics" loadingImage={this.props.loadingImage} />
    </div>;
  }
}