import { atom } from 'recoil';
import { uuid } from '@/adaptors';
import type { Record } from '@/miscs/types';
import { ContentEnum } from '@/miscs/constants';

export const isClientReadyState = atom({
  key: 'isClientReadyState',
  default: false,
});

export const contentState = atom({
  key: 'contentState',
  default: ContentEnum.index,
});

export const rankingState = atom<Record[]>({
  key: 'rankingState',
  default: [],
  effects: [
    ({ setSelf, onSet, getPromise }) => {
      const key = '1to30:ranking';

      getPromise(isClientReadyState).then(() => {
        const storedData = localStorage.getItem(key);

        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);

            if (Array.isArray(parsedData)) {
              const ranking = (parsedData as unknown[])
                .map<Record>((item) => {
                  if (
                    typeof item === 'object' &&
                    item !== null &&
                    'name' in item &&
                    'score' in item &&
                    'timestamp' in item &&
                    'userAgent' in item &&
                    typeof item.name === 'string' &&
                    typeof item.score === 'number' &&
                    typeof item.timestamp === 'number' &&
                    typeof item.userAgent === 'string'
                  ) {
                    return {
                      name: item.name,
                      score: item.score,
                      timestamp: item.timestamp,
                      userAgent: item.userAgent,
                      uuid: 'uuid' in item && typeof item.uuid === 'string' ? item.uuid : uuid(),
                    };
                  }

                  return {
                    name: '',
                    score: NaN,
                    timestamp: NaN,
                    userAgent: '',
                    uuid: '',
                  };
                })
                .filter((item) => !Number.isNaN(item.score));

              setSelf(ranking);
            }
          } catch (error) {
            // pass
          }
        }
      });

      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    },
  ],
});
