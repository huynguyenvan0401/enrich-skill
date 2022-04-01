import { FETCH_DATA, SAVE_DATA, DELETE_DATA, ADD_DATA } from 'actions/types';

const initialState: any[] = [];
export default function (state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    case SAVE_DATA: {
      const data = action.payload;
      return state.map((repo) =>
        repo.id === data.id
          ? {
              ...repo,
              name: data.name,
              description: data.description,
              watchers_count: data.watchers,
              language: data.language,
              open_issues: data.openIssues,
              private: data.private,
            }
          : repo
      );
    }
    case DELETE_DATA: {
      return state.filter((repo) => repo.id !== action.payload.id);
    }
    case ADD_DATA: {
      const data = action.payload;
      return [
        {
          id: data.id,
          name: data.name,
          description: data.description,
          watchers_count: data.watchers,
          language: data.language,
          open_issues: data.openIssues,
          private: data.private,
        },
        ...state,
      ];
    }
    default:
      return state;
  }
}
