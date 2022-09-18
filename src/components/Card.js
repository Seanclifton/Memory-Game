function Card({ val, suit, col, handleClick, found }) {
    //renders if found value is equal to true and shows front face of card
    if (found === true) {
        return (
            <div className={col} onClick={handleClick} >
                <div className="val1">{val}</div>
                <div className="val2">{val}</div>
                <div className='suit'>{suit}</div>
                <div className="val3">{val}</div>
                <div className="val4">{val}</div>
            </div>
        );
    } else {
        //when found equals false a blank faced card shows which still contains the values in an onClick event
        return (
        <div className="blank" onClick={handleClick}>
        </div>
        );
    }
}
export default Card;