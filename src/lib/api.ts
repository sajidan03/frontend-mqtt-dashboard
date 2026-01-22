import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export interface SensorData {
  temperature: number;
  humidity: number;
  magnet_status: number;
  timestamp: string | null;
}

export interface RelayStatus {
  relay1: boolean;
  relay2: boolean;
  timestamp: string | null;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
  mqtt_connected?: boolean;
}

export const apiService = {
  getSensorData: async (): Promise<ApiResponse<SensorData>> => {
    const response = await api.get('/sensor');
    return response.data;
  },

  getRelayStatus: async (): Promise<ApiResponse<RelayStatus>> => {
    const response = await api.get('/relay');
    return response.data;
  },

  controlRelay: async (relay1: boolean, relay2: boolean): Promise<ApiResponse<RelayStatus>> => {
    const response = await api.post('/relay', { relay1, relay2 });
    return response.data;
  },

  getSystemStatus: async () => {
    const response = await api.get('/status');
    return response.data;
  },
};