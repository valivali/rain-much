import { useEffect, useState } from "react"
import { type ILocation } from "@/types/weather"

export interface IUseReverseGeocodeResult {
	address: string | null
	isLoading: boolean
	error: string | null
}

export function useReverseGeocode(location: ILocation | null): IUseReverseGeocodeResult {
	const [address, setAddress] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let aborted = false
		async function fetchAddress() {
			if (!location) return
			setIsLoading(true)
			setError(null)
			try {
				// Public Nominatim reverse geocoding (rate-limited; fine for demo)
				const url = new URL("https://nominatim.openstreetmap.org/reverse")
				url.searchParams.set("lat", String(location.lat))
				url.searchParams.set("lon", String(location.lon))
				url.searchParams.set("format", "jsonv2")
				url.searchParams.set("zoom", "16")
				url.searchParams.set("addressdetails", "1")

				const res = await fetch(url.toString(), {
					headers: {
						"Accept": "application/json",
						"User-Agent": "rain-much/1.0"
					}
				})
				if (!res.ok) {
					throw new Error(`Reverse geocode failed: ${res.status}`)
				}
				const data = await res.json()
				if (aborted) return
				const display: string | undefined = data?.display_name
				setAddress(display ?? null)
			} catch (e) {
				if (aborted) return
				setError(e instanceof Error ? e.message : "Unknown error")
				setAddress(null)
			} finally {
				if (!aborted) setIsLoading(false)
			}
		}
		void fetchAddress()
		return () => {
			aborted = true
		}
	}, [location?.lat, location?.lon])

	return { address, isLoading, error }
}


