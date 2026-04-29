import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserEdit from '.';
import useFetchUser from '../../../hooks/users/useFetchUser';
import useAlert from '../../../hooks/alerts/useAlert';

const mockedNavigate = jest.fn();
const mockedShowAlert = jest.fn();
let formUserProps = null;

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: () => ({ id: '1' }),
  };
});

jest.mock('../../../components/formUser', () => ({
  __esModule: true,
  default: ({ handleSubmit, handleChange }) => {
    formUserProps = { handleSubmit, handleChange };
    return <div />;
  },
}));

jest.mock('../../../hooks/users/useFetchUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../hooks/alerts/useAlert', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderPage = () =>
  render(
    <MemoryRouter>
      <UserEdit />
    </MemoryRouter>,
  );

describe('UserEdit page', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedShowAlert.mockClear();
    formUserProps = null;
    global.fetch = jest.fn();
  });

  it('renders loading state when user data is being fetched', () => {
    useFetchUser.mockReturnValue({ user: null, loading: true, error: null });
    useAlert.mockReturnValue({ showAlert: mockedShowAlert, AlertComponent: null });

    renderPage();

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('calls handleChange and handleSubmit', async () => {
    useFetchUser.mockReturnValue({
      user: {
        id: '1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phone: '1234567890',
      },
      loading: false,
      error: null,
    });
    useAlert.mockReturnValue({ showAlert: mockedShowAlert, AlertComponent: null });
    global.fetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue({}) });

    renderPage();

    expect(formUserProps).not.toBeNull();

    const changeEvent = { target: { name: 'firstName', value: 'Alice' } };
    act(() => {
      formUserProps.handleChange(changeEvent);
    });
 
    await act(async () => {
      await formUserProps.handleSubmit({ preventDefault: jest.fn() });
    });

    expect(mockedNavigate).toHaveBeenCalledWith('/users');
  });
});
