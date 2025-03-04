import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import ListServices from '../../services/list';
import { ListCategoryInterface } from '../../services/interface/listCategoryInterface';
import { ListDetailCategoryInterface } from '../../services/interface/listDetailCategoryInterface';

export const getListCategory = createAsyncThunk<
  { data: ListCategoryInterface },
  void,
  { rejectValue: string }
>(
  'list/getListCategory',
  async (_, thunkAPI) => {
    try {
      const response = await ListServices.getListCategory();
      return { data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getListDetailCategory = createAsyncThunk<
  { data: ListDetailCategoryInterface },
  { category: string; count: number },
  { rejectValue: string }
>(
  'list/getListDetailCategory',
  async (params, thunkAPI) => {
    try {
      const response = await ListServices.getListDetailCategory(
        params.category,
        params.count,
      );
      return { data: response };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState: {
  isLoading: boolean;
  isLoadingDetail: boolean;
  isError: boolean;
  listCategory: string[];
  listDetailCategory: any[];
  paramsCount: number;
  modal: boolean;
  message: string;
  openList: string;
  refreshing: boolean;
} = {
  isLoading: true,
  isLoadingDetail: true,
  isError: false,
  listCategory: [],
  listDetailCategory: [],
  paramsCount: 2,
  modal: false,
  message: '',
  openList: '',
  refreshing: false,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setLoadingDetail: (state, action) => {
      state.isLoadingDetail = action.payload;
    },
    setOpenList: (state, action: PayloadAction<string>) => {
      state.openList = action.payload;
    },
    setListCategory: (state, action: PayloadAction<string[]>) => {
      state.listCategory = action.payload;
    },
    setListDetailCategory: (state, action: PayloadAction<any[]>) => {
      state.listDetailCategory = action.payload;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.data.error;
        state.listCategory = action.payload.data.categories;
        let arrayDetailCategory: any = [];
        action.payload.data.categories.map(() => {
          arrayDetailCategory.push([]);
        });
        state.listDetailCategory = arrayDetailCategory;
        state.message = action.payload.data.error ? 'Failed' : 'Succes';
      })
      .addCase(getListCategory.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.listCategory = [];
        state.message = 'Failed';
      })
      .addCase(getListDetailCategory.fulfilled, (state, action) => {
        state.isLoadingDetail = false;
        state.isError = action.payload.data.error;
        state.message = action.payload.data.error ? 'Failed' : 'Succes';
      })
      .addCase(getListDetailCategory.rejected, state => {
        state.isLoadingDetail = false;
        state.isError = true;
        state.message = 'Failed';
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoadingDetail,
  setListCategory,
  setOpenList,
  setRefreshing,
  setListDetailCategory,
} = listSlice.actions;

const reducer = listSlice.reducer;
export default reducer;
