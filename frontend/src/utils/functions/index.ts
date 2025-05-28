import axios from 'axios';
import { API_URL } from '@/config';
export const fetchPostsById = async (id: string) => {
  try {

    const response = await axios.get(`${API_URL}blog/getPostById/${id}`, { withCredentials: true });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch post:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}
