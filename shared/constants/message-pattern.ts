export const MESSAGE = {
  PUBLIC_DATA: {
    POST_CATEGORY: {
      GET_ALL_POST_CATEGORY: { cmd: 'get-all-post-category' },
      GET_ONE_POST_CATEGORY: { cmd: 'get-one-post-category' },
    },

    POSITION_CATEGORY: {
      GET_ALL_POSITION_CATEGORY: { cmd: 'get-all-position-category' },
      GET_ONE_POSITION_CATEGORY: { cmd: 'get-one-position-category' },
    },

    PROJECT_CATEGORY: {
      GET_ALL_PROJECT_CATEGORY: { cmd: 'get-all-project-category' },
      GET_ONE_PROJECT_CATEGORY: { cmd: 'get-one-project-category' },
    },

    STACK_CATEGORY: {
      GET_ALL_STACK_CATEGORY: { cmd: 'get-all-stack-category' },
      GET_ONE_STACK_CATEGORY: { cmd: 'get-one-stack-category' },
    },

    CAREER_CATEGORY: {
      GET_ALL_CAREER_CATEGORY: { cmd: 'get-all-career-category' },
      GET_ONE_CAREER_CATEGORY: { cmd: 'get-one-career-category' },
    },
  },

  POST_DATA: {
    POST: {
      GET_ALL_POST: { cmd: 'get-all-post' },
      GET_ONE_POST: { cmd: 'get-one-post' },
      CREATE_POST: { cmd: 'create-post' },
      UPDATE_POST: { cmd: 'update-post' },
      DELETE_POST: { cmd: 'delete-post' },
    },
  },

  CHAT: {
    CREATE_CHAT_ROOM: { cmd: 'create-chat-room' },
    GET_CHAT_ROOMS: { cmd: 'get-chat-rooms' },
    GET_CHAT_ROOM: { cmd: 'get-chat-room' },
    GET_CHAT_LIST: { cmd: 'get-chat-list' },
  },

  USER: {
    CREATE_USER: { cmd: 'create-user' },
    FIND_USER_BY_EMAIL: { cmd: 'find-user-by-email' },
    LOGIN_OR_CREATE_USER: { cmd: 'login-or-create-user' },
  },
} as const;
