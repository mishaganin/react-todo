import React, { Component } from 'react';

import './item-status-filter.css';


export default class ItemStatusFilter extends Component {
  render() {
    const {
      onToggleAllFilter, 
      onToggleActiveFilter, 
      onToggleDoneFilter,
      allClassName,
      activeClassName,
      doneClassName } = this.props;
    return (
      <div className="btn-group">
        <button type="button"
                className={allClassName}
                onClick={onToggleAllFilter}>All</button>
        <button type="button"
                className={activeClassName}
                onClick={onToggleActiveFilter}>Active</button>
        <button type="button"
                className={doneClassName}
                onClick={onToggleDoneFilter}>Done</button>
      </div>
    );
  }
}
