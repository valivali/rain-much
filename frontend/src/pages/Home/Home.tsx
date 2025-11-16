import { useGeolocation } from "@/hooks/useGeolocation"
import { useWeatherForecast } from "@/api/weatherQueries"
import Header from "@/components/Header/Header"
import Text from "@/components/UI/Text/Text"
import "./Home.scss"

export interface IHomeProps {}

function Home(_props: IHomeProps) {
  const { location, isLoading: isLocationLoading } = useGeolocation()
  const { weatherData, isLoading: isWeatherLoading, error: weatherError } = useWeatherForecast({
    location,
    enabled: !isLocationLoading && location !== null
  })

  const isLoading = isLocationLoading || isWeatherLoading
  const error = weatherError ? weatherError.message : null

  return (
    <div className="home">
      <Header title="Rain Much" />
      <main className="home__main">
        {isLoading && (
          <div className="home__loading">
            <Text variant="content" color="primary">Loading weather data...</Text>
          </div>
        )}

        {error && (
          <div className="home__error">
            <Text variant="content" color="error">Error: {error}</Text>
          </div>
        )}

        {weatherData && !isLoading && !error && (
          <div className="home__weather">
            <div className="weather-info">
              <Text variant="title" size="medium" className="weather-info__title">Weather Forecast</Text>
              <Text variant="content" color="secondary" className="weather-info__location">
                Location: {weatherData.location.lat.toFixed(4)}, {weatherData.location.lon.toFixed(4)}
              </Text>

              {weatherData.timelines.daily && weatherData.timelines.daily.length > 0 && (
                <div className="weather-info__daily">
                  <Text variant="subtitle" size="medium" color="primary" className="weather-info__subtitle">Daily Forecast</Text>
                  <div className="daily-forecast">
                    {weatherData.timelines.daily.slice(0, 5).map((day, index) => (
                      <div key={index} className="daily-forecast__item">
                        <Text variant="content" bold className="daily-forecast__date">
                          {new Date(day.time).toLocaleDateString()}
                        </Text>
                        {day.values.temperatureMax !== undefined &&
                          day.values.temperatureMin !== undefined && (
                            <Text variant="content" className="daily-forecast__temp">
                              High: {day.values.temperatureMax.toFixed(1)}°C / Low:{" "}
                              {day.values.temperatureMin.toFixed(1)}°C
                            </Text>
                          )}
                        {day.values.humidityAvg !== undefined && (
                          <Text variant="content" color="secondary" className="daily-forecast__humidity">
                            Humidity: {day.values.humidityAvg.toFixed(1)}%
                          </Text>
                        )}
                        {day.values.windSpeedAvg !== undefined && (
                          <Text variant="content" color="secondary" className="daily-forecast__wind">
                            Wind: {day.values.windSpeedAvg.toFixed(1)} m/s
                          </Text>
                        )}
                        {day.values.weatherCode !== undefined && (
                          <Text variant="mini" color="tertiary" className="daily-forecast__code">Code: {day.values.weatherCode}</Text>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {weatherData.timelines.hourly && weatherData.timelines.hourly.length > 0 && (
                <div className="weather-info__hourly">
                  <Text variant="subtitle" size="medium" color="primary" className="weather-info__subtitle">Hourly Forecast (Next 24h)</Text>
                  <div className="hourly-forecast">
                    {weatherData.timelines.hourly.slice(0, 24).map((hour, index) => (
                      <div key={index} className="hourly-forecast__item">
                        <Text variant="mini" color="secondary" className="hourly-forecast__time">
                          {new Date(hour.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </Text>
                        {hour.values.temperature !== undefined && (
                          <Text variant="content" bold className="hourly-forecast__temp">
                            {hour.values.temperature.toFixed(1)}°C
                          </Text>
                        )}
                        {hour.values.humidity !== undefined && (
                          <Text variant="mini" color="tertiary" className="hourly-forecast__humidity">
                            H: {hour.values.humidity.toFixed(0)}%
                          </Text>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home

