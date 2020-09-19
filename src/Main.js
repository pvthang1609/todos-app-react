import React, { Component } from "react";
import Block from "./components/block";
import tickall from "./img/Tick-all.svg";

const classnames = require("classnames");

class Main extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        // { title: "learning advance Javascript", isDone: false },
        // { title: "learning react", isDone: false },
        // { title: "learning react-native", isDone: false },
      ],
      display: "all", //3 trang thai: all- active- complete
    };
    this.inputElement = React.createRef();      // create reference to varible inputElement
    
    this.numTodoNotDone = 0;
    this.statusItem = this.statusItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.modeDisplay = this.modeDisplay.bind(this);
    this.filterTodos = this.filterTodos.bind(this);
  }
  componentDidMount() {           // component was mounted then run line code
    this.inputElement.current.focus()   
  }
  onItemClickTick(todo) {
    const isDone = todo.isDone;
    const { todos } = this.state;
    let index = this.state.todos.indexOf(todo);
    this.setState({
      todos: [
        ...todos.slice(0, index),
        {
          ...todo,
          isDone: !isDone,
        },
        ...todos.slice(index + 1),
      ],
      newTodo: "",
    });
  }
  onItemClickClear(todo) {
    const { todos } = this.state;
    let index = this.state.todos.indexOf(todo);
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)],
      newTodo: "",
    });
  }
  handleChange(event) {
    if (event.keyCode === 13) {
      this.setState({
        todos: [
          ...this.state.todos.slice(0),
          { title: event.target.value, isDone: false },
        ],
      });
      event.target.value = "";
    }
  }
  statusItem() {
    this.numTodoNotDone = 0;
    this.state.todos.forEach((todo) => {
      if (!todo.isDone) {
        this.numTodoNotDone = this.numTodoNotDone + 1;
      }
    });
  }
  modeDisplay(mode) {
    this.setState({
      display: mode,
    });
  }
  filterTodos() {
    switch (this.state.display) {
      case "active":
        return this.state.todos.filter((todo) => todo.isDone === false);
      case "complete":
        return this.state.todos.filter((todo) => todo.isDone === true);
      default:
        return this.state.todos.filter((todo) => todo);
    }
  }
  clearComplete() {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.isDone === false),
    });
  }
  tickAll() {
    let newState = this.state.todos.slice(0)
    newState.forEach(todo => {
      todo.isDone = true
    })
    this.setState(
      {
        todos: newState
      }
    )
  }
  render() {
    this.statusItem();
    return (
      <div className="container">
        <div className="header">
          <div className="header-tick-all">
            <img
              src={tickall}
              alt="none"
              className={classnames("tick-all-icon", {
                "tick-all-icon-active": this.numTodoNotDone === 0 && this.state.todos.length !== 0,
              })}
              onClick={() => this.tickAll()}
            />
          </div>
          <div className="header-text">
            <p>Todos-list-app-react</p>
          </div>
        </div>
        {
          this.filterTodos().map((todo, index) => {
            return (
              <Block
                onclick_tick={() => this.onItemClickTick(todo)}
                onclick_clear={() => this.onItemClickClear(todo)}
                key={index}
                todo={todo}
              />
            );
          }) // map create new arr, for each is not
        }
        <p className={classnames('statusNotthing', {'statusNotthing-display': this.state.todos.length === 0})}>Nothing todo, create now..</p>
        <input
          type="text"
          className="input"
          placeholder="Create new todo.."
          onKeyUp={this.handleChange}
          ref={this.inputElement}
        ></input>
        <div className="block-button">
          <div className="status">{`${this.numTodoNotDone} item left`}</div>
          <button
            className={classnames("button", {
              "button-active": this.state.display === "all",
            })}
            onClick={() => this.modeDisplay("all")}
          >
            All
          </button>
          <button
            className={classnames("button", {
              "button-active": this.state.display === "active",
            })}
            onClick={() => this.modeDisplay("active")}
          >
            Active
          </button>
          <button
            className={classnames("button", {
              "button-active": this.state.display === "complete",
            })}
            onClick={() => this.modeDisplay("complete")}
          >
            Complete
          </button>
          <button
            className={classnames("button", "button-clear", {
              "button-clear-active": !(
                this.numTodoNotDone === this.state.todos.length
              ),
            })}
            onClick={() => this.clearComplete()}
          >
            Clear complete
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
