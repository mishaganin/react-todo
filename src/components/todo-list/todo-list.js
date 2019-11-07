import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css';

export default class TodoList extends React.Component {
  render() {
    const { todos, onDeleted,
      onToggleImportant,
      onToggleDone, value, allFilter, activeFilter, doneFilter } = this.props;
    let i = 0;
    
    const elements = todos.map((item) => {
        if (allFilter) {
          if (todos[i].label.includes(value)) {
            const { id, ...itemProps } = item;
            i++;
            return (
              <li key={id} className="list-group-item">
                <TodoListItem
                  {...itemProps }
                  onDeleted={() => onDeleted(id)}
                  onToggleImportant={() => onToggleImportant(id)}
                  onToggleDone={() => onToggleDone(id)}
                />
              </li>
            );
          }
          else {
            i++;
          }
        }
        
        if (activeFilter) {
          if (!todos[i].done) {
            if (todos[i].label.includes(value)) {
              const { id, ...itemProps } = item;
              i++;
              return (
                <li key={id} className="list-group-item">
                  <TodoListItem
                    {...itemProps }
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                  />
                </li>
              );
            }
            else {
              i++;
            }
          }
          else {
            i++;
          }
        }
        
        if (doneFilter) {
          if (todos[i].done) {
            if (todos[i].label.includes(value)) {
              const { id, ...itemProps } = item;
              i++;
              return (
                <li key={id} className="list-group-item">
                  <TodoListItem
                    {...itemProps }
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                  />
                </li>
              );
            }
            else {
              i++;
            }
          }
          else {
            i++;
          }
        }
    });

    return (
      <ul className="list-group todo-list">
        { elements }
      </ul>
    );
  }
};


