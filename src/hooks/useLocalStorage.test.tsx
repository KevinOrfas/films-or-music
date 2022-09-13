import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

const data = [
  {
    gender: 'male',
    age: '36',
    nationality: [
      { country_id: 'US' },
      { country_id: 'MU' },
      { country_id: 'CA' },
    ],
    name: 'Kevin',
  },
  {
    gender: 'male',
    age: '34',
    nationality: [
      { country_id: 'NZ' },
      { country_id: 'SI' },
      { country_id: 'AU' },
    ],
    name: 'Simon',
  },
  {
    gender: 'male',
    age: '24',
    nationality: [
      { country_id: 'GR' },
      { country_id: 'CY' },
      { country_id: 'KE' },
    ],
    name: 'George',
  },
];

describe('Storage', () => {
  it('should add to localStorage when setState is invoked', () => {
    const { result } = renderHook(() =>
      useLocalStorage<Array<unknown>>('searches', [])
    );
    expect(result.current[0]).toEqual([]);
    act(() => {
      // calling setState
      result.current[1](data);
    });
    expect(result.current[0]).toEqual(data);
    expect(localStorage.getItem('searches')).toEqual(JSON.stringify(data));
  });
});
