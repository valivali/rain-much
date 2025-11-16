import axios, { type AxiosInstance } from "axios"

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001"

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
})

