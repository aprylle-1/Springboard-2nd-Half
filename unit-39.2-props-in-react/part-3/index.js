const App = () => {
    return (
        <div>
            <Person name="Aprylle" age={26} hobbies = {["video games"]}/>
            <Person name="Gary" age={18} hobbies = {["video games", "eating"]}/>
            <Person name="Bobbiedfsfsdfdfdsfdsf" age={15} hobbies = {["cooking","video games", "eating"]}/>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));