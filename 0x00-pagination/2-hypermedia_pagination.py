#!/usr/bin/env python3
'''Hypermedia pagination'''

from typing import List, Dict
from math import ceil
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    '''
    takes two integers and returns the tuple of size size two containing
    a start index and an end index corresponding to the range of indexes
    to return in a list for those particular pagination parameters.
    '''
    return ((page - 1) * page_size, page * page_size)


def get_page(page: int, page_size: int) -> List:
    """Get a page of the dataset"""
    assert type(page) == int and page > 0
    assert type(page_size) == int and page_size > 0

    index = index_range(page, page_size)
    return [item for item in range(*index)]


def get_hyper(page: int = 1, page_size: int = 10) -> Dict:
  """Return a dictionary for pagination"""

  data = get_page(page, page_size)

  total_pages = ceil(len(data) / page_size)

  next_page = page + 1 if page < total_pages else None
  prev_page = page - 1 if page > 1 else None

  return {
    'page_size': len(data),
    'page': page,
    'data': data,
    'next_page': next_page,
    'prev_page': prev_page,
    'total_pages': total_pages
  }
