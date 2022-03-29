import { SET_BUN, SET_IDS, SET_TOPINGS, SET_TOTAL_SUM } from '../actions/burger-constructor';

export const initialState = {
  bun: null,
  topings: null,
  ids: null,
  total: null,
}

export function constructorReducer(state, { type, payload }) {
  switch (type) {
    case SET_BUN:
      return {
        ...state,
        bun: payload,
      }

    case SET_TOPINGS:
      return {
        ...state,
        topings: payload,
      }

    case SET_IDS:
      return {
        ...state,
        ids: payload,
      }

    case SET_TOTAL_SUM:
      return {
        ...state,
        total: payload,
      }

    default:
      throw new Error(`Неверный тип action: ${type}`);
  }
}
