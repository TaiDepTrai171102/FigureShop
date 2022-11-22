import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

export const PRODUCT_LIMIT = 5;

const initialState = {
  productState: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: PRODUCT_LIMIT,
      total: null,
      totalPage: null,
    },
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  fetchProductAction: (state, action) => {
      const {page, limit }= action.payload;
      
      state.productState = {
        ...state.productState,
        loading: true,
        pagination: {
          ...state.productState.pagination,
          page,
          limit,
        },
      };
    },
  fetchProductActionSuccess: (state, action) => {
      const { data, totalProduct } = action.payload;

      state.productState = {
        ...state.productState,
        data,
        loading: false,
        pagination: {
          ...state.productState.pagination,
          total: +totalProduct,
          totalPage: totalProduct / PRODUCT_LIMIT,
        },
      };
    },
  fetchProductActionFailed: (state, action) => {
      notification.error(action.payload);
    },
  addProductAction: (state, action) => {
      state.productState = {
        loading:true,
        ...state.productState,
      }
    },
  addProductSuccess: (state,action) => {
      state.productState = {
        ...state.productState,
        data: [action.payload.data,...state.productState.data],
        loading:false,
        pagination: {
          ...state.productState.pagination,
          total:state.productState.pagination.total +1,
        }
      }
    },
  addProductFailed: (state,action) => {
      
    },
  updateProductAction: (state, action) => {
      
      state.productState = {
        loading:true,
        ...state.productState,
      }
    },
  updateProductSuccess: (state, action) => {
      const productUpdate = action.payload;
      state.productState = {
        productUpdate: productUpdate,
        ...state.productState,
        loading:false,
        
      }
    },
  updateProductFailed: (state,action) => {
      
    },
  deleteProductAction: (state, action) => {
      state.productState = {
        loading:true,
        ...state.productState,
      }
    },
  deleteProductSuccess: (state, action) => {
      const newData = state.productState.data.filter(item => item !== action.payload)
      state.productState = {
        ...state.productState,
        data: newData,
        loading:false,
        pagination: {
          ...state.productState.pagination,
          total:state.productState.pagination.total - 1,
        }
      }
    },
  deleteProductFailed: (state,action) => {
      
    },
  searchProductAction: (state, action) => {
      const search = action.payload
      state.productState = {
          ...state.productState,
          search:search,
          loading: true
      }
  },
  searchProductActionSuccess: (state, action) => {
      const {search} = action.payload
      state.productState = {
          ...state.productState,
          search,
          loading: false
      }
  },
  searchProductActionFailed: (state, action) => {
      notification.error(action.payload)
  }
  },
});

export const {
  fetchProductAction,
  fetchProductActionSuccess,
  fetchProductActionFailed,
  addProductAction,
  addProductFailed,
  addProductSuccess,
  updateProductAction,
  updateProductSuccess,
  updateProductFailed,
  deleteProductAction,
  deleteProductSuccess,
  deleteProductFailed,
  searchProductAction,
  searchProductActionSuccess,
  searchProductActionFailed
} = productSlice.actions;

export const adminProductReducer = productSlice.reducer;
