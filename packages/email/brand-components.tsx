import type { ComponentProps } from 'react';
import {
  Body as ReactEmailBody,
  Button as ReactEmailButton,
  Container as ReactEmailContainer,
  Text as ReactEmailText,
} from 'react-email';

/**
 * Thin wrappers that add stable `ys-email-*` hook classes next to the Tailwind
 * classes, so the dark-mode rules in `brand-head.tsx` can target elements after
 * Tailwind has inlined the light colours. The classes carry no styles of their
 * own: a mail app that ignores the head styles shows the light design unchanged.
 */
const withClass = (className: string | undefined, hook: string) => (className ? `${className} ${hook}` : hook);

const textHook = (className = '') => {
  if (className.includes('text-muted-foreground')) {
    return 'ys-email-muted';
  }

  if (className.includes('text-foreground') || className.includes('font-semibold')) {
    return 'ys-email-title';
  }

  return 'ys-email-text';
};

export const Body = ({ className, ...props }: ComponentProps<typeof ReactEmailBody>) => (
  <ReactEmailBody className={withClass(className, 'ys-email-bg')} {...props} />
);

export const Button = ({ className, ...props }: ComponentProps<typeof ReactEmailButton>) => (
  <ReactEmailButton className={withClass(className, 'ys-email-button')} {...props} />
);

export const Container = ({ className, ...props }: ComponentProps<typeof ReactEmailContainer>) => (
  <ReactEmailContainer
    className={className?.includes('border') ? withClass(className, 'ys-email-card') : className}
    {...props}
  />
);

export const Text = ({ className, ...props }: ComponentProps<typeof ReactEmailText>) => (
  <ReactEmailText className={withClass(className, textHook(className))} {...props} />
);
