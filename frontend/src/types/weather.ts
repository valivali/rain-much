export interface ILocation {
  lat: number
  lon: number
}

export interface IWeatherTimelineEntry {
  time: string
  values: {
    temperature?: number
    temperatureMax?: number
    temperatureMin?: number
    humidity?: number
    humidityAvg?: number
    windSpeed?: number
    windSpeedAvg?: number
    weatherCode?: string
  }
}

export interface IWeatherTimelines {
  daily?: Array<IWeatherTimelineEntry>
  hourly?: Array<IWeatherTimelineEntry>
}

export interface IWeatherForecastData {
  timelines: IWeatherTimelines
  location: ILocation
}

export interface IWeatherForecastResponse {
  success: boolean
  data?: IWeatherForecastData
  error?: string
}

export interface IHourlyPrecipitationEntry {
  startTime: string
  values: {
    precipitationProbability?: number
    precipitationType?: number
    precipitationIntensity?: number
    rainAccumulation?: number
    rainIntensity?: number
    temperature?: number
    windSpeed?: number
    cloudCover?: number
  }
}

export interface IHourlyPrecipitationData {
  intervals: Array<IHourlyPrecipitationEntry>
  location: ILocation
}

export const WEATHER_PROVIDER = {
  TOMORROW: "tomorrow",
  OPEN_METEO: "openMeteo"
} as const

export type WeatherProvider = (typeof WEATHER_PROVIDER)[keyof typeof WEATHER_PROVIDER]

export type IHourlyPrecipitationPerProvider = Partial<Record<WeatherProvider, IHourlyPrecipitationData>>

export interface IHourlyPrecipitationResponse {
  success: boolean
  data?: IHourlyPrecipitationPerProvider
  error?: string
}

export interface HourlyRain {
  time: string
  probability: number
  accumulation: number
  intensity: number
  cloudCover: number
}

