import React from "react";

export default function CreatePiece(props) {
  const {
    index,
    piece,
    handleDragStart,
    handleDragOver,
    handleDrop,
    boardName,
  } = props;

  const otherStyle = piece
    ? piece.board === "unsolved"
      ? true
      : false
    : false;

  const sectionStyle = piece
    ? {
        position: otherStyle ? "absolute" : "static",
        top: otherStyle ? piece.top : "",
        left: otherStyle ? piece.left : "",
        width: "164px",
        height: "164px",
        border: `${otherStyle ? "2px" : 0} solid #18ace7`,
        zIndex: otherStyle ? piece.zIndex : "",
      }
    : { backgroundColor: "white" };

  return (
    <li
      index={index}
      style={sectionStyle}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDrop(e, index, boardName)}
    >
      {piece && (
        <img
          index={index}
          draggable
          onDragStart={(e) => handleDragStart(e, piece.position)}
          className="puzzle-item"
          src={piece.image}
          alt={piece.position}
        />
      )}
    </li>
  );
}
