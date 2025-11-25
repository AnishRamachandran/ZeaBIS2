const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  auth = {
    register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
      this.post('/auth/register', data),
    login: (data: { email: string; password: string }) =>
      this.post('/auth/login', data),
    logout: () => this.post('/auth/logout'),
    getCurrentUser: () => this.get('/auth/me'),
  };

  customers = {
    getAll: () => this.get('/customers'),
    getById: (id: string) => this.get(`/customers/${id}`),
    create: (data: any) => this.post('/customers', data),
    update: (id: string, data: any) => this.put(`/customers/${id}`, data),
    delete: (id: string) => this.delete(`/customers/${id}`),
    getProjects: (id: string) => this.get(`/customers/${id}/projects`),
  };

  employees = {
    getAll: () => this.get('/employees'),
    getById: (id: string) => this.get(`/employees/${id}`),
    create: (data: any) => this.post('/employees', data),
    update: (id: string, data: any) => this.put(`/employees/${id}`, data),
    updateStatus: (id: string, active: boolean) => this.patch(`/employees/${id}/status`, { active }),
    getTimesheets: (id: string) => this.get(`/employees/${id}/timesheets`),
    getProjects: (id: string) => this.get(`/employees/${id}/projects`),
  };

  projects = {
    getAll: (filters?: { status?: string; customerId?: string }) => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.customerId) params.append('customerId', filters.customerId);
      const query = params.toString();
      return this.get(`/projects${query ? `?${query}` : ''}`);
    },
    getById: (id: string) => this.get(`/projects/${id}`),
    create: (data: any) => this.post('/projects', data),
    update: (id: string, data: any) => this.put(`/projects/${id}`, data),
    updateStatus: (id: string, status: string) => this.patch(`/projects/${id}/status`, { status }),
    getTeam: (id: string) => this.get(`/projects/${id}/team`),
    addTeamMember: (id: string, data: any) => this.post(`/projects/${id}/team`, data),
    removeTeamMember: (id: string, employeeId: string) => this.delete(`/projects/${id}/team/${employeeId}`),
  };

  timesheets = {
    getAll: (filters?: { employeeId?: string; projectId?: string }) => {
      const params = new URLSearchParams();
      if (filters?.employeeId) params.append('employeeId', filters.employeeId);
      if (filters?.projectId) params.append('projectId', filters.projectId);
      const query = params.toString();
      return this.get(`/timesheets${query ? `?${query}` : ''}`);
    },
    getById: (id: string) => this.get(`/timesheets/${id}`),
    create: (data: any) => this.post('/timesheets', data),
    update: (id: string, data: any) => this.put(`/timesheets/${id}`, data),
    delete: (id: string) => this.delete(`/timesheets/${id}`),
  };

  invoices = {
    getAll: (filters?: { status?: string; poId?: string }) => {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.poId) params.append('poId', filters.poId);
      const query = params.toString();
      return this.get(`/invoices${query ? `?${query}` : ''}`);
    },
    getById: (id: string) => this.get(`/invoices/${id}`),
    create: (data: any) => this.post('/invoices', data),
    update: (id: string, data: any) => this.put(`/invoices/${id}`, data),
    updateStatus: (id: string, status: string) => this.patch(`/invoices/${id}/status`, { status }),
    getDetails: (id: string) => this.get(`/invoices/${id}/details`),
    addDetail: (id: string, data: any) => this.post(`/invoices/${id}/details`, data),
  };

  proposals = {
    getAll: () => this.get('/proposals'),
    getById: (id: string) => this.get(`/proposals/${id}`),
    create: (data: any) => this.post('/proposals', data),
    update: (id: string, data: any) => this.put(`/proposals/${id}`, data),
  };

  pos = {
    getAll: () => this.get('/pos'),
    getById: (id: string) => this.get(`/pos/${id}`),
    create: (data: any) => this.post('/pos', data),
    update: (id: string, data: any) => this.put(`/pos/${id}`, data),
    getUtilization: (id: string) => this.get(`/pos/${id}/utilization`),
  };

  dashboard = {
    getStats: () => this.get('/dashboard/stats'),
    getRevenue: () => this.get('/dashboard/revenue'),
  };
}

export const api = new ApiClient(API_BASE_URL);
