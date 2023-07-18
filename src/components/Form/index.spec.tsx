import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {useSearchParams} from 'next/navigation';
import {Form} from './Form';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: () => jest.fn(),
    }),
    useSearchParams: jest.fn(),
}));

it('should have default state', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
        get: () => {},
    });

    render(<Form />);

    const form = screen.getByTestId('form');
    const input = screen.getByTestId('search-input');
    const spinner = screen.queryByTestId('spinner');

    expect(form).not.toHaveClass('is_loading');
    expect(input).toHaveAttribute('value', '');
    expect(spinner).not.toBeInTheDocument();
});

it('should accept in initial value', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
        get: () => 'Gen 1:1',
    });

    render(<Form initialValue="Gen 1:1" />);

    const form = screen.getByTestId('form');
    const input = screen.getByTestId('search-input');
    const spinner = screen.queryByTestId('spinner');

    expect(form).not.toHaveClass('is_loading');
    expect(input).toHaveAttribute('value', 'Gen 1:1');
    expect(spinner).not.toBeInTheDocument();
});

it('should submit', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
        get: () => {},
    });

    render(<Form />);

    const form = screen.getByTestId('form');
    const input = screen.getByTestId('search-input');
    const submit = screen.getByTestId('search-submit');

    fireEvent.change(input, {target: {value: 'Gen 1:1'}});
    fireEvent.click(submit);

    const spinner = screen.queryByTestId('spinner');

    expect(form).toHaveClass('is_loading');
    expect(input).toHaveAttribute('value', 'Gen 1:1');
    expect(spinner).toBeInTheDocument();
});
