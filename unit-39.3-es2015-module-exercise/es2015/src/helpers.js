const choice = (items) => {
    const length = items.length;

    const randomNumber = Math.floor(Math.random() * length) - 1;

    return items[randomNumber];
}

const remove = (items, item) => {
    let counter = 0;

    const removed = items.reduce((currItems, currItem, idx, arr)=>{
        if (currItem !== item) {
            currItems.push(currItem)
        }
        
        else if (currItem === item && counter === 0){
            counter += 1;
            return currItems;
        }
        
        else{
            currItems.push(currItem)
        }
        return currItems;
    }, [])
    
    return removed;
}

export { choice, remove };