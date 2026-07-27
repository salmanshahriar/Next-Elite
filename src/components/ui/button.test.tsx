import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@tests/utils/render';
import { Button } from './button';

describe('Button', () => {
  it('renders with children', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('applies variant and size via class', () => {
    const { container } = renderWithProviders(
      <Button variant="secondary" size="sm">
        Secondary
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('h-8');
  });

  it('shows loading state and disables the button', () => {
    renderWithProviders(<Button loading>Submit</Button>);
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });
});
