import { createSlice } from '@reduxjs/toolkit'

const permission = createSlice({
  name: 'permission',
  initialState: {permission:['user']},
  reducers : {
	  setPermissions(state, action) {
		  switch(action.payload){
			  case 1:
				  state.permission.push('admin');
				  break;
			  case 2:
				  state.permission.push('planner');
				  break;
			  case 3:
				  state.permission.push('entrepreneur');
				  break;
			  default:
				  break;
		  }
	  }
  }
})
export const { setPermissions } = permission.actions

export default permission.reducer