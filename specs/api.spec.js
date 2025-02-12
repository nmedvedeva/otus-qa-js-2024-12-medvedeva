import { config as _config } from '../framework'
import axios from 'axios'
const config = _config.bookstore

describe('Auth', () => {
    test('Test for success user create', async () => {
        //const url = `${config.base_url}/Account/v1/User`
        const response = await axios.post(`${config.base_url}/Account/v1/User`, {
            userName: config.login_correct,
            password: config.password_correct
        })

        const data = response.data

        expect(response.status).toBe(201)
        expect(data.username).toBe(config.login_correct)
    })
    /*test('Test busy login', async () => {
        try {
            const response = await axios.post(`${config.base_url}/Account/v1/User`, {
                userName: config.login_correct,
                password: config.password_correct
            });
    
            const data = response.data;
    
            expect(response.status).toBe(406);
            expect(data.message).toBe('User exists!');
        } catch (error) {
            if (error.response) {
                const data = error.response.data;
                expect(error.response.status).toBe(406);
                expect(data.message).toBe('User exists!');
            } else {
                throw error;
            }
        }
    })
    test('Test incorrect password', async () => {
        try {
            const response = await axios.post(`${config.base_url}/Account/v1/User`, {
                userName: config.login_correct,
                password: config.password_incorrect
            });
    
            const data = response.data;
    
            expect(response.status).toBe(400);
            expect(data.message).toBeTruthy();
        } catch (error) {
            if (error.response) {
                const data = error.response.data;
                expect(error.response.status).toBe(400);
                expect(data.message).toBeTruthy();
            } else {
                throw error;
            }
        }
    })
})

describe('Test for generate token', () => {
    test('Tests for success generate token', async () => {
        try {
            const response = await axios.post(`${config.base_url}/Account/v1/GenerateToken`, {
                userName: config.login_correct,
                password: config.password_correct
            });

            const data = response.data;
            expect(response.status).toBe(200);
            expect(data.status).toBe('Success');
            expect(data.token).toBeTruthy();
        } catch (error) {
            throw new Error("Expected the request to succeed, but it failed.");
        }
    });

    test('Test for unsuccessful generate token', async () => {
        try {
            const response = await axios.post(`${config.base_url}/Account/v1/GenerateToken`, {
                userName: config.login_correct,
                password: config.password_incorrect
            });

            const data = response.data;
            expect(response.status).toBe(200);
            expect(data.status).toBe('Failed');
            expect(data.token).toBeNull();
        } catch (error) {
            if (error.response) {
                const data = error.response.data;
                expect(error.response.status).toBe(200);
                expect(data.status).toBe('Failed');
                expect(data.token).toBeNull();
            } else {
                throw new Error("Unexpected error occurred.");
            }
        }
    });*/
});