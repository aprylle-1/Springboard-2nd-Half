const App = () => {
    return (
        <div>
            <FirstComponent />
            <NamedComponent />
            <NamedComponent name="Valyrae"/>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));