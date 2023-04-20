import type { ArgumentArray } from 'classnames';
import classNames from 'classnames';

export default function improvedClassNames(...args: ArgumentArray): string {
  return classNames(args).replace(/\s+/g, ' ');
}
