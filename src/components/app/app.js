import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    value: '',
    allFilter: true,
    activeFilter: false,
    doneFilter: false,
    allClassName: 'btn btn-info',
    activeClassName: 'btn btn-outline-secondary',
    doneClassName: 'btn btn-outline-secondary'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      };
    });

  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem,
      [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  
  updateValue = (inputValue) => {
    this.setState({value: inputValue});
  }

  onToggleAllFilter = () => {
    this.setState({
      allFilter: true,
      activeFilter: false,
      doneFilter: false,
      allClassName: 'btn btn-info',
      activeClassName: 'btn btn-outline-secondary',
      doneClassName: 'btn btn-outline-secondary'
    })
  }

  onToggleActiveFilter = () => {
    this.setState({
      allFilter: false,
      activeFilter: true,
      doneFilter: false,
      allClassName: 'btn btn-outline-secondary',
      activeClassName: 'btn btn-info',
      doneClassName: 'btn btn-outline-secondary'
    })
  }

  onToggleDoneFilter = () => {
    this.setState({
      allFilter: false,
      activeFilter: false,
      doneFilter: true,
      allClassName: 'btn btn-outline-secondary',
      activeClassName: 'btn btn-outline-secondary',
      doneClassName: 'btn btn-info'
    })
  }
  
  render() {
    const { todoData } = this.state;
    const doneCount = todoData
                      .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel updateValue={this.updateValue}/>
          <ItemStatusFilter 
            onToggleAllFilter={this.onToggleAllFilter}
            onToggleActiveFilter={this.onToggleActiveFilter}
            onToggleDoneFilter={this.onToggleDoneFilter}
            allClassName={this.state.allClassName}
            activeClassName={this.state.activeClassName}
            doneClassName={this.state.doneClassName}/>
        </div>

        <TodoList
          todos={todoData}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          value={this.state.value}
          allFilter={this.state.allFilter}
          activeFilter={this.state.activeFilter}
          doneFilter={this.state.doneFilter}
        />

        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};
