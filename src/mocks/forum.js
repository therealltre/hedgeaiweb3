import { mock } from '../utils/axios';
import { subHours } from 'date-fns';

let forumPosts = [
  {
    id: '1',
    title: 'What are some effective activities for toddlers at home?',
    postBody: 'I am looking for creative and engaging activities to keep toddlers entertained and learning at home. Any suggestions or tips would be greatly appreciated!',
    authorId: 'user12345',
    authorName: 'Sarah Connor',
    authorImage: '/assets/images/avatars/avatar_2.jpg',
    postedAt: subHours(new Date(), 5).getTime(),
    editedAt: subHours(new Date(), 2).getTime(),
    attachments: '/assets/images/forum/post_3.jpg',
    likesCount: 24,
    commentsCount: 5,
    replies: [
      {
        replyId: '1-1',
        replyAuthorId: 'user12344',
        replyContent: 'I recommend Montessori puzzles and sorting games!',
        replyAuthorName: 'John Doe',
        replyAuthorImage: '/assets/images/avatars/avatar_11.jpg',
        repliedAt: subHours(new Date(), 4).getTime(),
      },
      {
        replyId: '1-2',
        replyContent: 'Outdoor play is great for toddlers too!',
        replyAuthorName: 'Jane Smith',
        replyAuthorImage: '/assets/images/avatars/avatar_3.jpg',
        repliedAt: subHours(new Date(), 3).getTime(),
      },
    ],
  },
  {
    id: '2',
    title: 'How do you handle screen time for preschoolers?',
    postBody: 'Screen time can be tricky to manage for preschoolers. What strategies do you use to ensure it is educational and not excessive?',
    authorId: 'user12344',
    authorName: 'Emily Davis',
    authorImage: '/assets/images/avatars/avatar_14.jpg',
    postedAt: subHours(new Date(), 10).getTime(),
    editedAt: null,
    attachments: '/assets/images/forum/post_2.jpg',
    likesCount: 42,
    commentsCount: 8,
    replies: [
      {
        replyId: '2-1',
        replyAuthorId: 'user12345',
        replyContent: 'We limit it to 1 hour of educational content daily.',
        replyAuthorName: 'Alice Brown',
        replyAuthorImage: '/assets/images/avatars/avatar_12.jpg',
        repliedAt: subHours(new Date(), 9).getTime(),
      },
      {
        replyId: '2-2',
        replyContent: 'Interactive story apps can be a good option.',
        replyAuthorName: 'Michael Johnson',
        replyAuthorImage: '/assets/images/avatars/avatar_10.jpg',
        repliedAt: subHours(new Date(), 8).getTime(),
      },
    ],
  },
  {
    id: '3',
    title: 'Best healthy snack ideas for kids?',
    postBody: 'Looking for healthy and easy-to-prepare snack ideas for kids that they will actually enjoy. Share your favorites!',
    authorId: 'user12343',
    authorName: 'David Wilson',
    authorImage: '/assets/images/avatars/avatar_3.jpg',
    postedAt: subHours(new Date(), 20).getTime(),
    editedAt: subHours(new Date(), 15).getTime(),
    attachments: '',
    likesCount: 38,
    commentsCount: 10,
    replies: [
      {
        replyId: '3-1',
        replyAuthorId: 'user12345',
        replyContent: 'Fruit skewers and yogurt dips are a hit in my home.',
        replyAuthorName: 'Laura White',
        replyAuthorImage: '/assets/images/avatars/avatar_8.jpg',
        repliedAt: subHours(new Date(), 18).getTime(),
      },
      {
        replyId: '3-2',
        replyContent: 'Try homemade granola bars for a quick snack.',
        replyAuthorName: 'Paul Green',
        replyAuthorImage: '/assets/images/avatars/avatar_21.jpg',
        repliedAt: subHours(new Date(), 17).getTime(),
      },
    ],
  },
];

mock.onGet('/api/forums').reply(() => [200, { forumPosts }]);

mock.onGet('/api/forum').reply((config) => {
  const { forumId } = config.params;
  const forum = forumPosts.find((_forum) => _forum.id === forumId);

  return [200, { forum }];
});
