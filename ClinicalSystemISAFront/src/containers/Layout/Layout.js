import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import axios from '../../axios-objects';
import {updateObject} from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    state = {
        object: {
            name: '',
            title: ''
        }
    }

    objectHandler = (event) => {
        event.preventDefault();

        const data = {
            ...this.state.object
        }
        
        this.props.onAddObject(data);
    }

    inputChangehandler = (event, type) => {
        let updatedObject = updateObject(this.state.object, {
            [type]: event.target.value});

        this.setState({object: updatedObject});
    }

    registerHandler = () => {
        this.props.history.push("/register");
    }

    loginHandler = () => {
        this.props.history.push("/login");
    }

    homepage = () => {///////////////////////////////////////////////
        this.props.history.push("/homepage");
    }

    pacijenti = () => {///////////////////////////////////////////////
        this.props.history.push("/pacijenti");
    }

    doktori = () => {
        this.props.history.push("/doktor");
    }

    adminKlinike = () => {
        this.props.history.push("/adminKlinike");
    }

    render() {
        let redirect = null;
        if (this.props.added) {
            redirect = (
                <Auxiliary>
                    {/* <button className={classes.Button}>Go to orders</button> */}
                    <Redirect to="/orders" />
                </Auxiliary>
            );
        }
        
        return (
            <Auxiliary>
                {/* <input className={classes.Input}
                    onChange={(event) => this.inputChangehandler(event, 'name')}/>
                <input className={classes.Input}
                    onChange={(event) => this.inputChangehandler(event, 'title')}/>
                <button onClick={(event) => this.objectHandler(event)} className={classes.Button}>Apply</button> */}

                <div className='ui menu'>
                    {!this.props.logged ? (<button className={classes.Button} onClick={this.registerHandler}>Register</button>) : null}

                    {!this.props.logged ? (<button className={classes.Button} onClick={this.loginHandler}>Login</button>) : null}
                    
                    {!this.props.logged ? (<button className={classes.Button} onClick={this.homepage}>Home page</button>) : null}

                    {!this.props.logged ? (<button className={classes.Button} onClick={this.pacijenti}>Pacijenti</button>) : null}

                    {!this.props.logged ? (<button className={classes.Button} onClick={this.doktori}>Doktori</button>) : null}

                    {!this.props.logged ? (<button className={classes.Button} onClick={this.adminKlinike}>Admin klinike</button>) : null}


                </div>

                

                {redirect}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        added: state.object.added,
        logged: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddObject: (data) => dispatch(actions.addObject(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout, axios);