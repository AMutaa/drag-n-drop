import React, { Component } from "react";
import CreatePiece from "./CreatePiece";
import Timer from "./Timer";

const imagesArray = Array.from({ length: 9 }, (_, i) => i);

export default class MainPage extends Component {
  state = {
    pieces: [],
    unsolved: [],
    solved: [],
    start: false,
    increaseTime: false,
  };

  componentDidMount() {
    const pieces = imagesArray.map((i) => ({
      image: require(`../assets/${i + 1}.png`),
      position: i,
      board: "unsolved",
      top: `${Math.floor(Math.random() * 80)}px`,
      left: `${Math.floor(Math.random() * 320)}px`,
      zIndex: `${Math.floor(Math.random() * 10)}`,
    }));

    this.setState({
      pieces,
      unsolved: [...pieces],
      solved: [...Array(9)],
    });
  }

  handleDragStart = (e, position) => {
    e.stopPropagation();
    this.setState({ start: true });
    const dt = e.dataTransfer;
    dt.setData("text/plain", position);
    console.log("position ----->", position);
    dt.effectAllowed = "move";
  };

  handleDragOver = (e, index, targetName) => {
    e.preventDefault();
  };

  handleDrop = (e, index, dropTarget) => {
    console.log(index);
    e.preventDefault();
    console.log(this.state);
    let dropTargetContainer = this.state[dropTarget];

    if (dropTargetContainer[index]) return;
    console.log("target[index] ---->", dropTargetContainer[index]);

    const piecePosition = e.dataTransfer.getData("text");
    console.log("piece position ---->", piecePosition);

    if (parseInt(piecePosition) !== index) {
      this.setState({
        increaseTime: true,
      });
    } else {
      this.setState({
        increaseTime: false,
      });
    }
    const pieceData = this.state.pieces.find(
      (p) => p.position === parseInt(piecePosition)
    );

    const origin = this.state[pieceData.board];

    if (dropTarget === pieceData.board) {
      dropTargetContainer = origin;
    }

    origin[origin.indexOf(pieceData)] = undefined;
    dropTargetContainer[index] = pieceData;
    pieceData.board = dropTarget;

    this.setState({
      [pieceData.board]: origin,
      [dropTarget]: dropTargetContainer,
    });
  };

  handleClick = (e) => {
    console.log(this.state);
    this.setState(
      {
        start: true,
      },
      () => console.log(this.state)
    );
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="item" id="timer">
          <Timer
            increaseTime={this.state.increaseTime}
            start={this.state.start}
          />
        </div>
        <ol className="item" id="puzzle-container">
          {this.state.solved.map((piece, index) => (
            <CreatePiece
              key={index}
              index={index}
              piece={piece}
              handleDragStart={this.handleDragStart}
              handleDragOver={this.handleDragOver}
              handleDrop={this.handleDrop}
              boardName="solved"
            />
          ))}
        </ol>
        <ul className="item" id="piece-container">
          {this.state.unsolved.map((piece, index) => (
            <CreatePiece
              key={index}
              index={index}
              piece={piece}
              handleDragStart={this.handleDragStart}
              handleDragOver={this.handleDragOver}
              handleDrop={this.handleDrop}
              boardName="unsolved"
            />
          ))}
        </ul>
      </div>
    );
  }
}
