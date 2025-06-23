import AsyncStorage from '@react-native-async-storage/async-storage';

interface StorageOptions {
  encrypt?: boolean;
  ttl?: number; // Time to live in milliseconds
}

interface StorageItem<T = any> {
  value: T;
  timestamp: number;
  ttl?: number;
}

class StorageServiceClass {
  private prefix = '@SuperAppBet:';

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async set<T>(key: string, value: T, options?: StorageOptions): Promise<void> {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        ttl: options?.ttl,
      };

      const serializedValue = JSON.stringify(item);
      await AsyncStorage.setItem(this.getKey(key), serializedValue);
    } catch (error) {
      console.error(`Error setting storage item "${key}":`, error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const serializedValue = await AsyncStorage.getItem(this.getKey(key));
      if (!serializedValue) {
        return null;
      }

      const item: StorageItem<T> = JSON.parse(serializedValue);

      // Check if item has expired
      if (item.ttl && Date.now() - item.timestamp > item.ttl) {
        await this.remove(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error(`Error getting storage item "${key}":`, error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Error removing storage item "${key}":`, error);
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const appKeys = keys.filter(key => key.startsWith(this.prefix));
      await AsyncStorage.multiRemove(appKeys);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(this.getKey(key));
      return value !== null;
    } catch (error) {
      console.error(`Error checking if storage has "${key}":`, error);
      return false;
    }
  }

  async getMultiple<T>(keys: string[]): Promise<Record<string, T | null>> {
    try {
      const prefixedKeys = keys.map(key => this.getKey(key));
      const keyValuePairs = await AsyncStorage.multiGet(prefixedKeys);
      
      const result: Record<string, T | null> = {};
      
      keyValuePairs.forEach(([prefixedKey, serializedValue], index) => {
        const originalKey = keys[index];
        
        if (serializedValue) {
          try {
            const item: StorageItem<T> = JSON.parse(serializedValue);
            
            // Check if item has expired
            if (item.ttl && Date.now() - item.timestamp > item.ttl) {
              result[originalKey] = null;
              this.remove(originalKey); // Remove expired item
            } else {
              result[originalKey] = item.value;
            }
          } catch {
            result[originalKey] = null;
          }
        } else {
          result[originalKey] = null;
        }
      });
      
      return result;
    } catch (error) {
      console.error('Error getting multiple storage items:', error);
      throw error;
    }
  }

  async setMultiple<T>(items: Record<string, T>, options?: StorageOptions): Promise<void> {
    try {
      const keyValuePairs: [string, string][] = Object.entries(items).map(([key, value]) => {
        const item: StorageItem<T> = {
          value,
          timestamp: Date.now(),
          ttl: options?.ttl,
        };
        
        return [this.getKey(key), JSON.stringify(item)];
      });
      
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error setting multiple storage items:', error);
      throw error;
    }
  }
}

export const StorageService = new StorageServiceClass();