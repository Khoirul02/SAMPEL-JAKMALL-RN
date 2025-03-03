import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ListServices from '../../services/list';
import { ListCategoryInterface } from '../../services/interface/listCategoryInterface';
import { ListDetailCategoryInterface } from '../../services/interface/listDetailCategoryInterface';

export const getListCategory = createAsyncThunk(
  'list/getListCategory',
  async (thunkAPI: {rejectWithValue: (arg0: any) => any}) => {
    try {
      let data: ListCategoryInterface;
      await ListServices.getListCategory().then(res => {
        data = res;
      });
      return {data: data};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getListDetailCategory = createAsyncThunk(
  'list/getListDetailCategory',
  async (
    params: {category: String; count: Number},
    thunkAPI: {rejectWithValue: (arg0: any) => any},
  ) => {
    try {
      let data: ListDetailCategoryInterface;
      await ListServices.getListDetailCategory(
        params.category,
        params.count,
      ).then(res => {
        data = res;
      });
      return {data: data};
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isLoading: true,
  listCategory: [],
  listDetailCategory: [],
  paramsCount: 2,
  modal: false,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
      builder
        .addCase(getListCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.listCategory = action.payload.data;
        })
        .addCase(getListCategory.rejected, state => {
          state.isLoading = false;
          state.listCategory = [];
        });
  },
});

// Action creators are generated for each case reducer function
export const {setLoading} = listSlice.actions;

const reducer = listSlice.reducer;
export default reducer;
