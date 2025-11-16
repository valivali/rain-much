import axios from "axios"
import { apiClient } from "./apiClient.js"
import { type ILocation, type IWeatherForecastResponse, type IHourlyPrecipitationResponse } from "../types/weather.js"

export interface IWeatherApi {
  getForecast(location: ILocation): Promise<IWeatherForecastResponse>
  getHourlyPrecipitation(location: ILocation, timezone?: string): Promise<IHourlyPrecipitationResponse>
}

class WeatherApi implements IWeatherApi {
  async getForecast(location: ILocation): Promise<IWeatherForecastResponse> {
    try {
      const response = await apiClient.get<IWeatherForecastResponse>("/api/weather/forecast", {
        params: {
          lat: location.lat,
          lon: location.lon
        }
      })

      const data = response.data

      // Throw error if API returns error response (for react-query to catch)
      if (!data.success || !data.data) {
        const errorMessage = data.error || "Failed to fetch weather forecast"
        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      // Handle axios errors and re-throw for react-query
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || error.message || "Failed to fetch weather forecast"
        throw new Error(errorMessage)
      }

      // Re-throw if it's already an Error, otherwise wrap it
      throw error instanceof Error ? error : new Error("Unknown error occurred")
    }
  }

  async getHourlyPrecipitation(location: ILocation, timezone?: string): Promise<IHourlyPrecipitationResponse> {
    try {
      const params: Record<string, string | number> = {
        lat: location.lat,
        lon: location.lon
      }
      if (timezone) {
        params.timezone = timezone
      }

      const response = await apiClient.get<IHourlyPrecipitationResponse>("/api/weather/hourly-precipitation", {
        params
      })

      const data = response.data

      // Throw error if API returns error response (for react-query to catch)
      if (!data.success || !data.data) {
        const errorMessage = data.error || "Failed to fetch hourly precipitation"
        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      // Handle axios errors and re-throw for react-query
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error || error.message || "Failed to fetch hourly precipitation"
        throw new Error(errorMessage)
      }

      // Re-throw if it's already an Error, otherwise wrap it
      throw error instanceof Error ? error : new Error("Unknown error occurred")
    }
  }
}

export default new WeatherApi()

