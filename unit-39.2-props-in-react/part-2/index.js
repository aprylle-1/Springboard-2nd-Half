const App = () => {
    return (
        <div>
            <Tweet username="adablaza" name="Aprylle" date={new Date(Date.now()).toLocaleString()} message="This is a sample tweet"/>
            <Tweet username="adablaza2" name="Aprylle Joy" date={new Date(Date.now()).toLocaleString()} message="This is another sample tweet"/>
            <Tweet username="adablaza3" name="Aprylle Ablaza" date={new Date(Date.now()).toLocaleString()} message="This is the last sample tweet"/>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));