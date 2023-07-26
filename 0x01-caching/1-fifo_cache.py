#!/usr/bin/env python3
'''FIFOCache class inherits from BaseCaching and is a caching system'''
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    '''FIFOCache class inherits from BaseCaching and is a caching system'''

    def __init__(self):
        '''Initialization of the class'''
        super().__init__()

    def put(self, key, item):
        '''Add an item in the cache'''
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                first_key = list(self.cache_data.keys())[0]
                print('DISCARD: {}'.format(first_key))
                del self.cache_data[first_key]

    def get(self, key):
        '''Get an item by key'''
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        return None
