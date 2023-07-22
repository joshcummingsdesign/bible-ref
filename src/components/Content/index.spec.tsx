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
    const view = render(<Content passages={expected} />);
    expect(view).toMatchSnapshot();
});
