import { FETCH_DATA, SAVE_DATA, DELETE_DATA, ADD_DATA } from 'actions/types';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({
  length: 7,
  dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
});

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
      const id = uid();
      return [
        {
          id,
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
