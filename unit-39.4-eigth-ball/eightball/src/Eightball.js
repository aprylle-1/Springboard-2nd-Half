import React, { useState, useTransition } from "react";
import './Eightball.css';

const answers = [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
  ]

  const random = (answers) => {
    const length = answers.length;
    const choice = Math.floor(Math.random() * length);
    return choice;
}

const Eightball = ({answers}) => {
    const [color, setColor] = useState("black");
    const [answer, setAnswer] = useState("Think of a question");

    function getNewAnswer() {
        const choice = random(answers);
        const newAnswer = answers[choice].msg;
        const newColor = answers[choice].color;

        setColor(newColor);
        setAnswer(newAnswer);
    }

    function reset () {
        setColor("black");
        setAnswer("Think of a question");
    }

    return (
        <>
        <h1>Magic Eightball -- Click to see the answers to your questions</h1>
        <div id="Eightball" className={color} onClick={getNewAnswer}>
            <div className="Eightball-text">{answer}</div>
        </div>
        <div>
            <button onClick={reset}>Reset</button>
        </div>
        </>
    )
}



export default Eightball;
export { answers };