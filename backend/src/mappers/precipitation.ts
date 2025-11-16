import { z } from "zod"
import { type LocationInterface } from "../models/weather.js"
import type { ProviderHourlyInterval as TomorrowInterval } from "../providers/TomorrowProvider.js"
import type { ProviderHourlyInterval as OpenMeteoInterval } from "../providers/OpenMeteoProvider.js"

export enum ProviderName {
	Tomorrow = "tomorrow",
	OpenMeteo = "openMeteo"
}

export const locationSchema = z.object({
	lat: z.number().min(-90).max(90),
	lon: z.number().min(-180).max(180)
})

const intervalValuesSchema = z.object({
	precipitationProbability: z.number().optional(),
	precipitationType: z.number().optional(),
	precipitationIntensity: z.number().optional(),
	rainAccumulation: z.number().optional(),
	rainIntensity: z.number().optional(),
	temperature: z.number().optional(),
	windSpeed: z.number().optional(),
	cloudCover: z.number().optional()
})

const intervalSchema = z.object({
	startTime: z.string(),
	values: intervalValuesSchema
})

export const providerHourlyResponseSchema = z.object({
	intervals: z.array(intervalSchema),
	location: locationSchema
})

export type ProviderHourly = z.infer<typeof providerHourlyResponseSchema>

export interface MultiProviderPrecipitation {
	[ProviderName.Tomorrow]?: ProviderHourly
	[ProviderName.OpenMeteo]?: ProviderHourly
}

export function mapTomorrow(intervals: TomorrowInterval[], location: LocationInterface): ProviderHourly {
	const safe = providerHourlyResponseSchema.parse({ intervals, location })
	return safe
}

export function mapOpenMeteo(intervals: OpenMeteoInterval[], location: LocationInterface): ProviderHourly {
	const safe = providerHourlyResponseSchema.parse({ intervals, location })
	return safe
}


