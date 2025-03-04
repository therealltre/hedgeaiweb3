import { sample } from 'lodash';

import { mock } from '../utils/axios';

let users = [
  {
    id: "1",
    displayName: "Randy Smith",
    email: "admin@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_1.jpg",
    phoneNumber: "+1234567890",
    country: "United States",
    address: "908 Jack Locks",
    state: "California",
    city: "San Francisco",
    zipCode: "94103",
    company: "Bay Area Montessori School",
    password: "admin",
    about: " ",
    role: "admin",
    jobtitle: "Admin",
    isPublic: false,
    cover: "/assets/images/covers/cover_8.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "2",
    displayName: "Jane Doe",
    email: "jane.doe@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_2.jpg",
    phoneNumber: "+447123456789",
    country: "United Kingdom",
    address: "123 Elm Street",
    state: "London",
    city: "London",
    zipCode: "SW1A 1AA",
    company: "London Bridge Montessori School",
    password: "password1",
    about: " ",
    role: "teacher",
    jobtitle: "Math Teacher",
    isPublic: true,
    cover: "/assets/images/covers/cover_23.jpg",
    isVerified: false,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "3",
    displayName: "John Brown",
    email: "john.brown@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_3.jpg",
    phoneNumber: "+14161234567",
    country: "Canada",
    address: "456 Maple Avenue",
    state: "Ontario",
    city: "Toronto",
    zipCode: "M5H 2N2",
    company: "Toronto Montessori School",
    password: "password2",
    about: " ",
    role: "teacher",
    jobtitle: "Science Teacher",
    isPublic: true,
    cover: "/assets/images/covers/cover_1.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "4",
    displayName: "Emily White",
    email: "emily.white@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_4.jpg",
    phoneNumber: "+61234567890",
    country: "Australia",
    address: "789 Oak Drive",
    state: "New South Wales",
    city: "Sydney",
    zipCode: "2000",
    company: "Sydney Montessori School",
    password: "password3",
    about: " ",
    role: "student",
    jobtitle: "Senior Student",
    isPublic: true,
    cover: "/assets/images/covers/cover_3.jpg",
    isVerified: false,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "5",
    displayName: "Michael Green",
    email: "michael.green@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_5.jpg",
    phoneNumber: "+33123456789",
    country: "France",
    address: "321 Pine Lane",
    state: "Île-de-France",
    city: "Paris",
    zipCode: "75001",
    company: "Paris Montessori School",
    password: "password4",
    about: " ",
    role: "student",
    jobtitle: "Junior Student",
    isPublic: true,
    cover: "/assets/images/covers/cover_9.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "6",
    displayName: "Sarah Black",
    email: "sarah.black@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_6.jpg",
    phoneNumber: "+492123456789",
    country: "Germany",
    address: "654 Cedar Street",
    state: "Bavaria",
    city: "Munich",
    zipCode: "80331",
    company: "Munich Montessori School",
    password: "password5",
    about: " ",
    role: "admin",
    jobtitle: "Admin",
    isPublic: false,
    cover: "/assets/images/covers/cover_6.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "7",
    displayName: "David Blue",
    email: "david.blue@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_7.jpg",
    phoneNumber: "+81312345678",
    country: "Japan",
    address: "987 Birch Road",
    state: "Tokyo",
    city: "Tokyo",
    zipCode: "100-0001",
    company: "Tokyo Montessori School",
    password: "password6",
    about: " ",
    role: "teacher",
    jobtitle: "History Teacher",
    isPublic: true,
    cover: "/assets/images/covers/cover_20.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "8",
    displayName: "Laura Purple",
    email: "laura.purple@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_8.jpg",
    phoneNumber: "+551123456789",
    country: "Brazil",
    address: "852 Willow Court",
    state: "São Paulo",
    city: "São Paulo",
    zipCode: "01000-000",
    company: "São Paulo Montessori School",
    password: "password7",
    about: " ",
    role: "student",
    jobtitle: "Freshman Student",
    isPublic: true,
    cover: "/assets/images/covers/cover_12.jpg",
    isVerified: false,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "9",
    displayName: "Chris Red",
    email: "chris.red@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_9.jpg",
    phoneNumber: "+27123456789",
    country: "South Africa",
    address: "159 Ash Avenue",
    state: "Gauteng",
    city: "Johannesburg",
    zipCode: "2000",
    company: "Johannesburg Montessori School",
    password: "password8",
    about: " ",
    role: "teacher",
    jobtitle: "PE Teacher",
    isPublic: true,
    cover: "/assets/images/covers/cover_14.jpg",
    isVerified: false,
    status: sample(['active', 'inactive']) || 'active',
  },
  {
    id: "10",
    displayName: "Anna Yellow",
    email: "anna.yellow@BoilerPlate.com",
    imageUrl: "/assets/images/avatars/avatar_10.jpg",
    phoneNumber: "+86123456789",
    country: "China",
    address: "753 Spruce Boulevard",
    state: "Beijing",
    city: "Beijing",
    zipCode: "100000",
    company: "Beijing Montessori School",
    password: "password9",
    about: " ",
    role: "student",
    jobtitle: "Sophomore Student",
    isPublic: true,
    cover: "/assets/images/covers/cover_10.jpg",
    isVerified: true,
    status: sample(['active', 'inactive']) || 'active',
  }
]
;

mock.onGet('/api/users').reply(() => [200, { users }]);

mock.onGet('/api/user').reply((config) => {
  const { userId } = config.params;
  const user = users.find((_user) => _user.id === userId);

  return [200, { user }];
});
