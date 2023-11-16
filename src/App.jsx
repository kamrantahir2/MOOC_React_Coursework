import "./App.css";
import { useState } from "react";

const Header = (props) => {
  console.log(props);
  return <h1>{props.courses}</h1>;
};

const Part = (props) => {
  return <p>{props.part}</p>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} />
      <Part part={props.course.parts[1].name} />
      <Part part={props.course.parts[2].name} />
    </div>
  );
};

const Footer = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>The app is used by pressing the buttons</div>;
  }
  return <div>Button press history: {allClicks.join(" ")}</div>;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    // We create a variable below to avoid the differences with asynchrounisity
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const setToValue = (value) => {
    setCounter(value);
  };

  const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courses={course.name}></Header>
      <Content course={course} />
      <Footer course={course}></Footer>
      <Display counter={counter} />
      <div>
        <Button onClick={() => setToValue(counter + 1)} text="Increment" />
        <Button onClick={() => setToValue(counter - 1)} text="Decrement" />
        <Button onClick={() => setToValue(0)} text="Reset" />
      </div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="Left" />
        <Button onClick={handleRightClick} text="Right" />
        {right}
        <History allClicks={allClicks} />
        <p>Total: {total}</p>
      </div>
    </div>
  );
};

export default App;
