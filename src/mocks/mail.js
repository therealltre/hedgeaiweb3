import { sample } from 'lodash';
// utils
import { mock } from "../utils/axios";
import _mock from "../_mock";

// ----------------------------------------------------------------------

const createLabelIds = (index) => {
  if (index === 1) {
    return ['id_promotions', 'id_forums'];
  }
  if (index === 2) {
    return ['id_forums'];
  }
  if (index === 5) {
    return ['id_social'];
  }
  return [];
};

const createAttachment = (index) => {
  if (index === 1) {
    return [_mock.image.feed(1), _mock.image.feed(2)];
  }
  if (index === 2) {
    return [
      'https://mail.google.com/mail/u/file1.docx',
      'https://mail.google.com/mail/u/file2.xlsx',
      'https://mail.google.com/mail/u/file3.pptx',
      'https://mail.google.com/mail/u/file7.sketch'
    ];
  }
  if (index === 5) {
    return [
      _mock.image.feed(1),
      _mock.image.feed(2),
      '/static/mock-images/avatars/avatar_12.mp4',
      'https://mail.google.com/mail/u/file1.docx',
      'https://mail.google.com/mail/u/file2.xlsx',
      'https://mail.google.com/mail/u/file3.pptx',
      'https://mail.google.com/mail/u/file4.pdf',
      'https://mail.google.com/mail/u/file5.psd',
      'https://mail.google.com/mail/u/file6.esp',
      'https://mail.google.com/mail/u/file7.sketch'
    ];
  }
  return [];
};

const FOLDER = ['promotions', 'spam', 'inbox', 'folder'];

// ----------------------------------------------------------------------

const labels = [
  { id: 'all', type: 'system', name: 'all mail', unreadCount: 3 },
  { id: 'inbox', type: 'system', name: 'inbox', unreadCount: 1 },
  { id: 'sent', type: 'system', name: 'sent', unreadCount: 0 },
  { id: 'drafts', type: 'system', name: 'drafts', unreadCount: 0 },
  { id: 'trash', type: 'system', name: 'trash', unreadCount: 0 },
  { id: 'spam', type: 'system', name: 'spam', unreadCount: 1 },
  { id: 'important', type: 'system', name: 'important', unreadCount: 1 },
  { id: 'starred', type: 'system', name: 'starred', unreadCount: 1 },
  {
    id: 'id_social',
    type: 'custom',
    name: 'social',
    unreadCount: 0,
    color: '#00AB55'
  },
  {
    id: 'id_promotions',
    type: 'custom',
    name: 'promotions',
    unreadCount: 2,
    color: '#1890FF'
  },
  {
    id: 'id_forums',
    type: 'custom',
    name: 'forums',
    unreadCount: 1,
    color: '#FFC107'
  }
];

const mails = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  labelIds: createLabelIds(index + 1),
  folder: sample(FOLDER),
  isImportant: _mock.boolean(index),
  isStarred: _mock.boolean(index),
  isUnread: _mock.boolean(index),
  subject: _mock.text.title(index),
  message: _mock.text.sentence(index),
  createdAt: _mock.time(index),
  files: createAttachment(index),
  from: {
    name: _mock.name.fullName(index),
    email: _mock.email(index),
    avatar:
      index === 1 || index === 2 || index === 5 || index === 6 || index === 8 ? null : _mock.image.avatar(index)
  },
  to: [
    {
      name: 'Jaydon Frankie',
      email: 'demo@minimals.cc',
      avatar: null
    }
  ]
}));

// ----------------------------------------------------------------------

const filterMails = (mails, labels, systemLabel, customLabel) => {
  if (customLabel) {
    const label = labels.find((_label) => _label.name === customLabel);
    if (!label) {
      return [];
    }
    return mails.filter((mail) => mail.labelIds.includes(label.id));
  }

  if (systemLabel === 'all') {
    return mails;
  }

  if (['starred', 'important'].includes(systemLabel)) {
    if (systemLabel === 'starred') {
      return mails.filter((mail) => mail.isStarred);
    }
    if (systemLabel === 'important') {
      return mails.filter((mail) => mail.isImportant);
    }
  }

  if (['inbox', 'sent', 'drafts', 'trash', 'spam', 'starred'].includes(systemLabel)) {
    return mails.filter((mail) => mail.folder === systemLabel);
  }

  return [];
};

// ----------------------------------------------------------------------

mock.onGet('/api/mail/labels').reply(200, { labels });

// ----------------------------------------------------------------------

mock.onGet('/api/mail/mails').reply((config) => {
  try {
    const { systemLabel, customLabel } = config.params;
    const filteredMails = filterMails(mails, labels, systemLabel, customLabel);
    return [200, { mails: filteredMails }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});

// ----------------------------------------------------------------------

mock.onGet('/api/mail/mail').reply((config) => {
  try {
    const { mailId } = config.params;
    const mail = mails.find((_mail) => _mail.id === mailId);
    if (!mail) {
      return [404, { message: 'Mail not found' }];
    }
    return [200, { mail }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
