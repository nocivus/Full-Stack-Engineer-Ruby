class Comic extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    size: React.PropTypes.string
  };

  renderThumbnail() {
    var thumb = this.props.data.thumbnail
    var url = thumb.path + "/" + this.props.size + "." + thumb.extension;
    return <img className="circle" src={url} />;
  }

  renderTitle() {
    return ;
  }

  render() {
    return <div className="comic">
      {this.renderThumbnail()}
    </div>;
  }
}