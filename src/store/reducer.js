import * as actionTypes from "./actions";

const initialState = {
  news: {
    totalCount: 0,
    articles: [],
    selectedSourceId: "",
    page: 1
  },
  source: {
    sources: {},
    selectedSourceId: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS: {
      return {
        ...state,
        news: {
          ...state.news,
          ...action.news
        }
      };
    }
    case actionTypes.FETCH_SOURCE: {
      return {
        ...state,
        source: {
          ...state.source,
          ...action.source
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
