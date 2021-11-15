import React from 'react'
import {render, fireEvent} from '../testUtils'
import {Home} from '../../pages/index'
import axios from 'axios';
import {login} from "../api";
import MockAdapter from "axios-mock-adapter";

describe('Home page', () => {
    it('matches snapshot', () => {
        const {asFragment} = render(<Home/>, {})
        expect(asFragment()).toMatchSnapshot()
    })
})

describe('Login Tests', () => {
    let mock: any;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    const username = 'test@gmail.com';
    const password = '123';

    it('should call endpoint with given username & password', async () => {
        const authRes = {
            "id": "",
            "username": username,
            "createdAt": "",
            "token": ""
        };
        mock.onPost("http://localhost:3000/api/authenticate", {username, password},)
            .reply(200, authRes);

        // when
        const result = await login(username, password);
        // then
        expect(mock.history.post[0].url).toEqual("http://localhost:3000/api/authenticate");
        expect(result).toHaveProperty('token');
        expect(result.username).toEqual(username);

    });
})