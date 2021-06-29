import React from 'react';
import Header from '../components/Header';
import NewLolly from '../templates/NewLolly';
import { Router } from '@reach/router';
import Form from '../components/Form';

export default function CreateNew() {

    return (
        <div className="container">
            <Header />
            <Router>
                <Form exect path="/create-lolly" />
                <NewLolly exect path="create-lolly/:slug" />
            </Router>

        </div >
    )
}