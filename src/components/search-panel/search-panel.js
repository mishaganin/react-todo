import React from 'react';

import './search-panel.css';

export default class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }
  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={(event) => {
                  this.props.updateValue(event.target.value);
                }} />
    );
  }
};
