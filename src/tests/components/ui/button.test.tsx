import { describe, expect, it } from 'vitest';
import { renderWithProviders, screen } from '@/tests/render';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('shows loading state and disables the button', () => {
    renderWithProviders(<Button loading>Submit</Button>);
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });
});
