import { WeekStatusTypes } from 'apis/types';

export const weekStatusConverter = (weekStatus: WeekStatusTypes) => {
  switch (weekStatus) {
    case 'allocatable':
      return '모집 전';
    case 'inProgress':
      return '모집 중';
    case 'closed':
      return '모집 마감';
  }
};
