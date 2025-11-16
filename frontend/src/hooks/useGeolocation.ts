import { useState, useEffect } from "react"
import { type ILocation } from "@/types/weather"

export interface IUseGeolocationResult {
  location: ILocation | null
  isLoading: boolean
  error: string | null
}

// Default location: Porto, Portugal
const DEFAULT_LOCATION: ILocation = {
  lat: 41.1579,
  lon: -8.6291
}

export function useGeolocation(): IUseGeolocationResult {
  const [location, setLocation] = useState<ILocation | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION)
      setIsLoading(false)
      return
    }

    const getLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: false
          })
        })

        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      } catch {
        // Fallback to default location
        setLocation(DEFAULT_LOCATION)
      } finally {
        setIsLoading(false)
      }
    }

    void getLocation()
  }, [])

  return { location, isLoading, error }
}

