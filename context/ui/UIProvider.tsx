import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_STATE_INITIAL: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_STATE_INITIAL);

  const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' });

  const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' });

  const setIsAddingEntry = (isAdding: boolean) =>
    dispatch({ type: 'UI - Adding Entry', payload: isAdding });

  const startDragging = () => dispatch({ type: 'UI - Start dragging' });

  const stopDragging = () => dispatch({ type: 'UI - Stop dragging' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        // * METHODS
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDragging,
        stopDragging,
      }}>
      {children}
    </UIContext.Provider>
  );
};
