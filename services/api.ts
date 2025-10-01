// API configuration
const API_BASE = 'https://athyra.onrender.com';
// For local development, use: 'http://localhost:8000'

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl: string;
  private currentUser: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setUser(username: string | null) {
    this.currentUser = username;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: HeadersInit = {
        ...options.headers,
      };

      if (this.currentUser) {
        headers['X-Username'] = this.currentUser;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.detail || 'Request failed' };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Network error' };
    }
  }

  // Auth endpoints
  async register(userData: {
    username: string;
    age: number;
    sex: string;
    height_cm: number;
    weight_kg: number;
    goal: string;
  }) {
    return this.request('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  }

  async login(username: string) {
    return this.request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    });
  }

  async getProfile() {
    return this.request('/profile');
  }

  // Food tracking endpoints
  async analyzeFood(imageBlob: Blob) {
    const formData = new FormData();
    formData.append('image', imageBlob, 'food.jpg');
    
    return this.request('/analyze_food', {
      method: 'POST',
      body: formData,
    });
  }

  async logFoodDirect(imageBlob: Blob) {
    const formData = new FormData();
    formData.append('image', imageBlob, 'food.jpg');
    
    return this.request('/log_food_direct', {
      method: 'POST',
      body: formData,
    });
  }

  async logPrevious(foodData: {
    type: string;
    description: string;
    calories: number;
  }) {
    return this.request('/log_previous', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodData),
    });
  }

  // Voice command endpoint
  async processVoiceCommand(audioBlob: Blob) {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'voice_command.webm');
    
    return this.request('/voice_command', {
      method: 'POST',
      body: formData,
    });
  }

  // Stats endpoints
  async getDailySummary() {
    return this.request('/summary');
  }

  async getMacroSummary() {
    return this.request('/macro_summary');
  }

  async getExerciseSummary() {
    return this.request('/exercise_summary');
  }

  async getStreakData() {
    return this.request('/streak_data');
  }

  // Exercise endpoints
  async startExercise(exerciseType: string = 'running') {
    return this.request('/exercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'start', 
        exercise_type: exerciseType 
      }),
    });
  }

  async stopExercise(sessionId: number) {
    return this.request('/exercise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        action: 'stop', 
        session_id: sessionId 
      }),
    });
  }

  // Meal planning endpoints
  async createMealPlan(budget: number, allergies: string) {
    return this.request('/create_meal_plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ budget, allergies }),
    });
  }

  async getActiveMealPlan() {
    return this.request('/get_active_meal_plan');
  }

  async getAllMealPlans() {
    return this.request('/get_all_meal_plans');
  }

  async getMealPlanStatus() {
    return this.request('/meal_plan_status');
  }
}

// Export singleton instance
export const api = new ApiService(API_BASE);
export default api;