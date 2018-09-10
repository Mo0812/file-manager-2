import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FileManager 2</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/filelist"><FormattedMessage id="menu.filelist"/></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/userlist"><FormattedMessage id="menu.userlist"/></NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="danger" size="md" onClick={this.props.onClick}><FormattedMessage id="menu.logout"/></Button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default Menu;