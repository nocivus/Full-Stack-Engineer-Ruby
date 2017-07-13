/*
 * Pagination link that notifies when the user clicks on it
 *
 * onPaginatorLinkClick: Function to be called when this component
 *                       is clicked.
 */
class PaginatorLink extends React.Component {
  static propTypes = {
    onPaginatorLinkClick: React.PropTypes.func
  };

  _handleOnClick(e) {
    e.preventDefault();
    if (this.props.onPaginatorLinkClick) {
      this.props.onPaginatorLinkClick(this.props.pageNumber);
    }
  }

  render() {
    return <a href="#" onClick={this._handleOnClick.bind(this)}>{this.props.text}</a>;
  }
}
