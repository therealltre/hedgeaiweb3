import { uniqueId } from 'lodash';
import { mock } from '../utils/axios';

let events = [
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'September 1, 2024',
    endDate: 'September 2, 2024',
    startTime: '10am to 1pm',
    title: 'Back to School Night',
    description: [
      'Get ready to kick off the Christmas season in Mumbai with SOUND OF CHRISTMAS - your favourite LIVE Christmas concert!',
      'City Youth Movement invites you to the 4th edition of our annual Christmas festivities - by the youth and for the youth! Feat. your favourite worship leaders, carols, quizzes and some exciting surprises!',
      'Bring your family and friends and sing along to your favourite Christmas carols on the 2nd of December, 6:30 PM onwards at the Balgandharva Rang Mandir, Bandra West. Book your tickets now!',
    ],
    location: 'Greenwood Montessori School',
    phoneNumber: '555-123-4567',
    costType: 'paid', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'September 15, 2024',
    endDate: 'September 15, 2024',
    startTime: '9am to 12pm',
    title: 'Parent-Teacher Conference',
    description: ["Meet with your child's teacher to discuss their progress."],
    location: 'Sunrise Montessori Academy',
    phoneNumber: '555-234-5678',
    costType: 'free', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'October 5, 2024',
    endDate: 'October 5, 2024',
    startTime: '11am to 2pm',
    title: 'Fall Festival',
    description: ['A fun-filled day with games, food, and activities for all ages.'],
    location: 'Bright Horizons Montessori',
    phoneNumber: '555-345-6789',
    costType: 'paid', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'October 20, 2024',
    endDate: 'October 20, 2024',
    startTime: '10am to 1pm',
    title: 'Science Fair',
    description: ['Come see the amazing science projects created by our students.'],
    location: 'Cedar Park Montessori School',
    phoneNumber: '555-456-7890',
    costType: 'free', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'November 1, 2024',
    endDate: 'November 1, 2024',
    startTime: '9am to 11am',
    title: 'Book Fair',
    description: ['Explore a wide selection of books and support our school library.'],
    location: 'Oak Tree Montessori',
    phoneNumber: '555-567-8901',
    costType: 'free', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'November 15, 2024',
    endDate: 'November 15, 2024',
    startTime: '12pm to 3pm',
    title: 'Thanksgiving Potluck',
    description: ['Join us for a community potluck to celebrate Thanksgiving.'],
    location: 'Lakeside Montessori School',
    phoneNumber: '555-678-9012',
    costType: 'free', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'December 5, 2024',
    endDate: 'December 5, 2024',
    startTime: '6pm to 8pm',
    title: 'Winter Concert',
    description: ['Enjoy performances by our talented students.'],
    location: 'Riverside Montessori Academy',
    phoneNumber: '555-789-0123',
    costType: 'paid', // Added cost type
  },
  {
    id: uniqueId(),
    cover: '/assets/images/covers/cover_1.jpg',
    date: 'December 20, 2024',
    endDate: 'December 20, 2024',
    startTime: '5pm to 9pm',
    title: 'Holiday Party',
    description: ['Celebrate the holiday season with us!'],
    location: 'Mountain View Montessori School',
    phoneNumber: '555-890-1234',
    costType: 'paid', // Added cost type
  },
];

mock.onGet('/api/events').reply(() => [200, { events }]);

mock.onGet('/api/event').reply((config) => {
  const { eventId } = config.params;
  const event = events.find((_event) => _event.id === eventId);

  return [200, { event }];
});
