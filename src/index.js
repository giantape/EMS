import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Users from './components/users/users'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from "./components/layout/header";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Header />
                <Container maxWidth="lg">
                    <Users />
                </Container>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));