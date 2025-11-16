import { type LocationInterface } from "../models/weather.js"
import TomorrowProvider from "../providers/TomorrowProvider.js"
import OpenMeteoProvider from "../providers/OpenMeteoProvider.js"
import { mapOpenMeteo, mapTomorrow, type MultiProviderPrecipitation, ProviderName } from "../mappers/precipitation.js"

export interface PercipitationServiceInterface {
	getHourly(location: LocationInterface, timezone?: string): Promise<MultiProviderPrecipitation>
}

class PercipitationService implements PercipitationServiceInterface {
	private readonly tomorrow = new TomorrowProvider()
	private readonly openMeteo = new OpenMeteoProvider()

	async getHourly(location: LocationInterface, timezone?: string): Promise<MultiProviderPrecipitation> {
		const [tomorrowRes, openMeteoRes] = await Promise.allSettled([
			this.tomorrow.getHourlyPrecipitation(location, timezone),
			this.openMeteo.getHourlyPrecipitation(location)
		])

		const result: MultiProviderPrecipitation = {}

		if (tomorrowRes.status === "fulfilled") {
			result[ProviderName.Tomorrow] = mapTomorrow(tomorrowRes.value.intervals, location)
		}

		if (openMeteoRes.status === "fulfilled") {
			result[ProviderName.OpenMeteo] = mapOpenMeteo(openMeteoRes.value.intervals, location)
		}

		if (!result[ProviderName.Tomorrow] && !result[ProviderName.OpenMeteo]) {
			throw new Error("All providers failed to fetch precipitation data")
		}

		return result
	}
}

export default new PercipitationService()


