import { ApiResponse, Comment, PaginatedResponse } from '../types/models';
import apiClient from './api-client';

interface CreateCommentData {
  blogId: string;
  userId: string;
  content: string;
}

interface UpdateCommentData {
  content: string;
}

class CommentService {
  async getComments(blogId: string, page = 1, limit = 10): Promise<PaginatedResponse<Comment>> {
    return apiClient.get(`/comments/blog/${blogId}`, {
      params: { page, limit }
    });
  }

  async createComment(data: CreateCommentData): Promise<ApiResponse<Comment>> {
    return apiClient.post('/comments', data);
  }

  async updateComment(id: string, data: UpdateCommentData): Promise<ApiResponse<Comment>> {
    return apiClient.put(`/comments/${id}`, data);
  }

  async deleteComment(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/comments/${id}`);
  }
}

export default new CommentService();
