import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Header} from './Header';

it('should have brand link', () => {
    render(<Header />);

    const brand = screen.getByText('Bible Ref');

    expect(brand).toHaveAttribute('href', '/');
});
