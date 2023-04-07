import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test('renders without crashing', () => {
//   render(<div>12344</div>)
//   const linkElement = screen.getByText(1234);
//   expect(linkElement).toBeInTheDocument();

// });
