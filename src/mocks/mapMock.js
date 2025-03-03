import { uniqueId } from 'lodash';
import { mock } from '../utils/axios';

let summariesMap = [
  {
    id: uniqueId(),
    continent: 'United States',
    schools: '4000 Schools',
    trainingCenter: '13 Training Centers',
    jobs: '2,000 Job Openings',
    latlng: { lat: 40.712776, lng: -74.005974 }, // New York City (United States)
  },
  {
    id: uniqueId(),
    continent: 'Africa',
    schools: '10,000 Schools',
    trainingCenter: '200 Training Centers',
    jobs: '5,000 Job Openings',
    latlng: { lat: 1.2921, lng: 36.8219 }, // Nairobi, Kenya (Central Africa)
  },
  {
    id: uniqueId(),
    continent: 'Europe',
    schools: '15,000 Schools',
    trainingCenter: '300 Training Centers',
    jobs: '10,000 Job Openings',
    latlng: { lat: 48.8566, lng: 2.3522 }, // Paris, France (Western Europe)
  },
];

mock.onGet('/api/summariesMap').reply(() => [200, { summariesMap }]);

mock.onGet('/api/summaryMap').reply((config) => {
  const { summaryMapId } = config.params;
  const summaryMap = summariesMap.find((_summaryMap) => _summaryMap.id === summaryMapId);

  return [200, { summaryMap }];
});
