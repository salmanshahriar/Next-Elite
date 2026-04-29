import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: { children: 'Delete', variant: 'destructive' },
};

export const Outline: Story = {
  args: { children: 'Outline', variant: 'outline' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const Ghost: Story = {
  args: { children: 'Ghost', variant: 'ghost' },
};

export const Link: Story = {
  args: { children: 'Link', variant: 'link' },
};

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
};
