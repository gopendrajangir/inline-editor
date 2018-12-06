import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const inlineEditor = {
  backgroundColor: 'white',
  boxShadow: '0 0 5px silver',
  borderRadius: '3px',
  margin: '30px 20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const textToShow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 10px',
};

const editable = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '5px',
  margin: '0px',
  height: '100%',
  width: '100%',
};

const button = {
  width: '80px',
  height: 'auto',
  border: '1px solid #666',
  margin: '0px',
  marginRight: '5px',
  padding: '5px',
  borderRadius: '2px',
  cursor: 'pointer',
};

const textArea = {
  width: '100%',
  marginBottom: '5px',
  paddingLeft: '5px',
  resize: 'none',
  flexGrow: 1,
  fontFamily: 'sans-serif',
  paddingTop: '10px',
};

const anchors = {
  marginLeft: '20px',
  textDecoration: 'none',
};

const edit = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10px',
  textDecoration: 'none',
};

const text = {
  height: '100%',
  flexWrap: 'wrap',
};

/* eslint-disable react/prefer-stateless-function */
export class InlineEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previousText: this.props.text,
      currentText: this.props.text,
      edit: false,
      isTruncable: false,
      isTruncated: false,
    };

    this.editText = this.editText.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.truncateText = this.truncateText.bind(this);
  }

  editText() {
    return event => {
      event.preventDefault();
      this.setState({ edit: true });
    };
  }

  showMore() {
    return event => {
      event.preventDefault();
      this.setState({ isTruncated: false});
    };
  }

  showLess() {
    return event => {
      event.preventDefault();
      this.setState({ isTruncated: true});
    };
  }

  onChange() {
    return event => {
      this.setState({ currentText: event.target.value });
    };
  }

  onCancel() {
    return () => {
      this.setState({
        currentText: this.state.previousText,
        edit: false,
      });
    };
  }

  onSave() {
    return () => {
      this.props.onSave();
      this.setState({
        previousText: this.state.currentText,
        edit: false,
        isTruncated: this.isTruncable(this.state.currentText) && this.props.truncate,
        isTruncable: this.isTruncable(this.state.currentText),
      });
    };
  }

  truncateText(text) {
    this.isTruncated = true;
    return `${text.substring(0, this.props.charLimit)}...`;
  }

  isTruncable(text) {
    if (text.length > this.props.charLimit) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (this.isTruncable(this.state.previousText) && this.props.truncate) {
      this.setState({ isTruncated: true, isTruncable: true});
    }
  }

  render() {
    return (
      <div
        style={{
          ...inlineEditor,
          minHeight: this.state.edit ? 'auto' : `${this.props.height}px`,
          width: `${this.props.width}px`,
        }}
      >
        {this.state.edit ? (
          <div style={{ ...editable }}>
            <textarea
              onChange={this.onChange()}
              autoFocus
              value={this.state.currentText}
              style={{ ...textArea, height: `${this.props.height}px` }}
            />
            <button
              type="button"
              onClick={this.onCancel()}
              style={{ ...button }}
            >
              Cancel
            </button>
            <button type="button" onClick={this.onSave()} style={{ ...button }}>
              Save
            </button>
          </div>
        ) : (
          <div style={{ ...textToShow, width: '100%', height: '100%' }}>
            <p style={{ ...text }}>
              {this.props.truncate && this.state.isTruncated
                ? this.truncateText(this.state.previousText)
                : this.state.previousText}
              {this.props.truncate && this.state.isTruncable && this.state.isTruncated? (
                  <a style={{ ...anchors }} onClick={this.showMore()} href="/">
                    Show More
                  </a>
              ) : null}
              {this.props.truncate &&
              this.state.isTruncable &&
              !this.state.isTruncated ? (
                <a style={{ ...anchors }} onClick={this.showLess()} href="/">
                  Show Less
                </a>
              ) : null}
            </p>
            <a style={{ ...edit }} onClick={this.editText()} href="/">
              Edit
            </a>
          </div>
        )}
      </div>
    );
  }
}

InlineEditor.defaultProps = {
  height: 50,
  width: 500,
  text: 'No text yet',
  truncate: false,
  charLimit: 20,
};

InlineEditor.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  text: PropTypes.string,
  truncate: PropTypes.bool,
  charLimit: PropTypes.number,
};

export default connect(
  null,
  null,
)(InlineEditor);
