import axios, {AxiosResponse} from "axios";
import {WpCategoryType} from "../types/WpCategoryType";
import {WpMediaType} from "../types/WpMediaType";
import {WpPostType} from "../types/WpPostType";

const WP_URL = "https://blog.ted.com";

export function getPosts(page: number, searchQuery: string, categoryId?: number): Promise<AxiosResponse<Array<WpPostType>>> {
  const categoriesQuery = categoryId ? `categories=${categoryId}` : '';
  return axios.get(`${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=10&page=${page}&search=${searchQuery}&${categoriesQuery}`)
}

export function getPages(page: number, searchQuery: string): Promise<AxiosResponse<Array<WpPostType>>> {
  return axios.get(`${WP_URL}/wp-json/wp/v2/pages?_embed&per_page=10&page=${page}&search=${searchQuery}`)
}


export function getPostById(id: number): Promise<AxiosResponse<WpPostType>> {
  return axios.get(`${WP_URL}/wp-json/wp/v2/posts/${id}`)
}

export function getImagesByPostId(parent: number): Promise<AxiosResponse<Array<WpMediaType>>> {
  return axios.get(`${WP_URL}/wp-json/wp/v2/media?media_type=image&parent=${parent}`)
}

export function getCategories(): Promise<AxiosResponse<Array<WpCategoryType>>> {
  return axios.get(`${WP_URL}/wp-json/wp/v2/categories?per_page=100`)
}

