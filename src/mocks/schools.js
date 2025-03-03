import { uniqueId } from 'lodash';
import { mock } from '../utils/axios';

let schools = [
  {
    id: uniqueId(),
    logoUrl: '/assets/images/schools/school_1.jpg',
    schoolAddress: '123 Maple Street, Greenwood, NY 10001',
    city: 'Greenwood',
    postCode: '10001',
    schoolName: 'Greenwood Montessori School',
    phoneNumber: '555-123-4567',
    schoolEmail: 'info@greenwoodmontessori.edu',
    latlng: { lat: 40.712776, lng: -74.005974 },
    schoolAbout:
      'At Greenwood Montessori School, we value respect, independence, and a love for learning. Our inclusive environment celebrates diversity and encourages children to become compassionate global citizens.',
    age: '18 months - 12 years',
    numberOfStudents: 20,
    summerProgram: 'Yes',
    memberParents: 10,
    hiring: true,
    member: true,
    isPrivate: true,
    philosophy:
      'We believe in nurturing the whole child through a Montessori-inspired approach that values: Independence and self-direction, diversity and global citizenship, hands-on learning, individualized growth, mixed-Age Collaboration, joyful academia, environmental stewardship, holistic development.',
    ourPrograms: [
      {
        program1: 'Toddler',
        program2: 'Pre-Primary',
        program3: 'Elementary',
        program4: 'Recess Program',
        program5: 'Extended Day',
        program6: 'Summer Camp',
      },
    ],
    ourFacts: [
      {
        ages: '18 months - 12 years',
        type: 'Private',
        numberOfStudents: 75,
        dateOpened: 'September - June',
        summerProgram: 'Yes',
      },
    ],
    ourActivities: [
      {
        activity1: 'Chess',
        activity2: 'PE',
        activity3: 'Yoga',
        activity4: 'Basketball',
        activity5: 'Martial Arts',
        activity6: 'Swimming',
        activity7: 'Soccer',
        activity8: 'Foreign Languages',
      },
    ],
  },
  {
    id: uniqueId(),
    logoUrl: '/assets/images/schools/school_2.jpg',
    schoolAddress: '456 Oak Avenue, Sunrise, CA 90210',
    city: 'Sunrise',
    postCode: '90210',
    schoolName: 'Sunrise Montessori Academy',
    phoneNumber: '555-234-5678',
    schoolEmail: 'contact@sunrisemontessori.org',
    latlng: { lat: 34.052235, lng: -118.243683 },
    schoolAbout:
      'Sunrise Montessori Academy offers an inclusive and nurturing environment where children thrive both academically and socially.',
    age: '6 weeks - 10 years',
    numberOfStudents: 18,
    summerProgram: 'Yes',
    memberParents: 8,
    hiring: false,
    member: false,
    isPrivate: true,
    ourPrograms: [
      {
        programName: 'Infant Program',
        ageGroup: '6 weeks - 18 months',
        description:
          'A gentle, nurturing program that fosters sensory exploration and development for infants in a safe and stimulating environment.',
      },
      {
        programName: 'Early Childhood Program',
        ageGroup: '2.5 - 5 years',
        description:
          'Hands-on learning that emphasizes emotional, social, and cognitive growth, promoting a balanced development for young learners.',
      },
      {
        programName: 'After-School Enrichment',
        ageGroup: '5 - 10 years',
        description:
          'This program offers a variety of activities including arts, music, and STEM to enhance the child’s learning experience after school hours.',
      },
    ],
    ourFaculty: [
      {
        facultyName: 'Linda Parker',
        role: 'Director of Education',
        description:
          'Linda has been shaping the educational programs at Sunrise Montessori for the past decade, ensuring a holistic approach to child development.',
        facultyImgUrl: '/assets/images/schools/faculty/image1.jpg',
      },
    ],
  },
  {
    id: uniqueId(),
    logoUrl: '/assets/images/schools/school_3.jpg',
    schoolAddress: '789 Pine Road, Brighton, TX 73301',
    city: 'Brighton',
    postCode: '73301',
    schoolName: 'Bright Horizons Montessori',
    phoneNumber: '555-345-6789',
    schoolEmail: 'admissions@brighthorizonsmontessori.edu',
    latlng: { lat: 31.968599, lng: -99.90181 },
    schoolAbout:
      'Bright Horizons Montessori cultivates independence and academic excellence in a diverse, nurturing environment.',
    age: '18 months - 9 years',
    numberOfStudents: 15,
    summerProgram: 'No',
    memberParents: 6,
    hiring: true,
    member: true,
    isPrivate: false,
    ourPrograms: [
      {
        programName: 'Toddler Community',
        ageGroup: '18 months - 3 years',
        description:
          'Children develop independence and fine motor skills through practical life exercises and sensory activities in a structured environment.',
      },
      {
        programName: 'Casa dei Bambini',
        ageGroup: '3 - 6 years',
        description:
          'The Montessori environment supports children’s natural curiosity while developing foundational skills in literacy, numeracy, and social interaction.',
      },
    ],
    ourFaculty: [
      {
        facultyName: 'Anna Thompson',
        role: 'Head Teacher - Casa dei Bambini',
        description:
          'Anna brings over 10 years of experience in Montessori methods, focusing on early literacy and numeracy skills development.',
        facultyImgUrl: '/assets/images/schools/faculty/image1.jpg',
      },
    ],
  },
  {
    id: uniqueId(),
    logoUrl: '/assets/images/schools/school_4.jpg',
    schoolAddress: '150 Palm Grove St, Miami, FL 33101',
    city: 'Miami',
    postCode: '33101',
    schoolName: 'Palm Grove Montessori School',
    phoneNumber: '555-432-1234',
    schoolEmail: 'info@palmgrovemontessori.edu',
    latlng: { lat: 25.7617, lng: -80.1918 },
    schoolAbout:
      'Palm Grove Montessori offers a beachside learning environment where children can explore and grow in harmony with nature, fostering a deep love for learning.',
    age: '18 months - 12 years',
    numberOfStudents: 25,
    summerProgram: 'Yes',
    memberParents: 12,
    hiring: false,
    member: false,
    isPrivate: false,
    ourPrograms: [
      {
        programName: 'Toddler Discovery Program',
        ageGroup: '18 months - 3 years',
        description:
          'Children are encouraged to explore and interact with their surroundings, developing sensory and motor skills through guided activities.',
      },
      {
        programName: 'Preschool Program',
        ageGroup: '3 - 5 years',
        description:
          'An engaging curriculum that balances academic learning with creative play to promote cognitive and emotional development.',
      },
    ],
    ourFaculty: [
      {
        facultyName: 'Rebecca Young',
        role: 'Director',
        description:
          'Rebecca is dedicated to leading an educational environment that fosters curiosity and creativity in every child.',
        facultyImgUrl: '/assets/images/schools/faculty/image1.jpg',
      },
    ],
  },
  {
    id: uniqueId(),
    logoUrl: '/assets/images/schools/school_5.jpg',
    schoolAddress: '321 Elm Street, Boulder, CO 80301',
    city: 'Boulder',
    postCode: '80301',
    schoolName: 'Boulder Montessori Academy',
    phoneNumber: '555-567-8901',
    schoolEmail: 'contact@bouldermontessori.org',
    latlng: { lat: 40.015, lng: -105.2705 },
    schoolAbout:
      'Boulder Montessori Academy offers an immersive, student-led learning experience in a supportive environment, encouraging intellectual curiosity.',
    age: '18 months - 12 years',
    numberOfStudents: 22,
    summerProgram: 'No',
    memberParents: 9,
    hiring: true,
    member: false,
    isPrivate: true,
    ourPrograms: [
      {
        programName: 'Early Childhood Program',
        ageGroup: '18 months - 3 years',
        description:
          'Children engage in practical life skills, sensorial exploration, and social activities to develop independence and creativity.',
      },
      {
        programName: 'Elementary Program',
        ageGroup: '6 - 12 years',
        description:
          'Focuses on academic subjects while nurturing problem-solving skills, independence, and collaboration.',
      },
    ],
    ourFaculty: [
      {
        facultyName: 'Margaret Hughes',
        role: 'Lead Teacher - Elementary Program',
        description:
          'Margaret focuses on fostering critical thinking skills and collaborative learning in her classroom.',
        facultyImgUrl: '/assets/images/schools/faculty/image1.jpg',
      },
    ],
  },
];

mock.onGet('/api/schools').reply(() => [200, { schools }]);
