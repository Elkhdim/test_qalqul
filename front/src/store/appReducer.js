import authReducer from "./authReducer";
import  {combineReducers} from 'redux'


//import orderReducer from "./orderReducer";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage
  }
  
  const rootReducer = combineReducers({
    auth : authReducer
  })

export default persistReducer(persistConfig,rootReducer);
