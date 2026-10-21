import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DeleteModal } from './delete-modal';
import { dictionaries } from '@/i18n/dictionaries';

vi.mock('@/contexts/i18n-context', () => ({
  useI18n: () => ({
    locale: 'ru',
    t: dictionaries.ru,
    setLocale: vi.fn(),
  }),
}));

describe('DeleteModal component', () => {
  it('does not render when isOpen is false', () => {
    render(
      <DeleteModal
        isOpen={false}
        title="Confirm delete"
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      />,
    );

    expect(screen.queryByText('Confirm delete')).not.toBeInTheDocument();
  });

  it('renders title and children when isOpen is true', () => {
    render(
      <DeleteModal
        isOpen={true}
        title="Delete Order 1"
        onCancel={vi.fn()}
        onConfirm={vi.fn()}
      >
        <div>Order product details</div>
      </DeleteModal>,
    );

    expect(screen.getByText('Delete Order 1')).toBeInTheDocument();
    expect(screen.getByText('Order product details')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: dictionaries.ru.actions.delete })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: dictionaries.ru.actions.cancel })).toBeInTheDocument();
  });

  it('calls onCancel when cancel or close button is clicked', () => {
    const handleCancel = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        title="Delete Modal"
        onCancel={handleCancel}
        onConfirm={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: dictionaries.ru.actions.cancel }));
    expect(handleCancel).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: dictionaries.ru.actions.close }));
    expect(handleCancel).toHaveBeenCalledTimes(2);
  });

  it('calls onConfirm when delete button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        title="Delete Modal"
        onCancel={vi.fn()}
        onConfirm={handleConfirm}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: dictionaries.ru.actions.delete }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
