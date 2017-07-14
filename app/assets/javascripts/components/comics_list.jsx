class ComicsList extends React.Component {
  static propTypes = {};

  state = { page: 1, loading: false };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var comp = this;
    comp.setState({ page: comp.state.page, loading: true });
    $.post({
      url: Routes.comics_path(),
      type: "GET",
      data: { page: comp.state.page, per_page: 15 },
      success: function(data) {
        console.log(data);
        comp.setState({ page: data.metadata.page, results: data, loading: false });
      }
    });
  }

  _handleOnPaginate(pageNumber) {
    // Changes  the state pageNumber value and call
    this.setState({ page: pageNumber, results: null }, function() {
      this.loadData();
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
      return <LoadingBar />;
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