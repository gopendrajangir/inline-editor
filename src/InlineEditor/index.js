import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 0 0 5px silver;
  border-radius: 3px;
  margin: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => (props.edit ? 'auto' : `${props.height}px`)};
  width: ${props => `${props.width}px`};
`;

const TextToShow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  height: 100%;
  width: 100%;
`;

const Editor = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;
  margin: 0px;
  height: 100%;
  width: 100%;
`;

const Button = styled.button`
  width: 80px;
  height: auto;
  border: 1px solid #666;
  margin: 0px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 5px;
  padding-left: 5px;
  resize: none;
  flex-grow: 1;
  font-family: sans-serif;
  padding-top: 10px;
  height: ${props => `${props.height}px`};
`;

const Anchor = styled.a`
  margin-left: 20px;
  text-decoration: none;
`;

const EditAnchor = styled.a`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  text-decoration: none;
`;

const Text = styled.p`
  height: 100%;
`;

/* eslint-disable react/prefer-stateless-function */
export default class InlineEditor extends React.PureComponent {
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
      this.setState({ isTruncated: false });
    };
  }

  showLess() {
    return event => {
      event.preventDefault();
      this.setState({ isTruncated: true });
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
        isTruncated:
          this.isTruncable(this.state.currentText) && this.props.truncate,
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
      this.setState({ isTruncated: true, isTruncable: true });
    }
  }

  render() {
    return (
      <Wrapper
        edit={this.state.edit}
        height={this.props.height}
        width={this.props.width}
      >
        {this.state.edit ? (
          <Editor>
            <TextArea
              onChange={this.onChange()}
              autoFocus
              value={this.state.currentText}
              height={this.props.height}
            />
            <Button onClick={this.onCancel()}> Cancel </Button>
            <Button onClick={this.onSave()}> Save </Button>
          </Editor>
        ) : (
          <TextToShow>
            <Text>
              {this.props.truncate && this.state.isTruncated
                ? this.truncateText(this.state.previousText)
                : this.state.previousText}
              {this.props.truncate &&
              this.state.isTruncable &&
              this.state.isTruncated ? (
                <Anchor onClick={this.showMore()} href="/">
                  Show More
                </Anchor>
              ) : null}
              {this.props.truncate &&
              this.state.isTruncable &&
              !this.state.isTruncated ? (
                <Anchor onClick={this.showLess()} href="/">
                  Show Less
                </Anchor>
              ) : null}
            </Text>
            <EditAnchor onClick={this.editText()} href="/">
              Edit
            </EditAnchor>
          </TextToShow>
        )}
      </Wrapper>
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
