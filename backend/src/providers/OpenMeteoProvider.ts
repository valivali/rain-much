import { fetchWeatherApi } from "openmeteo"
import { type LocationInterface } from "../models/weather.js"

export interface OpenMeteoHourly {
	time: Date[]
	rain?: Float32Array
	precipitation?: Float32Array
	precipitation_probability?: Float32Array
	showers?: Float32Array
	apparent_temperature?: Float32Array
	cloud_cover?: Float32Array
	temperature_2m?: Float32Array
}

export interface OpenMeteoRawResponse {
	latitude: number
	longitude: number
	elevation: number
	utcOffsetSeconds: number
	hourly: OpenMeteoHourly
}

export interface ProviderHourlyInterval {
	startTime: string
	values: {
		precipitationProbability?: number
		rainAccumulation?: number
		rainIntensity?: number
		temperature?: number
		cloudCover?: number
		windSpeed?: number
	}
}

export interface ProviderHourlyResponse {
	intervals: ProviderHourlyInterval[]
	location: LocationInterface
}

export class OpenMeteoProvider {
	private readonly baseUrl = "https://api.open-meteo.com/v1/forecast"

	async getHourlyPrecipitation(location: LocationInterface): Promise<ProviderHourlyResponse> {
    const params = {
			latitude: location.lat,
			longitude: location.lon,
			hourly: [
				"temperature_2m",
				"rain",
				"precipitation",
				"precipitation_probability",
				"cloud_cover",
				"wind_speed_10m"
			],
			past_hours: 1,
			forecast_hours: 9,
			timezone: "Europe/London"
		} as const

		const responses = await fetchWeatherApi(this.baseUrl, params as any)
		const response = responses[0]
		const hourly = response.hourly()!
		const utcOffsetSeconds = response.utcOffsetSeconds()

		const length = (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
		const times = Array.from({ length }, (_, i) =>
			new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		)

		const temperature = hourly.variables(0)?.valuesArray()
		const rain = hourly.variables(1)?.valuesArray()
    const precipitation = hourly.variables(2)?.valuesArray()
		const probability = hourly.variables(3)?.valuesArray()
		const cloudCover = hourly.variables(4)?.valuesArray()
		const windSpeed = hourly.variables(5)?.valuesArray()

		const intervals: ProviderHourlyInterval[] = times.map((t, idx) => ({
			startTime: t.toISOString(),
			values: {
				precipitationProbability: probability ? probability[idx] : undefined,
				precipitationIntensity: precipitation ? precipitation[idx] : undefined,
				rainAccumulation: precipitation ? precipitation[idx] : undefined,
				rainIntensity: rain ? rain[idx] : undefined,
				temperature: temperature ? temperature[idx] : undefined,
				cloudCover: cloudCover ? cloudCover[idx] : undefined,
				windSpeed: windSpeed ? windSpeed[idx] : undefined
			}
		}))

		return { intervals, location }
	}
}

export default OpenMeteoProvider


