import * as ExpoSecureStore from 'expo-secure-store';

const SecureStore = {
  get: async (key:string) => await ExpoSecureStore.getItemAsync(key),
  set: async (key:string, value:string) => await ExpoSecureStore.setItemAsync(key, value),
  delete: async (key:string) => await ExpoSecureStore.deleteItemAsync(key)
}

export default SecureStore;