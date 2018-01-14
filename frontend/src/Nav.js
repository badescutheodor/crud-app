import React, { Component } from 'react';
import {
    NavLink as RRNavLink
} from 'react-router-dom';
import {
    Collapse,
    Row,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import propTypes from 'prop-types';

export default class extends Component {
    static contextTypes = {
        router: propTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    _logout(e) {
        const { router } = this.context;
        e.preventDefault();
        localStorage.removeItem('TOKEN');
        router.history.push('/');
    }

    render() {
        return (
            <Row>
                <Navbar className="bg-light" light style={{width: '100%'}}>
                    <NavbarBrand tag={RRNavLink} to="/">Blog</NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({isOpen: !this.state.isOpen})} style={{ position: 'absolute', right: '17px', top: '9px' }}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/" activeClassName="active" tag={RRNavLink} exact={true}>Home</NavLink>
                            </NavItem>
                            {
                                !localStorage.getItem('TOKEN') && (
                                    <NavItem>
                                        <NavLink to="/login" activeClassName="active" tag={RRNavLink}>Login</NavLink>
                                    </NavItem>
                                )
                            }
                            {
                                localStorage.getItem('TOKEN') && (
                                    <NavItem>
                                        <NavLink to="/admin" activeClassName="active" tag={RRNavLink}>Admin</NavLink>
                                    </NavItem>
                                )
                            }
                            {
                                localStorage.getItem('TOKEN') && (
                                    <NavItem>
                                        <NavLink to="/" activeClassName="active" tag={RRNavLink} onClick={e => this._logout(e)}>Logout</NavLink>
                                    </NavItem>
                                )
                            }


                        </Nav>
                    </Collapse>
                </Navbar>
            </Row>
        );
    }
}