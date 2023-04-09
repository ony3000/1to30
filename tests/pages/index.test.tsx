import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home', () => {
  it('Renders the Next.js logo', () => {
    render(<Home />);

    const element = screen.getByTestId('logo-element');

    expect(element).toBeInTheDocument();
  });
});
