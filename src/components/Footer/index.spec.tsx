import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Footer} from './Footer';

it('should have copyright text', () => {
    render(<Footer />);

    const copyright = screen.getByText(/© \d{4} Bible Notes/);

    expect(copyright).toBeInTheDocument();
});

it('should accept copyright prop', () => {
    render(<Footer copyright="Hello World" />);

    const copyright = screen.getByText('Hello World');

    expect(copyright).toBeInTheDocument();
});
