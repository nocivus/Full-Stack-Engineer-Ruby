class ComicsList extends React.Component {
  static propTypes = {
    loadingImage: React.PropTypes.string
  };

  state = { page: 1, loading: false };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var comp = this;
    comp.setState({ page: comp.state.page, loading: true }, function() {

      var params = { page: comp.state.page, per_page: 15 };
      if (comp.state.searchQuery) {
        params.search_query = comp.state.searchQuery;
      }

      $.post({
        url: Routes.comics_path(),
        type: "GET",
        data: params,
        success: function(data) {
          console.log(data);
          comp.setState({ page: data.metadata.page, results: data, loading: false });
        }
      });
    });
  }

  _handleOnPaginate(pageNumber) {
    var comp = this;
    // Changes  the state pageNumber value and call
    comp.setState({ page: pageNumber, results: null }, function() {
      comp.loadData();
    });
  }

  onSearchPerformed(searchQuery) {
    var comp = this;
    comp.setState({ searchQuery: searchQuery }, function() {
      comp.loadData();
    });
  }

  renderComics(data) {
    var comics = [];
    data.map(function(item, index) {
      comics.push(<Comic key={index} data={item} size="portrait_xlarge" />);
    });
    return comics;
  }

  render() {
    if (this.state.loading) {
      return <div className="comics-list"><LoadingBar loadingImage={this.props.loadingImage} /></div>;
    }
    if (!this.state.results) {
      return <div className="comics-list">No results.</div>;
    }
    var results = this.state.results;
    var currentPage = parseInt(results.metadata.page);
    var perPage = parseInt(results.metadata.per_page);
    var totalPages = parseInt(results.metadata.total_count / results.metadata.per_page);
    return <div className="comics-list">
      <div className="collection">
        {this.renderComics(results.data)}
      </div>
      <div className="centered">
        <PaginatorSection totalPages={totalPages} perPage={perPage}
                          currentPage={currentPage} onPaginate={this._handleOnPaginate.bind(this)} />
      </div>
    </div>;
  }
}