import React, {Component} from 'react';
import {Container, Col, Jumbotron, Form, FormGroup, FormText, Button, Input, Label} from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);

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
                        <Button color="success" onClick={this.props.onClick}>Anmelden</Button>
                    </Form>
                </Jumbotron>
            </Container>
        );
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
}

export default Login;