import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = (props) => {
  return (
    <div className="container mt-5">
      <Form onSubmit={props.handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </Form.Group>
        {/* <div>
          username
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={props.handlePasswordChange}
          />
        </div> */}
        <Button variant="primary" type="submit" className="mt-3">
          login
        </Button>
        {/* <button type="submit">Submit</button> */}
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default LoginForm;
