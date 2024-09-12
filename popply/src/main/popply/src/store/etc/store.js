import { configureStore } from '@reduxjs/toolkit'
import permissionReducer from './permissions'

export default configureStore({
	reducer: {
		permission: permissionReducer
	}
})