import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './reducer/menuSlice'
import sideMenuBarReducer from './reducer/sideMenuBarSlice'
import topMenuSlice from './reducer/topMenuSlice'
import brandSlice from './reducer/brandSlice';

export const store = configureStore({
  reducer: {
    'sideMenuBar':sideMenuBarReducer,
    'topmenu':topMenuSlice,
    'brands':brandSlice,
    'menus':menuSlice
  },
})