#!/usr/bin/env python3
''' LFUCache class inherits from BaseCaching and is a caching system '''
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    ''' LFUCache class inherits from BaseCaching and is a caching system '''

    def __init__(self):
        ''' Initialization '''
        super().__init__()
        self.queue = []
        self.count = {}

    def put(self, key, item):
        ''' Add an item in the cache '''
        if key is not None and item is not None:
            if key in self.cache_data:
                self.queue.remove(key)
                self.count[key] += 1
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discard = self.queue.pop(0)
                del self.cache_data[discard]
                del self.count[discard]
                print('DISCARD: {}'.format(discard))
            self.queue.append(key)
            self.cache_data[key] = item
            self.count[key] = 1

    def get(self, key):
        ''' Get an item by key '''
        if key is not None and key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            self.count[key] += 1
            return self.cache_data[key]
        return None
