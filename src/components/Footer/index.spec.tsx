import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Footer} from './Footer';

it('should have copyright text', () => {
    render(<Footer />);

    const copyright = screen.getByText(/© \d{4} Bible Notes/);

    expect(copyright).toBeInTheDocument();
});
