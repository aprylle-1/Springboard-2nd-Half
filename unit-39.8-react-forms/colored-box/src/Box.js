function Box ({deleteBox, idx, backgroundColor, height, width}) {
    const styles = {
        backgroundColor : backgroundColor,
        width : width + "px",
        height : height + "px"
    }

    function onClickX (e) {
        const idx = e.target.parentElement.dataset.idx
        deleteBox(idx)
    }

    return (
        <div data-idx = {idx} className="Box" style={styles}>
            <button onClick={onClickX}>X</button>
        </div>
    )
}

export default Box;