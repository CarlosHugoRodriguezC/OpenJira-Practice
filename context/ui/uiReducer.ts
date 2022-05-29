import { UIState } from './';

type UIActionType = {
  type:
    | 'UI - Open Sidebar'
    | 'UI - Close Sidebar'
    | 'UI - Adding Entry'
    | 'UI - Start dragging'
    | 'UI - Stop dragging';
  payload?: any;
};

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sideMenuOpen: true,
      };
    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false,
      };
    case 'UI - Adding Entry':
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case 'UI - Start dragging':
      return {
        ...state,
        isDragging: true,
      };
    case 'UI - Stop dragging':
      return {
        ...state,
        isDragging: false,
      };

    default:
      return state;
  }
};