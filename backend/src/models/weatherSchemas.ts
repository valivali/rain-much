import { z } from "zod"

export const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180)
})

// Schema for validating Express query parameters (which come as strings)
export const weatherQuerySchema = z.object({
  lat: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return null
      const str = Array.isArray(val) ? val[0] : val
      const num = parseFloat(str)
      return isNaN(num) ? null : num
    })
    .pipe(z.number().min(-90).max(90).nullable()),
  lon: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return null
      const str = Array.isArray(val) ? val[0] : val
      const num = parseFloat(str)
      return isNaN(num) ? null : num
    })
    .pipe(z.number().min(-180).max(180).nullable())
})

// Schema for validating tomorrow.io API response
const weatherTimelineEntrySchema = z.object({
  time: z.string(),
  values: z.object({
    temperature: z.number().optional(),
    temperatureMax: z.number().optional(),
    temperatureMin: z.number().optional(),
    humidity: z.number().optional(),
    humidityAvg: z.number().optional(),
    windSpeed: z.number().optional(),
    windSpeedAvg: z.number().optional(),
    weatherCode: z.union([z.string(), z.number()]).transform((val) => 
      typeof val === 'number' ? String(val) : val
    ).optional()
  })
})

// Schema for hourly precipitation timeline entry
const hourlyPrecipitationEntrySchema = z.object({
  startTime: z.string(),
  values: z.object({
    precipitationProbability: z.number().optional(),
    precipitationType: z.number().optional(),
    precipitationIntensity: z.number().optional(),
    rainAccumulation: z.number().optional(),
    rainIntensity: z.number().optional(),
    temperature: z.number().optional(),
    windSpeed: z.number().optional(),
    cloudCover: z.number().optional()
  })
})

// Schema for Timelines API response
export const hourlyPrecipitationResponseSchema = z.object({
  data: z.object({
    timelines: z.array(z.object({
      intervals: z.array(hourlyPrecipitationEntrySchema)
    }))
  })
})

export const weatherApiResponseSchema = z.object({
  timelines: z.object({
    daily: z.array(weatherTimelineEntrySchema).optional(),
    hourly: z.array(weatherTimelineEntrySchema).optional()
  })
})

export type LocationSchema = z.infer<typeof locationSchema>
export type WeatherQuerySchema = z.infer<typeof weatherQuerySchema>
export type WeatherApiResponseSchema = z.infer<typeof weatherApiResponseSchema>
export type HourlyPrecipitationResponseSchema = z.infer<typeof hourlyPrecipitationResponseSchema>

