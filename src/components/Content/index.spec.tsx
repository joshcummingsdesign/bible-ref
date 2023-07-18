import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Content} from './Content';
import expected from '@/lib/api/stubs/expected.json';

it('should handle none found', () => {
    render(<Content passages={null} />);

    const nonFound = screen.getByText('No passages found.');

    expect(nonFound).toBeInTheDocument();
});

it('should handle empty passages', () => {
    render(<Content passages={[]} />);

    const nonFound = screen.getByText('No passages found.');

    expect(nonFound).toBeInTheDocument();
});

it('should show passages', () => {
    render(<Content passages={expected} />);

    const title = screen.getByRole('heading', {level: 2});
    const headings = screen.getAllByRole('heading', {level: 3});

    expect(title).toHaveTextContent('John');
    expect(headings[0]).toHaveTextContent('John 1');
    expect(headings[1]).toHaveTextContent('John 2');
});
