import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import weatherApi from "./weatherApi"
import { type ILocation, type IWeatherForecastData, type IWeatherForecastResponse, type IHourlyPrecipitationResponse, type IHourlyPrecipitationPerProvider } from "@/types/weather"

export interface IUseWeatherForecastOptions {
  location: ILocation | null
  enabled?: boolean
}

export type IUseWeatherForecastResult = UseQueryResult<IWeatherForecastResponse, Error> & {
  weatherData: IWeatherForecastData | null
}

export function useWeatherForecast({
  location,
  enabled = true
}: IUseWeatherForecastOptions): IUseWeatherForecastResult {
  const query = useQuery<IWeatherForecastResponse, Error>({
    queryKey: ["weather", "forecast", location?.lat, location?.lon],
    queryFn: async () => {
      if (!location) {
        throw new Error("Location is required")
      }
      const response = await weatherApi.getForecast(location)
      return response
    },
    enabled: enabled && location !== null,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes (formerly cacheTime)
  })

  return {
    ...query,
    weatherData: query.data?.data ?? null
  }
}

export interface IUseHourlyPrecipitationOptions {
  location: ILocation | null
  timezone?: string
  enabled?: boolean
}

export type IUseHourlyPrecipitationResult = UseQueryResult<IHourlyPrecipitationResponse, Error> & {
  precipitationData: IHourlyPrecipitationPerProvider | null
}

export function useHourlyPrecipitation({
  location,
  timezone,
  enabled = true
}: IUseHourlyPrecipitationOptions): IUseHourlyPrecipitationResult {
  const query = useQuery<IHourlyPrecipitationResponse, Error>({
    queryKey: ["weather", "hourly-precipitation", location?.lat, location?.lon, timezone],
    queryFn: async () => {
      if (!location) {
        throw new Error("Location is required")
      }
      const response = await weatherApi.getHourlyPrecipitation(location, timezone)
      return response
    },
    enabled: enabled && location !== null,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes (formerly cacheTime)
  })

  return {
    ...query,
    precipitationData: query.data?.data ?? {}
  }
}

