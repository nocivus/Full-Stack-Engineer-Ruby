/*
 * Pagination section, that contains many links to paginate data.
 *
 * currentPage: The current page to display
 * totalPages: The total number of pages that are available to paginate.
 * perPage: Number of records per page
 * onPaginate: The function called when a pagination link is clicked.
 */
class PaginatorSection extends React.Component {
  static propTypes = {
    currentPage: React.PropTypes.number,
    totalPages: React.PropTypes.number,
    perPage: React.PropTypes.number,
    onPaginate: React.PropTypes.func
  };

  _handleOnClick(pageNumber) {
    this.props.onPaginate(pageNumber);
  }

  paginationLink(index, text, page, perPage, disabled=false) {
    var className = "waves-effect";
    if (this.props.currentPage == page) {
      className = "active";
    }
    if (disabled) {
      className = "disabled";
    }
    return <li key={index} className={className}>
            {
              className == "disabled" ? (
                <PaginatorLink text={text} pageNumber={page} />
              ) : (
                <PaginatorLink text={text} pageNumber={page} onPaginatorLinkClick={this._handleOnClick.bind(this)} />
              )
            }
           </li>;
  }

  generateLinks(page, perPage, totalPages, maxLinks) {
    var links = [];
    var index = 0;

    links.push(this.paginationLink(index, "First", 1, perPage, page == 1));
    index++;
    links.push(this.paginationLink(index, "<", page - 1, perPage, page == 1));
    index++;

    startPage = page < maxLinks ? 1 : page - Math.ceil(maxLinks / 2);
    for (var p=startPage; p<totalPages+1; p++) {
      links.push(this.paginationLink(index, p, p, perPage));
      index++;
      if (index-2 >= maxLinks) {
        break;
      }
    }

    links.push(this.paginationLink(index, ">", page + 1, perPage, page >= totalPages));
    index++;
    links.push(this.paginationLink(index, "Last", totalPages, perPage, page >= totalPages));
    index++;

    return links;
  }

  render() {
    // If there is more than one page
    var comp = this;
    if (comp.props.totalPages > 1) {
     return (
        // Render the links list
        <ul className="pagination flow-text">
          {comp.generateLinks(comp.props.currentPage, comp.props.perPage, comp.props.totalPages, 5)}
        </ul>
      );
    } else {
      return <div>&nbsp;</div>
    }
  }
}
