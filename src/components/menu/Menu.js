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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons";
import API from '../../API';

import './Menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    render() {
        let currentPath = window.location.pathname.split(/[/]/)[1];

        return (
            <div className="main-navigation">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FileManager 2</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/filelist" active={ currentPath == "filelist" ? true : false }><FormattedMessage id="menu.filelist"/></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/userlist" active={ currentPath == "userlist" ? true : false }><FormattedMessage id="menu.userlist"/></NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="user-navigation">
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <FontAwesomeIcon icon={faUserAstronaut}/> {API.getUsername()}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <FormattedMessage id="menu.user.changepassword"/>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <FormattedMessage id="menu.user.faq"/>
                                </DropdownItem>
                                <DropdownItem>
                                    <FormattedMessage id="menu.user.contact"/>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button color="danger" size="md" className="logout" onClick={this.props.onClick}><FormattedMessage id="menu.logout"/></Button>
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