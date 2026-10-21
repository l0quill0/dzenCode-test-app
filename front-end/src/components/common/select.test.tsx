import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from './select';

describe('Select component', () => {
  it('renders label, placeholder, and options', () => {
    const options = [
      { value: 'Monitors', label: 'Monitors' },
      { value: 'Laptops', label: 'Laptops' },
    ];
    render(
      <Select
        id="test-select"
        label="Type:"
        value=""
        onChange={vi.fn()}
        options={options}
        placeholder="All types"
      />,
    );

    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All types' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Monitors' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Laptops' })).toBeInTheDocument();
  });

  it('triggers onChange with selected value', () => {
    const handleChange = vi.fn();
    const options = [{ value: 'Monitors', label: 'Monitors' }];
    render(
      <Select
        value=""
        onChange={handleChange}
        options={options}
        placeholder="All"
      />,
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Monitors' } });
    expect(handleChange).toHaveBeenCalledWith('Monitors');
  });
});
