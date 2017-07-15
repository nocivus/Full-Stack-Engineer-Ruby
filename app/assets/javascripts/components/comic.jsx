class Comic extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    size: React.PropTypes.string
  };

  state = { upvoted: this.props.data.upvoted };

  componentDidMount() {
    var comp = this;
    var thisObject = $("#comic_" + comp.props.data.id);
 
    this.setupOverlay();

    // Hover the hearts
    thisObject.find(".heart").hover(function(e) {
      $(e.target).addClass("heart-hover");
      $(e.target).removeClass("heart-off");
      $(e.target).removeClass("heart-on");
    }, function(e) {
      $(e.target).removeClass("heart-hover");
      if (comp.state.upvoted) {
        $(e.target).addClass("heart-on");
      } else {
        $(e.target).addClass("heart-off");
      }
    });

    // Clicking the heart up or downvotes
    thisObject.find(".heart").click(function(e) {
      if (comp.state.upvoted) {
        comp.updownvote(false, comp.props.data.id);
      } else {
        comp.updownvote(true, comp.props.data.id);
      }
    });
  }

  updownvote(upvote, id) {
    var comp = this;
    var url = upvote == true ? Routes.upvote_path(id) : Routes.downvote_path(id);
    $.post({
      url: url,
      type: "POST",
      success: function(data) {
        if (data.result == "success") {
          comp.setState({ upvoted: upvote });
        }
      }
    });
  }

  componentDidUpdate() {
    this.setupOverlay();
  }

  setupOverlay() {
    var comp = this;
    var thisObject = $("#comic_" + comp.props.data.id);

    // Hover the overlay if not upvoted, otherwise show
    if (comp.state.upvoted) {
      thisObject.find(".overlay").show();
      thisObject.unbind("mouseenter mouseleave");
    } else {
      thisObject.hover(function(e) {
        thisObject.find(".overlay").show();
      }, function(e) {
        thisObject.find(".overlay").hide();
      });
    }
  }

  getHeartClass() {
    if (this.state.upvoted) {
      return "heart-on";
    }
    return "heart-off";
  }

  renderThumbnail() {
    var thumb = this.props.data.thumbnail
    var url = thumb.path + "/" + this.props.size + "." + thumb.extension;
    return <img src={url} />;
  }

  renderYear() {
    var year;
    for (var i=0; i<this.props.data.dates.length; i++) {
      year = moment(this.props.data.dates[i].date, moment.ISO_8601).format('YYYY');
      if (year <= moment().year()) {
        break;
      }
    }
    if (!year) {
      return null;
    }
    return <div className="year">{year}</div>;
  }

  render() {
    return <div className="comic" id={"comic_" + this.props.data.id}>
      <div className="overlay">
        <div className={"heart " + this.getHeartClass()}></div>
        <div className="title">{this.props.data.title}</div>
        <div className="notes">
          <div className="issue-number">#{this.props.data.issueNumber}</div>
          {this.renderYear()}
        </div>
      </div>
      {this.renderThumbnail()}
    </div>;
  }
}