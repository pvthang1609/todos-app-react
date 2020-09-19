import React, { Component } from "react";
import tick from "../img/Tick.svg";
import untick from "../img/Un-Tick.svg";
import clear from "../img/Clear.svg";

const classnames = require("classnames");

class Block extends Component {
  render() {
    let { todo, onclick_tick, onclick_clear, ondoubleclick, onkeyup } = this.props;
    let url = untick;
    if (todo.isDone) {
      url = tick;
    }
    return (
      <div className={classnames("block", { "block-done": todo.isDone })}>
        <img
          onClick={onclick_tick}
          src={url}
          alt="none"
          className={classnames("tick-icon", { "tick-icon-done": todo.isDone })}
        />
        <div>
          <input
            type="text"
            className={classnames("input-edit", {"input-edit-active": todo.isEdit})}
            placeholder='Edit todo...'
            onKeyUp={onkeyup}
          ></input>
          <p onDoubleClick={ondoubleclick} className={classnames({"p-unactive": todo.isEdit})}>{todo.title}</p>
        </div>
        <img
          onClick={onclick_clear}
          src={clear}
          alt="none"
          className="clear-icon"
        />
      </div>
    );
  }
}
export default Block;
