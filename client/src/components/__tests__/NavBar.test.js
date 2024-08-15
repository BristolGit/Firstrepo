import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../navbar/Navbar.jsx';

test('renders the MedBud logo', () => {
    render(<Navbar />);
    const logo = screen.getByAltText('MedBud Logo');
    expect(logo).toBeInTheDocument();
  });

test('displays the correct navigation links', () => {
    render(<Navbar />);
    const searchLink = screen.getByText('Search');
    const contactLink = screen.getByText('Contact');
    const faqLink = screen.getByText('FAQ');
    expect(searchLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
  });

test('opens and closes the navigation menu', () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText('account of current user');
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    fireEvent.click(menuButton);
    expect(menu).not.toBeInTheDocument();
  });

test('displays the user menu when the user avatar is clicked', () => {
    render(<Navbar loggedIn />);
    const avatarButton = screen.getByRole('button', { name: 'Open user' });
    fireEvent.click(avatarButton);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

test('logs out the user when the logout button is clicked', () => {
    const mockLogout = jest.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() },
      writable: true,
    });
    render(<Navbar loggedIn onLogout={mockLogout} />);
    const menuButton = screen.getByLabelText('account of current user');
    fireEvent.click(menuButton);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });



