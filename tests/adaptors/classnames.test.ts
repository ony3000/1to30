import { classNames } from '@/adaptors';

describe('classNames adaptor', () => {
  it('template literal로 작성한 multi-line class name을 single-line class name으로 변환한다.', () => {
    expect(
      classNames(
        `first
        second
        third`,
      ),
    ).toBe('first second third');
  });

  it('template literal로 작성한 조건부 multi-line class name을 single-line class name으로 변환한다.', () => {
    expect(
      classNames({
        [`first
        second
        third`]: true,
      }),
    ).toBe('first second third');
  });
});
