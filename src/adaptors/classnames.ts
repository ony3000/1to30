import type { ArgumentArray } from 'classnames';
import classNames from 'classnames';

export default function enhancedClassNames(...args: ArgumentArray): string {
  return classNames(args).replace(/\s+/g, ' ');
}
