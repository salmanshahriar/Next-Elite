import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders header and title', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders card description', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>A description</CardDescription>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('renders card action in header', () => {
    render(
      <Card>
        <CardHeader>
          <CardAction>
            <button type="button">Action</button>
          </CardAction>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders card footer', () => {
    render(
      <Card>
        <CardFooter>Footer text</CardFooter>
      </Card>,
    );
    expect(screen.getByText('Footer text')).toBeInTheDocument();
  });

  it('applies data-slot for card', () => {
    const { container } = render(<Card>x</Card>);
    expect(container.querySelector("[data-slot='card']")).toBeInTheDocument();
  });

  it('applies data-slot for card-header', () => {
    const { container } = render(<CardHeader>x</CardHeader>);
    expect(
      container.querySelector("[data-slot='card-header']"),
    ).toBeInTheDocument();
  });

  it('applies data-slot for card-title', () => {
    const { container } = render(<CardTitle>x</CardTitle>);
    expect(
      container.querySelector("[data-slot='card-title']"),
    ).toBeInTheDocument();
  });

  it('applies data-slot for card-description', () => {
    const { container } = render(<CardDescription>x</CardDescription>);
    expect(
      container.querySelector("[data-slot='card-description']"),
    ).toBeInTheDocument();
  });

  it('applies data-slot for card-action', () => {
    const { container } = render(<CardAction>x</CardAction>);
    expect(
      container.querySelector("[data-slot='card-action']"),
    ).toBeInTheDocument();
  });

  it('applies data-slot for card-content', () => {
    const { container } = render(<CardContent>x</CardContent>);
    expect(
      container.querySelector("[data-slot='card-content']"),
    ).toBeInTheDocument();
  });

  it('applies data-slot for card-footer', () => {
    const { container } = render(<CardFooter>x</CardFooter>);
    expect(
      container.querySelector("[data-slot='card-footer']"),
    ).toBeInTheDocument();
  });

  it('applies hover class when hover prop is true', () => {
    const { container } = render(<Card hover>x</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card?.className).toContain('ui-hover-lift');
  });

  it('does not apply hover class by default', () => {
    const { container } = render(<Card>x</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card?.className).not.toContain('ui-hover-lift');
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="my-custom">x</Card>);
    const card = container.querySelector('[data-slot="card"]');
    expect(card?.className).toContain('my-custom');
  });
});
