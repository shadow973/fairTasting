import AsyncStorage from '@react-native-async-storage/async-storage';

const SecureStore = {
  get: async (key:string) => await AsyncStorage.getItem(key),
  set: async (key:string, value:string) => await AsyncStorage.setItem(key, value),
  delete: async (key:string) => await AsyncStorage.removeItem(key),
}

export default SecureStore;