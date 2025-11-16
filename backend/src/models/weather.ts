export interface LocationInterface {
  lat: number
  lon: number
}

export interface WeatherForecastRequestInterface {
  location: LocationInterface
}

export interface WeatherTimelineEntryInterface {
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

export interface WeatherTimelinesInterface {
  daily?: Array<WeatherTimelineEntryInterface>
  hourly?: Array<WeatherTimelineEntryInterface>
}

export interface WeatherForecastResponseInterface {
  timelines: WeatherTimelinesInterface
  location: LocationInterface
}

export interface HourlyPrecipitationEntryInterface {
  startTime: string
  values: {
    precipitationProbability?: number
    precipitationType?: number
    precipitationAccumulation?: number
    rainAccumulation?: number
    temperature?: number
    windSpeed?: number
  }
}

export interface HourlyPrecipitationResponseInterface {
  intervals: Array<HourlyPrecipitationEntryInterface>
  location: LocationInterface
}

