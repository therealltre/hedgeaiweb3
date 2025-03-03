import { mock } from '../utils/axios';

let staffs = [
  {
    id: '1',
    displayName: 'Rafael Kunde',
    avatar: '/assets/images/avatars/user-avatar.jpg',
    email: 'Monte.Auer31@yahoo.com',
    jobtitle: 'Product Infrastructure Associate',
    username: 'Delphia22',
    location: 'Gislasonchester',
    role: 'principal',
    coverImg: "/assets/images/covers/cover_17.jpg",
    followers: '667',
    aboutMe: 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.',
    posts: '8',
    phoneNumber: '123-456-7890',
    workExperience: [
      {
        jobTitle: 'Head of Teaching and Learning',
        company: 'Gislasonchester Educational Group',
        school: 'Gislasonchester High School',
        duration: '2018 - 2021',
        responsibilities: 'Oversaw curriculum development and teacher training, improving student outcomes by 15%.'
      },
      {
        jobTitle: 'Senior Teacher',
        company: 'Starlight Educational Services',
        school: 'Starlight Elementary School',
        duration: '2015 - 2018',
        responsibilities: 'Led classroom instruction for grades 5-6, focusing on student engagement and personalized learning.'
      }
    ]
  },
  {
    id: '2',
    displayName: 'Madeline Pagac',
    avatar: '/assets/images/avatars/avatar_1.jpg',
    email: 'Francis64@gmail.com',
    jobtitle: 'Internal Configuration Planner',
    username: 'Odessa_Goodwin38',
    location: 'Flaviomouth',
    role: 'vice_principal',
    coverImg: "/assets/images/covers/cover_15.jpg",
    followers: '375',
    aboutMe: 'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat.',
    posts: '11',
    phoneNumber: '987-654-3210',
    workExperience: [
      {
        jobTitle: 'Vice Principal',
        company: 'Flaviomouth Educational Group',
        school: 'Flaviomouth Academy',
        duration: '2017 - 2020',
        responsibilities: 'Assisted the principal in administrative duties, including teacher evaluations and school operations.'
      },
      {
        jobTitle: 'Head Teacher',
        company: 'Bright Future Schooling Ltd.',
        school: 'Bright Future School',
        duration: '2013 - 2017',
        responsibilities: 'Coordinated the teaching staff, developed lesson plans, and ensured adherence to the curriculum.'
      }
    ]
  },
  {
    id: '3',
    displayName: 'Okey Turner V',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    email: 'Alexys.Frami91@hotmail.com',
    jobtitle: 'Regional Division Analyst',
    username: 'Ross_Reichert',
    location: 'Derekmouth',
    role: 'teacher',
    coverImg: "/assets/images/covers/cover_18.jpg",
    followers: '6333',
    aboutMe: 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    posts: '23',
    phoneNumber: '456-789-1234',
    workExperience: [
      {
        jobTitle: 'Mathematics Teacher',
        company: 'Derekmouth Educational Solutions',
        school: 'Derekmouth Middle School',
        duration: '2019 - 2022',
        responsibilities: 'Taught mathematics to grades 7-8, developed innovative lesson plans, and improved student performance.'
      },
      {
        jobTitle: 'STEM Instructor',
        company: 'Innovative Academy Inc.',
        school: 'Innovative Academy',
        duration: '2016 - 2019',
        responsibilities: 'Led STEM education initiatives, focusing on project-based learning for middle school students.'
      }
    ]
  },
  {
    id: '4',
    displayName: 'Modesta Sauer',
    avatar: '/assets/images/avatars/avatar_3.jpg',
    email: 'Susan_Wolff@hotmail.com',
    jobtitle: 'Lead Communications Consultant',
    username: 'Sincere46',
    location: 'Josieview',
    role: 'teacher',
    coverImg: "/assets/images/covers/cover_22.jpg",
    followers: '1876',
    aboutMe: 'Phasellus in felis. Donec semper sapien a libero. Nam dui.',
    posts: '362',
    phoneNumber: '321-654-9870',
    workExperience: [
      {
        jobTitle: 'Lead English Teacher',
        company: 'Josieview School Group',
        school: 'Josieview High School',
        duration: '2016 - 2021',
        responsibilities: 'Led the English department, developed school-wide literacy initiatives, and mentored new teachers.'
      },
      {
        jobTitle: 'English Teacher',
        company: 'Elmwood Schools Corp.',
        school: 'Elmwood Middle School',
        duration: '2012 - 2016',
        responsibilities: 'Taught English to grades 6-8, focusing on reading comprehension and creative writing.'
      }
    ]
  },
  {
    id: '5',
    displayName: 'Oma Bogisich',
    avatar: '/assets/images/avatars/avatar_4.jpg',
    email: 'Demetris88@hotmail.com',
    jobtitle: 'Teacher Implementation Strategist',
    username: 'Prince.Bergnaum',
    location: 'East Alexander',
    role: 'teacher',
    coverImg: "/assets/images/covers/cover_20.jpg",
    followers: '6513',
    aboutMe: 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar.',
    posts: '94',
    phoneNumber: '654-321-7890',
    workExperience: [
      {
        jobTitle: 'Curriculum Implementation Specialist',
        company: 'East Alexander Educational Services',
        school: 'East Alexander School District',
        duration: '2017 - 2021',
        responsibilities: 'Developed and implemented new curriculum across multiple schools in the district.'
      },
      {
        jobTitle: 'Grade 5 Teacher',
        company: 'Sunrise Education Services',
        school: 'Sunrise Elementary',
        duration: '2013 - 2017',
        responsibilities: 'Taught general subjects to grade 5 students, focusing on interactive and collaborative learning.'
      }
    ]
  },
  {
    id: '6',
    displayName: 'Wade Heathcote',
    avatar: '/assets/images/avatars/avatar_5.jpg',
    email: 'Elissa.Ortiz50@hotmail.com',
    jobtitle: 'Regional Markets Assistant',
    username: 'Camylle.Nicolas33',
    location: 'Gaetanoside',
    role: 'teacher',
    coverImg: "/assets/images/covers/cover_19.jpg",
    followers: '492',
    aboutMe: 'Nam congue, risus semper porta volutpat.',
    posts: '38',
    phoneNumber: '321-987-6540',
    workExperience: [
      {
        jobTitle: 'Social Studies Teacher',
        company: 'Gaetanoside School District',
        school: 'Gaetanoside High School',
        duration: '2016 - 2022',
        responsibilities: 'Developed engaging lessons on history, geography, and civics for grades 9-12.'
      },
      {
        jobTitle: 'Grade 8 Teacher',
        company: 'Liberty Education Group',
        school: 'Liberty Middle School',
        duration: '2013 - 2016',
        responsibilities: 'Taught social studies and coordinated school trips to historical sites.'
      }
    ]
  }
  // Continue with other staff members...
];

mock.onGet('/api/staffs').reply(() => [200, { staffs }]);

mock.onGet('/api/staff').reply((config) => {
  const { staffId } = config.params;
  const staff = staffs.find((_staff) => _staff.id === staffId);

  return [200, { staff }];
});
