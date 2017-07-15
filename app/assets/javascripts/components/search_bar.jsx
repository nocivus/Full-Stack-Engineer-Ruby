class SearchBar extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    onPerformSearch: React.PropTypes.func,
    cssClasses: React.PropTypes.string,
    id: React.PropTypes.string
  };

  state = { search_query: "" };

  _handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.setState({ search_query: event.target.value }, function() {
        this.props.onPerformSearch(this.state.search_query);
      });
    }
  }

  setSearchValue(newValue) {
    $('#search_query_' + this.props.id).val(newValue);
  }

  render() {
    return <input id="search" type="search" className="validate search-bar"
                  placeholder={this.props.placeholder}
                  onKeyPress={this._handleKeyPress.bind(this)} />;
  }
}