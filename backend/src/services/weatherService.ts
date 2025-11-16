// Load environment variables FIRST before anything else
import "../config/env.js"

import axios from "axios"
import {
  type LocationInterface,
  type WeatherForecastResponseInterface,
  type HourlyPrecipitationResponseInterface
} from "../models/weather.js"
import { weatherApiResponseSchema, hourlyPrecipitationResponseSchema } from "../models/weatherSchemas.js"

export interface WeatherServiceInterface {
  getForecast(location: LocationInterface): Promise<WeatherForecastResponseInterface>
  getHourlyPrecipitation(location: LocationInterface, timezone?: string): Promise<HourlyPrecipitationResponseInterface>
}

class WeatherService implements WeatherServiceInterface {
  private readonly apiKey: string
  private readonly baseUrl = "https://api.tomorrow.io/v4"

  constructor() {
    const apiKey = process.env.TOMORROW_API_KEY
    if (!apiKey) {
      throw new Error("TOMORROW_API_KEY is not defined in environment variables")
    }
    this.apiKey = apiKey
  }

  async getForecast(
    location: LocationInterface
  ): Promise<WeatherForecastResponseInterface> {
    try {
      const url = `${this.baseUrl}/weather/forecast`
      const params = {
        location: `${location.lat},${location.lon}`,
        apikey: this.apiKey,
        timesteps: "1h,1d",
        units: "metric",
        fields: "temperature,temperatureMax,temperatureMin,humidity,humidityAvg,windSpeed,windSpeedAvg,weatherCode"
      }

      const response = await axios.get<unknown>(url, {
        params,
        headers: {
          accept: 'application/json',
          'accept-encoding': 'deflate, gzip, br'
        }
      })

      const validationResult = weatherApiResponseSchema.safeParse(response.data)

      if (!validationResult.success) {
        throw new Error(`Invalid API response format: ${validationResult.error.message}`)
      }

      return {
        timelines: validationResult.data.timelines,
        location
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || error.response?.statusText || error.message
        throw new Error(
          `Weather API error: ${error.response?.status || "Unknown"} - ${errorMessage}`
        )
      }
      throw error
    }
  }

  async getHourlyPrecipitation(
    location: LocationInterface,
    timezone?: string
  ): Promise<HourlyPrecipitationResponseInterface> {
    try {
      const url = `${this.baseUrl}/timelines`
      const params: Record<string, string> = {
        location: `${location.lat},${location.lon}`,
        apikey: this.apiKey,
        timesteps: "1h",
        startTime: "nowMinus1h",
        endTime: "nowPlus8h",
        units: "metric",
        fields: "precipitationProbability,precipitationType,precipitationIntensity,rainAccumulation,rainIntensity,temperature,windSpeed,cloudCover"
      }

      if (timezone) {
        params.timezone = timezone
      }

      const response = await axios.get<unknown>(url, {
        params,
        headers: {
          accept: 'application/json',
          'accept-encoding': 'deflate, gzip, br'
        }
      })

      const validationResult = hourlyPrecipitationResponseSchema.safeParse(response.data)

      if (!validationResult.success) {
        throw new Error(`Invalid API response format: ${validationResult.error.message}`)
      }

      return {
        intervals: validationResult.data.data.timelines[0]?.intervals || [],
        location
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || error.response?.statusText || error.message
        throw new Error(
          `Weather API error: ${error.response?.status || "Unknown"} - ${errorMessage}`
        )
      }
      throw error
    }
  }
}

export default new WeatherService()

