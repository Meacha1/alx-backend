#!/usr/bin/env python3
'''Simple pagination'''

from 0-simple_helper_function import index_range
from typing import List, Tuple

class Server:
    def __init__(self) -> None:
        """Initialize data."""
        self.__dataset = list(range(1, 9))
    
    def get_page(self, page: int = 1, page_size: int = 2) -> List[int]:
        '''Get page'''
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        return self.__dataset[start:end]
