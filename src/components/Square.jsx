function Square({value, onClick}) {

    const valueClass = value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : '';
    return (
        <button className={`square ${valueClass}`} onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;