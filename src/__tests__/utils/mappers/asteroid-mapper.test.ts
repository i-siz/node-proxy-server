import { mapAsteroidsData } from '../../../utils/mappers/asteroid-mapper';

const asteroidData = {
  near_earth_objects: {
    '2024-03-10': [
      {
        id: '3273523',
        name: '(2005 EO30)',
        estimated_diameter: {
          meters: {
            estimated_diameter_min: 300,
            estimated_diameter_max: 500,
          },
        },
        is_potentially_hazardous_asteroid: true,
        close_approach_data: [
          {
            close_approach_date_full: '2024-Mar-10 14:14',
            relative_velocity: {
              kilometers_per_second: '7.6911295902',
            },
          },
        ],
      },
    ],
    '2024-03-09': [
      {
        id: '54211501',
        name: '(2021 UO)',
        estimated_diameter: {
          meters: {
            estimated_diameter_min: 180,
            estimated_diameter_max: 220,
          },
        },
        is_potentially_hazardous_asteroid: false,
        close_approach_data: [
          {
            close_approach_date_full: '2024-Mar-09 12:21',
            relative_velocity: {
              kilometers_per_second: '25.1943403321',
            },
          },
        ],
      },
    ],
  },
};

const expectedResultTemplate = {
  count: 2,
  were_dangerous: true,
  meteors: [
    {
      '2024-03-09': [
        {
          id: '54211501',
          name: '(2021 UO)',
          average_diameter_in_meters: 200,
          is_potentially_hazardous_asteroid: false,
          close_approach_date_full: '2024-Mar-09 12:21',
          relative_velocity_in_kilometers_per_second: '25.1943403321',
        },
      ],
    },
    {
      '2024-03-10': [
        {
          id: '3273523',
          name: '(2005 EO30)',
          average_diameter_in_meters: 400,
          is_potentially_hazardous_asteroid: true,
          close_approach_date_full: '2024-Mar-10 14:14',
          relative_velocity_in_kilometers_per_second: '7.6911295902',
        },
      ],
    },
  ],
};

describe('asteroid mapper', () => {
  it('should map asteroids data when countOnly is false and wereDangerousMeteors is false', () => {
    const result = mapAsteroidsData(asteroidData, false, false);
    const { were_dangerous, ...expectedResult } = expectedResultTemplate;
    expect(result).toStrictEqual(expectedResult);
  });
  it('should map asteroids data when countOnly is true and wereDangerousMeteors is false', () => {
    const result = mapAsteroidsData(asteroidData, true, false);
    expect(result).toStrictEqual({ count: 2 });
  });
  it('should map asteroids data when countOnly is false and wereDangerousMeteors is true', () => {
    const result = mapAsteroidsData(asteroidData, false, true);
    const expectedResult = expectedResultTemplate;
    expect(result).toStrictEqual(expectedResult);
  });
  it('should map asteroids data when countOnly is true and wereDangerousMeteors is true', () => {
    const result = mapAsteroidsData(asteroidData, true, true);
    expect(result).toStrictEqual({ count: 2 });
  });
});
