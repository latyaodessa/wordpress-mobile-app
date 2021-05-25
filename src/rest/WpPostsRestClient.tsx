import axios, {AxiosResponse} from "axios";
import {WpCategoryType} from "../types/WpCategoryType";
import {WpMediaType} from "../types/WpMediaType";
import {WpPostType} from "../types/WpPostType";

const WPRestClient = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


WPRestClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {

      switch (error?.response?.status) {
        case 500:
        case 404:
        case 401:
        case 403:
          alert(`Can not reach Wordpress website (Status: ${error.response.status}). Please try another one` + error?.request?.responseURL);
          break;
        default:
          break;
      }

      return Promise.reject(error);
    }
);


export function getPosts(wpUrl: string, page: number, searchQuery: string, categoryId?: number): Promise<AxiosResponse<Array<WpPostType>>> {
  const categoriesQuery = categoryId ? `categories=${categoryId}` : '';
  return WPRestClient.get(`${wpUrl}/wp-json/wp/v2/posts?_embed&per_page=10&page=${page}&search=${searchQuery}&${categoriesQuery}`)
}

export function getPostById(wpUrl: string, id: number): Promise<AxiosResponse<WpPostType>> {
  return WPRestClient.get(`${wpUrl}/wp-json/wp/v2/posts/${id}`)
}

export function getCategories(wpUrl: string): Promise<AxiosResponse<Array<WpCategoryType>>> {
  return WPRestClient.get(`${wpUrl}/wp-json/wp/v2/categories?per_page=100`)
}

export function getMedia(wpUrl: string, parent: number): Promise<AxiosResponse<Array<WpMediaType>>> {
  return WPRestClient.get(`${wpUrl}/wp-json/wp/v2/media?media_type=image&per_page=100&parent=${parent}`)
}

