import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { login, register } from '../services/UserService';
import LoginRegister from './Login';

jest.mock('../services/UserService.js'); // Mock login and register functions

describe('Login component', () => {
    beforeEach(() => {
        login.mockResolvedValue(new Promise((resolve, reject) => {
            resolve(true);
        }));
        register.mockResolvedValue(new Promise((resolve, reject) => {
            resolve(true);
        }));

    });
    test('renders LoginRegister component', () => {
        render(<LoginRegister updateUser={jest.fn()} />);

        const inputField = screen.getByRole('input');
        const loginButton = screen.getByRole('button', { name: "Login" });
        const registerButton = screen.getByRole('button', { name: "Register" });

        expect(inputField).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    test('disables buttons with short username', () => {
        render(<LoginRegister updateUser={jest.fn()} />);

        const loginButton = screen.getByRole('button', { name: "Login" });
        const registerButton = screen.getByRole('button', { name: "Register" });

        expect(loginButton).toBeDisabled();
        expect(registerButton).toBeDisabled();
    });

    test('enables buttons with long username', () => {
        render(<LoginRegister updateUser={jest.fn()} />);

        const inputField = screen.getByRole('input');
        fireEvent.change(inputField, { target: { value: 'longusername' } });

        const loginButton = screen.getByRole('button', { name: "Login" });
        const registerButton = screen.getByRole('button', { name: "Register" });

        expect(loginButton).not.toBeDisabled();
        expect(registerButton).not.toBeDisabled();
    });

    test('calls tryLogin on Login button click', async () => {
        const mockTryRegister = jest.fn();
        const mockTryLogin = jest.fn();
        render(<LoginRegister onLogin={mockTryLogin} onRegister={mockTryRegister} />);

        const inputField = screen.getByRole('input');
        fireEvent.change(inputField, { target: { value: 'longusername' } });

        const loginButton = screen.getByRole('button', { name: "Login" });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockTryLogin).toHaveBeenCalledWith('longusername');
        });
    });

    test('calls tryRegister on Register button click', async () => {
        const mockTryRegister = jest.fn();
        const mockUpdateUser = jest.fn();
        render(<LoginRegister onLogin={mockUpdateUser} onRegister={mockTryRegister} />);

        const inputField = screen.getByRole('input');

        fireEvent.change(inputField, { target: { value: 'longusername' } });

        const registerButton = screen.getByRole('button', { name: "Register" });
        fireEvent.click(registerButton);

        await waitFor(() => {
            expect(mockTryRegister).toHaveBeenCalledWith('longusername');
        });
    });

});
