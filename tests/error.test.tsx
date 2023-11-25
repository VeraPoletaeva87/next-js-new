import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorPage from '../pages/404';

describe('App', () => {
  it('404 page is displayed when navigating to an invalid route', () => {
    render(<ErrorPage />);
    expect(screen.getByTestId('invalid-route')).toBeInTheDocument();
  });
});
