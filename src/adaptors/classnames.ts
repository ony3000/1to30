import type { ArgumentArray } from 'classnames';
import classNames from 'classnames';

export default function improvedClassNames(...args: ArgumentArray): string {
  return classNames(args.map((arg) => (typeof arg === 'string' ? arg.replace(/\s+/g, ' ') : arg)));
}
