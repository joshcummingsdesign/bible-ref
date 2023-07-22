import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Header} from './Header';

it('should have brand link', () => {
    render(<Header />);

    const link = screen.getByTestId('nav-link');
    const heading = screen.getByTestId('nav-heading');

    expect(link).toHaveAttribute('href', '/');
    expect(heading).toHaveTextContent('Bible Ref');
});
