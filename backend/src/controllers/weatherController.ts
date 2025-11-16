import { type Request, type Response } from "express"
import weatherService from "../services/weatherService.js"
import percipitationService from "../services/percipitationService.js"
import { type LocationInterface } from "../models/weather.js"
import { weatherQuerySchema, locationSchema } from "../models/weatherSchemas.js"

export interface WeatherControllerInterface {
  getForecast(req: Request, res: Response): Promise<void>
  getHourlyPrecipitation(req: Request, res: Response): Promise<void>
}

class WeatherController implements WeatherControllerInterface {
  // Default location: Porto, Portugal
  private readonly defaultLocation: LocationInterface = {
    lat: 41.1579,
    lon: -8.6291
  }

  async getForecast(req: Request, res: Response): Promise<void> {
    try {
      let location: LocationInterface

      // Validate query parameters using Zod
      const queryResult = weatherQuerySchema.safeParse(req.query)

      if (queryResult.success) {
        const { lat, lon } = queryResult.data

        // If both lat and lon are valid numbers, use them
        if (lat !== null && lon !== null) {
          const locationResult = locationSchema.safeParse({ lat, lon })

          if (locationResult.success) {
            location = locationResult.data
          } else {
            // Invalid range, use default
            location = this.defaultLocation
          }
        } else {
          // Missing or invalid coordinates, use default
          location = this.defaultLocation
        }
      } else {
        // Invalid query parameters, use default
        location = this.defaultLocation
      }

      const forecast = await weatherService.getForecast(location)

      res.json({
        success: true,
        data: forecast
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      res.status(500).json({
        success: false,
        error: errorMessage
      })
    }
  }

  async getHourlyPrecipitation(req: Request, res: Response): Promise<void> {
    try {
      let location: LocationInterface

      // Validate query parameters using Zod
      const queryResult = weatherQuerySchema.safeParse(req.query)

      if (queryResult.success) {
        const { lat, lon } = queryResult.data

        // If both lat and lon are valid numbers, use them
        if (lat !== null && lon !== null) {
          const locationResult = locationSchema.safeParse({ lat, lon })

          if (locationResult.success) {
            location = locationResult.data
          } else {
            // Invalid range, use default
            location = this.defaultLocation
          }
        } else {
          // Missing or invalid coordinates, use default
          location = this.defaultLocation
        }
      } else {
        // Invalid query parameters, use default
        location = this.defaultLocation
      }

      // Get timezone from query params if provided
      const timezone = typeof req.query.timezone === 'string' ? req.query.timezone : undefined

      // New: fetch from multiple providers
      const precipitation = await percipitationService.getHourly(location, timezone)

      res.json({
        success: true,
        data: precipitation
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      res.status(500).json({
        success: false,
        error: errorMessage
      })
    }
  }
}

export default new WeatherController()

