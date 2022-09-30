import "./Card.css";


//flipped classname only active when found value is truthy. this allows front and back to rotate 90 degrees out of view looking like a card flip.
function Card({ val, suit, col, handleClick, found }) {
  return (
    <div className="card" onClick={handleClick}>
      <div className={found ? "flipped" : ""}>
        <div className={col}>
          <div className="val1">{val}</div>
          <div className="val2">{val}</div>
          <div className="suit">{suit}</div>
          <div className="val3">{val}</div>
          <div className="val4">{val}</div>
        </div>
        <div className="back"></div>
      </div>
    </div>
  );
}
export default Card;