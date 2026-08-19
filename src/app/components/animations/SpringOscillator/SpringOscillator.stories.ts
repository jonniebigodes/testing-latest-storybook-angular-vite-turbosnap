import type { Meta, StoryObj } from '@storybook/angular-vite';
import { SpringOscillator } from './ui-spring-oscillator';

const meta: Meta<SpringOscillator> = {
  title: 'Animations/SpringOscillator',
  component: SpringOscillator,
};

export default meta;
type Story = StoryObj<SpringOscillator>;

export const Default: Story = {};

export const WiderSpan: Story = {
  args: { spanPx: 80 },
};
