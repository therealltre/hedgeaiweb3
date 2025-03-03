import { mock } from '../utils/axios';
import wait from '../utils/fakeRequest';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import randomId from '../utils/randomId';
// import { v4 as uuidv4 } from 'uuid';


const users = [  
   {
    id: 'user12344',
    displayName: 'Randy Smith',
    email: 'tre@mail.com',
    imageUrl: '/assets/images/avatars/user-avatar.jpg',
    coverUrl: "/assets/images/covers/cover_12.jpg",
    phoneNumber: "+233502261784",
    country: "United States",
    address: "908 Jack Locks",
    state: "San Francisco",
    city: "Rancho ",
    zipCode: "85807",
    company: "Last Dynamite Inc",
    password: 'admin',
    about: 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar.',
    role: 'admin',
    jobtitle: 'Admin',
    isPublic: false

  
  },
  {
    id: 'user12343',
    displayName: 'Jane Doe',
    email: 'teacher@BoilerPlate.com',
    imageUrl: '/assets/images/avatars/user-avatar4.jpg',
    coverUrl: "/assets/images/covers/cover_14.jpg",
    phoneNumber: "+233502261784",
    country: "United States",
    address: "908 Jack Locks",
    state: "New York",
    city: "Rancho ",
    zipCode: "85807",
    company: "Last Dynamite Inc",
    password: 'teacher',
    about: 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar.',
    role: 'teacher',
    jobtitle: 'Math Teacher',
    isPublic: true    
  },
  {
    id: 'user12345',
    displayName: 'John Doe',
    email: 'school@BoilerPlate.com',
    imageUrl: '/assets/images/avatars/user-avatar2.jpg',
    coverUrl: "/assets/images/covers/cover_10.jpg",
    phoneNumber: "+233502261784",
    country: "United States",
    address: "908 Jack Locks",
    state: "Chicago",
    city: "Rancho ",
    zipCode: "85807",
    company: "Last Dynamite Inc",
    password: 'school',
    about: 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar.',
    role: 'school',
    jobtitle: 'Principal',
    isPublic: true  

  }
];

mock.onPost('/api/account/login').reply(async (config) => {
  await wait(1000);

  try {
    const { email, password } = JSON.parse(config.data);

    const user = users.find((_user) => _user.email === email);

    if (!user || user.password !== password) {
      return [
        400,
        { message: 'Verify that your email and password are correct' }
      ];
    }

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          imageUrl: user.imageUrl,
          coverUrl: user.coverUrl,
          phoneNumber: user.phoneNumber,
          country: user.country,
          address: user.address,
          state: user.state,
          city: user.city,
          zipCode: user.zipCode,
          company: user.company,       
          jobtitle: user.jobtitle,     
          role: user.role,
          about: user.about
        } 
   
      }
    ];
  } catch (err) {
    console.error('Error: ', err);
    return [500, { message: 'Encountered a server error' }];
  }
});

mock.onPost('/api/account/register').reply(async (config) => {
  await wait(1000);

  try {
    const { email, firstName, lastName, password } = JSON.parse(config.data);

    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, { message: 'This user already exists' }];
    }

    user = {
      id: randomId(),
      imageUrl: null,
      coverUrl: null,
      jobtitle: null,
      email,
      displayName: `${firstName} ${lastName}`,
      password,
      phoneNumber: null,
      country: null,
      address: null,
      state: null,
      city: null,
      zipCode: null,  
      role: 'user',
      about: null
    };

    users.push(user);

    const accessToken = sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          imageUrl: user.imageUrl,
          coverUrl: user.coverUrl,
          phoneNumber: user.phoneNumber,
          country: user.country,
          address: user.address,
          state: user.state,
          city: user.city,
          zipCode: user.zipCode,
          company: user.company,       
          jobtitle: user.jobtitle,     
          role: user.role,
          about: user.about
        }
      }
    ];
  } catch (err) {
    console.error('Error: ', err);
    return [500, { message: 'Encountered a server error' }];
  }
});

mock.onGet('/api/account/personal').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Auth token is missing' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = decode(accessToken);
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid auth token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          imageUrl: user.imageUrl,
          coverUrl: user.coverUrl,
          phoneNumber: user.phoneNumber,
          country: user.country,
          address: user.address,
          state: user.state,
          city: user.city,
          zipCode: user.zipCode,
          company: user.company,       
          jobtitle: user.jobtitle,     
          role: user.role,
          about: user.about
        }
      }
    ];
  } catch (err) {
    console.error('Error: ', err);
    return [500, { message: 'Encountered a server error' }];
  }
});
