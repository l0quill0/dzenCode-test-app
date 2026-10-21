import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders loading spinner and disables when isLoading is true', () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies variant and shape classes', () => {
    render(
      <Button variant="danger" shape="circle" size="icon-md">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('rounded-full');
    expect(button).toHaveClass('text-danger');
  });

  it('applies link variant correctly', () => {
    render(
      <Button variant="link" size="auto" shape="none">
        Link Action
      </Button>,
    );
    const button = screen.getByRole('button', { name: /link action/i });
    expect(button).toHaveClass('text-brand');
    expect(button).toHaveClass('rounded-none');
  });

  it('applies plain variant correctly', () => {
    render(
      <Button variant="plain" size="auto" shape="none">
        Plain Action
      </Button>,
    );
    const button = screen.getByRole('button', { name: /plain action/i });
    expect(button).toHaveClass('text-inherit');
    expect(button).toHaveClass('bg-transparent');
  });
});
