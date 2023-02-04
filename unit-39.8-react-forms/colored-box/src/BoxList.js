import { useState } from "react";
import NewBoxForm from "./NewBoxForm";
import Box from "./Box"
import { v4 } from 'uuid';

function BoxList () {

    const sampleBoxList = [
        {
          backgroundColor : "red",
          height : 200,
          width : 300
        },
        {
          backgroundColor : "green",
          height : 100,
          width : 100
        }
      ];
    
    let [boxList, setBoxList] = useState(sampleBoxList);

    function createBox (newBoxData) {
        setBoxList(boxList => { return [...boxList, newBoxData]})
    }

    function deleteBox (deleteIdx) {
        setBoxList(boxList.filter((box, idx)=>{
            return idx !== parseInt(deleteIdx);
        }))
    }

    return (
        <div className="boxList">
        <NewBoxForm createBox={createBox}/>   
        {boxList.map((box, idx) => <Box
        key={v4()}
        deleteBox={deleteBox}
        idx = {idx}
        backgroundColor={box.backgroundColor} 
        height={box.height} 
        width={box.width}/>)}
        </div>
    )
}

export default BoxList;