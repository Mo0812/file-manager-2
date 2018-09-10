import React, {Component} from 'react';
import {Container, Col, Jumbotron, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';
import sha1 from 'sha1';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <Container>
                <Jumbotron>
                    <h1>FileManager 2</h1>
                    <Form>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username</Label>
                            <Col sm={10}>
                                <Input id="username" name="username" placeholder="Username" onChange={this.handleChange("username")}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" placeholder="Password" onChange={this.handleChange("password")}/>
                            </Col>
                        </FormGroup>
                        <Button color="success" onClick={this.handleLogin}>Anmelden</Button>
                    </Form>
                </Jumbotron>
            </Container>
        );
    }

    handleLogin = () => {
        localStorage.setItem("username", this.state.username);
        localStorage.setItem("password", sha1(this.state.password));
        this.props.onClick();
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
}

export default Login;