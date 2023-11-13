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

function App() {
  const [counter, setCounter] = useState(0);
  console.log("rendering with counter value", counter);

  const incerement = () => {
    console.log("increasing, value before", counter);
    setCounter((prev) => (prev += 1));
  };

  const reset = () => {
    console.log("resetting to zero, value before", counter);
    setCounter(0);
  };

  const decrement = () => {
    console.log("decreasing, value before", counter);
    setCounter((prev) => (prev -= 1));
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
        <Button onClick={incerement} text="Increment" />
        <Button onClick={decrement} text="Decrement" />
        <Button onClick={reset} text="Reset" />
      </div>
    </div>
  );
}

export default App;
