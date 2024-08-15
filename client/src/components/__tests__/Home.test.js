import React from 'react';
import { Typography, Grid } from '@mui/material';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../home/Home.jsx';
import '../home/Home.css';


test('renders logo image with correct alt text and style', () => {
    render(<HomePage />);
    const logoImg = screen.getByAltText('MedBud Logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveStyle('maxWidth: 70%');
    expect(logoImg).toHaveStyle('maxHeight: 200px');
  });

test('renders MEDBUD text with correct font family, font weight, and color', () => {
    render(<HomePage />);
    const medbudText = screen.getByText('MEDBUD');
    expect(medbudText).toBeInTheDocument();
    expect(medbudText).toHaveStyle('fontFamily: monospace');
    expect(medbudText).toHaveStyle('fontWeight: 700');
    expect(medbudText).toHaveStyle('color: inherit');
    expect(medbudText).toHaveStyle('textDecoration: none');
  });

test('renders search and faq buttons with correct text and link', () => {
    render(<HomePage />);
    const searchBtn = screen.getByText('SEARCH DRUGS');
    const faqBtn = screen.getByText('FAQ');
    expect(searchBtn).toBeInTheDocument();
    expect(faqBtn).toBeInTheDocument();
  });

test('renders search and faq buttons with type button', () => {
    render(<HomePage />);
    const searchBtn = screen.getByText('SEARCH DRUGS');
    const faqBtn = screen.getByText('FAQ');
    expect(searchBtn).toHaveAttribute('type', 'button');
    expect(faqBtn).toHaveAttribute('type', 'button');
  });
  