import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Favorites from '../profile/Profile.jsx';
import '../profile/Profile.css';

const mockRemoveFavourite = jest.fn();
  const favoriteDrugs = [    { details: { brand_name: 'Advil', generic_name: 'Ibuprofen', active_ingredients: [{ name: 'Ibuprofen', strength: '200mg' }, { name: 'Ibuprofen', strength: '400mg' }] } },
    { details: { brand_name: 'Tylenol', generic_name: 'Acetaminophen', active_ingredients: [{ name: 'Acetaminophen', strength: '325mg' }] } },
  ];

  test('renders without crashing', () => {
    render(<Favorites username="john_doe" favoriteDrugs={favoriteDrugs} removeFavourite={mockRemoveFavourite} />);
  });

  test('displays the correct username in the header', () => {
    render(<Favorites username="john_doe" favoriteDrugs={favoriteDrugs} removeFavourite={mockRemoveFavourite} />);
    expect(screen.getByText("John Doe's Favourites")).toBeInTheDocument();
  });

  test('displays each drug in a table row', () => {
    render(<Favorites username="john_doe" favoriteDrugs={favoriteDrugs} removeFavourite={mockRemoveFavourite} />);
    expect(screen.getByText('Advil')).toBeInTheDocument();
    expect(screen.getByText('Tylenol')).toBeInTheDocument();
  });

  test('displays the correct information for each drug', () => {
    render(<Favorites username="john_doe" favoriteDrugs={favoriteDrugs} removeFavourite={mockRemoveFavourite} />);
    expect(screen.getByText('Advil')).toBeInTheDocument();
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(screen.getByText('Ibuprofen (200mg), Ibuprofen (400mg)')).toBeInTheDocument();
    expect(screen.getByText('200mg, 400mg')).toBeInTheDocument();
    expect(screen.getByTestId('removeFavourite-0')).toBeInTheDocument();
  });

  test('calls the removeFavourite function with the correct drug object when the favorite icon is clicked', () => {
    render(<Favorites username="john_doe" favoriteDrugs={favoriteDrugs} removeFavourite={mockRemoveFavourite} />);
    const removeFavouriteBtn = screen.getByTestId('removeFavourite-0');
    fireEvent.click(removeFavouriteBtn);
    expect(mockRemoveFavourite).toHaveBeenCalledWith(favoriteDrugs[0]);
  });
