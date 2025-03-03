import { mock } from '../utils/axios';
import { sample } from 'lodash';

let jobs = [
  {
    id: '1',
    companyName: 'Sunshine Montessori School',
    logoUrl: '/assets/images/avatars/user-avatar.jpg',
    jobtitle: 'Montessori Teacher',
    description:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',

    keyResponsibilities: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    whyUs: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    // "tags": ["Education", "Min. 1 Year"],
    location: 'Romania',
    phoneNumber: '+6456987998',
    schoolAddress: '1234 bansshee ave',
    salaryRange: '700_1200',
    employment: 'Full Time',
    candidateNumber: '12',
    experience: '1 year(s)',
    seniority: 'Mid',
    postedDate: '2024-07-01',
    deadline: "2024-07-31",
    isPublished: true,
    status: sample(['published', 'unpublished']) || 'published',
  },
  {
    id: '2',
    logoUrl: '/assets/images/avatars/user-avatar.jpg',
    companyName: 'Little Explorers Montessori',
    jobtitle: 'Assistant Montessori Teacher',
    description:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',

    keyResponsibilities: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    whyUs: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    // "tags": ["Education", "Part Time"],
    location: 'Spain',
    phoneNumber: '+6456987998',
    schoolAddress: '1234 bansshee ave',
    salaryRange: '700_1200',
    employment: 'Part Time',
    candidateNumber: '12',
    experience: '2 year(s)',
    seniority: 'Junior',
    postedDate: '2024-07-03',
    deadline: "2024-07-31",
    isPublished: true,
    status: sample(['published', 'unpublished']) || 'published',
  },
  {
    id: '3',
    logoUrl: '/assets/images/avatars/user-avatar.jpg',
    companyName: 'Rainbow Montessori Academy',
    jobtitle: 'Montessori Coordinator',
    description:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',

    keyResponsibilities: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    whyUs: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    // "tags": ["Education", "Full Time"],
    location: 'Germany',
    phoneNumber: '+6456987998',
    schoolAddress: '1234 bansshee ave',
    salaryRange: '700_1200',
    employment: 'Full Time',
    candidateNumber: '12',
    experience: '2 year(s)',
    seniority: 'Mid',
    postedDate: '2024-07-05',
    deadline: "2024-07-31",
    isPublished: true,
    status: sample(['published', 'unpublished']) || 'published',
  },
  {
    id: '4',
    logoUrl: '/assets/images/avatars/user-avatar.jpg',
    companyName: 'Green Valley Montessori',
    jobtitle: 'Lead Montessori Teacher',
    description:
      'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',

    keyResponsibilities: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    whyUs: [
      'Working with agency for design drawing detail, quotation and local production.',
      'Produce window displays, signs, interior displays, floor plans and special promotions displays.',
      'Change displays to promote new product launches and reflect festive or seasonal themes.',
      'Planning and executing the open/renovation/ closing store procedure.',
      'Follow‐up store maintenance procedure and keep updating SKU In & Out.',
      'Monitor costs and work within budget.',
      'Liaise with suppliers and source elements.',
    ],
    // tags: ['Education', 'Full Time'],
    location: 'France',
    phoneNumber: '+6456987998',
    schoolAddress: '1234 bansshee ave',
    salaryRange: '700_1200',
    employment: 'Full Time',
    candidateNumber: '12',
    experience: '3 year(s)',
    seniority: 'Senior',
    postedDate: '2024-07-07',
    deadline: "2024-07-31",
    isPublished: true,
    status: sample(['published', 'unpublished']) || 'published',
  },
];

mock.onGet('/api/jobs').reply(() => [200, { jobs }]);

mock.onGet('/api/job').reply((config) => {
  const { jobId } = config.params;
  const job = jobs.find((_job) => _job.id === jobId);

  return [200, { job }];
});
