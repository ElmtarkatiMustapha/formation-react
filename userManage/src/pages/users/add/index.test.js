import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddUser from '.';

const mockedNavigate = jest.fn();
const mockedShowAlert = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

jest.mock('../../../hooks/alerts/useAlert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useAlert = require('../../../hooks/alerts/useAlert').default;

describe('AddUser page', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <AddUser />
      </MemoryRouter>,
    );

  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedShowAlert.mockClear();
    useAlert.mockReturnValue({ showAlert: mockedShowAlert });
    global.fetch = jest.fn();
  });

  it('renders without crashing', () => {
    const { container } = renderPage();
    expect(container).not.toBeEmptyDOMElement();
  });

  it('renders form controls and a submit button', () => {
    const { container } = renderPage();
    const inputs = container.querySelectorAll('input, textarea, select');
    expect(inputs.length).toBeGreaterThan(0);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('updates input values when the form fields change', () => {
    const { container } = renderPage();

    const firstNameInput = container.querySelector('input[name="firstName"]');
    const emailInput = container.querySelector('input[name="email"]');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(firstNameInput.value).toBe('John');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('submits the form and navigates when the API returns ok', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });

    const { container } = renderPage();

    fireEvent.change(container.querySelector('input[name="firstName"]'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(container.querySelector('input[name="lastName"]'), {
      target: { value: 'Doe' },
    });
    fireEvent.change(container.querySelector('input[name="email"]'), {
      target: { value: 'jane.doe@example.com' },
    });
    fireEvent.change(container.querySelector('input[name="phone"]'), {
      target: { value: '1234567890' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save User/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:8181/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phone: '1234567890',
        }),
      });
      expect(mockedShowAlert).toHaveBeenCalledWith('User added successfully', 'success');
      expect(mockedNavigate).toHaveBeenCalledWith('/users');
    });
  });
});
