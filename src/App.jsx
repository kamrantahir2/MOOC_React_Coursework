import "./App.css";

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

function App() {
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
    </div>
  );
}

export default App;
