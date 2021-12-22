import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {APP_URL} from '../../Config/Url/URL';
import {STATUS} from '../../Config/Status/Index';
import GetService from '../../Service/GetService';
import PostService from '../../Service/PostService';
import {uploadImageToStorage} from '../../common/PushImage';

const initialState = {
  listCar: [],
  status: false,
};

// First, create the thunk
export const getCar = createAsyncThunk('car', async (data) => {
  const params = {
    start: data.start,
    end: data.end,
  };
  var getService = new GetService();
  const response = await getService.getApiWithParam(APP_URL.GET_LIST_CAR, params);
  console.log(response);
  return response;
});

export const addCar = createAsyncThunk('car/add', async item => {
  const newList = await Promise.all(
    item.listColor.map(async element => {
      let el = {};
      await uploadImageToStorage(element.url, element.img)
        .then(res => {
          console.log(res);
          el = {
            url: res,
            color: element.color,
            numberInStore: element.numberInStore,
          };
        })
        .catch(() => {
          return;
        });
      return el;
    }),
  );
  const params = {
    name: item.name,
    category: item.category,
    width: item.width,
    height: item.height,
    length: item.length,
    description: item.description,
    color: item.color,
    price: item.prices,
    img: item.color[0].url,
  };
  console.log('params', params, newList);
  var postService = new PostService();
  // const response = await postService.postService(APP_URL.ADD_ITEM, params);
  // console.log(response);
  return null;
});

export const editCar = createAsyncThunk('car/update', async item => {
  const params = {
    name: item.name,
    category: item.category,
    width: item.width,
    height: item.height,
    length: item.length,
    description: item.description,
    color: item.color,
    price: item.prices,
    img: item.img,
  };
  var postService = new PostService();
  const response = await postService.PostAPI(APP_URL.UPDATE_ITEM, params);
  console.log(response);
  return response;
});

export const deleteCar = createAsyncThunk('car/remove', async item => {
  console.log(item);
  const params = {
    name: item,
  };
  var postService = new PostService();
  const response = await postService.PostAPI(APP_URL.REMOVE_ITEM, params);
  console.log(response);
  return response;
});

export const carReducer = createSlice({
  name: 'carReducer',
  initialState,
  reducers: {
    changeCarStatus: state => {
      state.status = false;
    },
    filterCar: (state, action) => {
      if (action.payload) {
        state.listCar = state.listCar.filter(item =>
          item.name.includes(action.payload),
        );
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(addCar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action && action.payload.status === STATUS.SUCCESS) {
        console.log('state -', state);
        state.status = action.payload.status;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(editCar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        console.log('state -', state);
        state.status = action.payload.status;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        console.log('state -', state);
        state.status = action.payload.status;
      } else {
        state.status = STATUS.FAIL;
      }
    });
    builder.addCase(getCar.fulfilled, (state, action) => {
      // Add user to the state array
      console.log('ACTION -', action);
      if (action.payload.status === STATUS.SUCCESS) {
        console.log('state -', state);
        state.listCar = action.payload.data;
      } else {
        state.status = STATUS.FAIL;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeCarStatus, filterCar} =
  carReducer.actions;

export const getListCar = state => {
  return state.CarReducer.listCar;
};

export default carReducer.reducer;
