import axios from "axios"
import { type LocationInterface } from "../models/weather.js"

export interface ProviderHourlyInterval {
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

export interface ProviderHourlyResponse {
	intervals: ProviderHourlyInterval[]
	location: LocationInterface
}

export class TomorrowProvider {
	private readonly apiKey: string
	private readonly baseUrl = "https://api.tomorrow.io/v4"

	constructor(apiKey: string | undefined = process.env.TOMORROW_API_KEY) {
		if (!apiKey) {
			throw new Error("TOMORROW_API_KEY is not defined in environment variables")
		}
		this.apiKey = apiKey
	}

	async getHourlyPrecipitation(location: LocationInterface, timezone?: string): Promise<ProviderHourlyResponse> {
		const url = `${this.baseUrl}/timelines`
		const params: Record<string, string | string[]> = {
			location: `${location.lat},${location.lon}`,
			apikey: this.apiKey,
			timesteps: "1h",
			startTime: "nowMinus1h",
			endTime: "nowPlus8h",
			units: "metric",
			fields: [
				"precipitationProbability",
				"precipitationType",
				"precipitationIntensity",
				"rainAccumulation",
				"rainIntensity",
				"temperature",
				"windSpeed",
				"cloudCover"
			]
		}

		if (timezone) params.timezone = timezone

		const response = await axios.get<unknown>(url, {
			params,
			headers: { accept: "application/json", "accept-encoding": "deflate, gzip, br" }
		})

		// Return raw shape; mapping/validation is done in mappers
		const data = response.data as any
		const intervals = (data?.data?.timelines?.[0]?.intervals ?? []) as ProviderHourlyInterval[]
		return { intervals, location }
	}
}

export default TomorrowProvider


