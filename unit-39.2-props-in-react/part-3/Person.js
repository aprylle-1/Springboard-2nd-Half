const Person = ({name, age, hobbies}) => {
    const vote = age >= 18? "please go vote!" : "you must be 18"
    const displayName = name.length > 8 ? name.substring(0, 6) : name
    return (
        <div>
            <p>Learn some more information about this person</p>
            <div>Name : {displayName}</div>
            <div>Age : {age}</div>
            <div>{vote}</div>
            <ul>
                {hobbies.map(hobby => <li>{hobby}</li>)}
            </ul>
        </div>
    )
}