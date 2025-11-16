import { useGeolocation } from "@/hooks/useGeolocation"
import { useHourlyPrecipitation } from "@/api/weatherQueries"
import { type HourlyRain, type IHourlyPrecipitationPerProvider, WEATHER_PROVIDER } from "@/types/weather"
import Header from "@/components/Header/Header"
import RainChart from "@/components/RainChart/RainChart"
import Text from "@/components/UI/Text/Text"
import { useReverseGeocode } from "@/hooks/useReverseGeocode"
import "./Precipitation.scss"

export interface IPrecipitationProps {}

function Precipitation(_props: IPrecipitationProps) {
  const { location, isLoading: isLocationLoading } = useGeolocation()
  const { precipitationData, isLoading: isPrecipitationLoading, error: precipitationError } = useHourlyPrecipitation({
    location,
    enabled: !isLocationLoading && location !== null
  })
  const { address, isLoading: isAddressLoading } = useReverseGeocode(location)

  const isLoading = isLocationLoading || isPrecipitationLoading
  const error = precipitationError ? precipitationError.message : null
  const hasData = !!precipitationData && (precipitationData[WEATHER_PROVIDER.TOMORROW] || precipitationData[WEATHER_PROVIDER.OPEN_METEO]) as IHourlyPrecipitationPerProvider

  const toChartData = (intervals: Array<{ startTime: string; values: any }>): HourlyRain[] =>
    intervals.map((interval) => ({
      time: interval.startTime,
      probability: interval.values.precipitationProbability ?? 0,
      accumulation: interval.values.rainAccumulation ?? 0,
      intensity: interval.values.rainIntensity ?? interval.values.precipitationIntensity ?? 0,
      cloudCover: interval.values.cloudCover ?? 0
    }))

  return (
    <div className="precipitation">
      <Header title="Hourly Rain Forecast" />
      <main className="precipitation__main">
        {isLoading && (
          <div className="precipitation__loading">
            <Text variant="content" color="primary">Loading precipitation data...</Text>
          </div>
        )}

        {error && (
          <div className="precipitation__error">
            <Text variant="content" color="error">Error: {error}</Text>
          </div>
        )}

        {hasData && !isLoading && !error && (
          <div className="precipitation__content">
            <div className="precipitation__info">
              <Text variant="content" color="secondary" center className="precipitation__location">
                Location: {isAddressLoading ? "Resolving address..." : (address ?? "Unknown address")}
              </Text>
            </div>
            {precipitationData?.[WEATHER_PROVIDER.TOMORROW] && (
              <>
                <Text variant="content" color="primary" center>Tomorrow.io</Text>
                <RainChart data={toChartData(precipitationData[WEATHER_PROVIDER.TOMORROW]!.intervals)} />
              </>
            )}
            {precipitationData?.[WEATHER_PROVIDER.OPEN_METEO] && (
              <>
                <Text variant="content" color="primary" center>Open-Meteo</Text>
                <RainChart data={toChartData(precipitationData[WEATHER_PROVIDER.OPEN_METEO]!.intervals)} />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default Precipitation
