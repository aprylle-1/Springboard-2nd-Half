const Tweet = ({username, name, date, message}) =>{
    return (
        <ul>
            <h3>Tweet!</h3>
            <li>{username}</li>
            <li>{name}</li>
            <li>{date}</li>
            <li>{message}</li>
        </ul>
    )
}