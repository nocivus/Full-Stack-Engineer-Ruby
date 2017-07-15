class LoadingBar extends React.Component {
  static propTypes = {
    loadingImage: React.PropTypes.string
  };

  render() {
    return <img className="loading" src={this.props.loadingImage} />;
  }
}
