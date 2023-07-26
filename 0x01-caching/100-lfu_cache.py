# Create a class LFUCache that inherits from BaseCaching and is a caching system
#!/usr/bin/env python3
''' LFUCache class inherits from BaseCaching and is a caching system '''
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    ''' LFUCache class inherits from BaseCaching and is a caching system '''

    def __init__(self):
        ''' Initialize class LFUCache '''
        super().__init__()
        self.freq = {}
        self.freq_list = []

    def put(self, key, item):
        ''' Add an item in the cache '''
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            self.freq[key] += 1
            self.freq_list.append(key)
        else:
            if len(self.cache_data) >= self.MAX_ITEMS:
                least_freq = self.freq[self.freq_list[0]]
                least_freq_key = self.freq_list[0]
                for key in self.freq:
                    if self.freq[key] < least_freq:
                        least_freq = self.freq[key]
                        least_freq_key = key
                del self.cache_data[least_freq_key]
    def get(self, key):
        ''' Get an item by key '''
        if key is None or key not in self.cache_data:
            return None
        self.freq[key] += 1
        self.freq_list.append(key)
        return self.cache_data[key]
