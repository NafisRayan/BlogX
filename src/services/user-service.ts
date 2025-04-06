import { ApiResponse, User } from '../types/models';
import apiClient from './api-client';

interface CreateUserData {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

class UserService {
  // Get all users
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get('/users');
    return response.data;
  }

  // Get user by ID
  async getUser(id: string): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  // Create new user
  async createUser(data: CreateUserData): Promise<User> {
    const response = await apiClient.post('/users', data);
    return response.data;
  }

  // Update user
  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  }

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/users/${id}`);
  }

  // Get current user (placeholder - implement actual auth later)
  async getCurrentUser(): Promise<User | null> {
    try {
      // This should be replaced with actual authentication logic
      const users = await this.getUsers();
      return users[0] || null;
    } catch (error) {
      return null;
    }
  }
}

export default new UserService();
