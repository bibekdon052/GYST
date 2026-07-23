import { useState, useEffect, useRef } from 'react'

const WMO = {
  0:  { emoji: '☀️',  label: 'Clear sky' },
  1:  { emoji: '🌤️', label: 'Mainly clear' },
  2:  { emoji: '⛅',  label: 'Partly cloudy' },
  3:  { emoji: '☁️',  label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Foggy' },
  48: { emoji: '🌫️', label: 'Icy fog' },
  51: { emoji: '🌦️', label: 'Light drizzle' },
  53: { emoji: '🌦️', label: 'Drizzle' },
  55: { emoji: '🌧️', label: 'Heavy drizzle' },
  61: { emoji: '🌧️', label: 'Light rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy rain' },
  71: { emoji: '🌨️', label: 'Light snow' },
  73: { emoji: '❄️',  label: 'Snow' },
  75: { emoji: '❄️',  label: 'Heavy snow' },
  80: { emoji: '🌦️', label: 'Rain showers' },
  81: { emoji: '🌧️', label: 'Heavy showers' },
  85: { emoji: '🌨️', label: 'Snow showers' },
  95: { emoji: '⛈️',  label: 'Thunderstorm' },
  99: { emoji: '⛈️',  label: 'Severe storm' },
}

const MELBOURNE_LAT = -37.8136
const MELBOURNE_LON = 144.9631
const REFRESH_MS = 600_000 // 10 minutes

async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m` +
    `&timezone=auto&forecast_days=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather fetch failed')
  return res.json()
}

export function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const intervalRef = useRef(null)

  async function load(lat, lon) {
    try {
      setError(false)
      const data = await fetchWeather(lat, lon)
      const c = data.current
      setWeather({
        temp: Math.round(c.temperature_2m),
        feels: Math.round(c.apparent_temperature),
        code: c.weathercode,
        wind: Math.round(c.windspeed_10m),
      })
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  function startWithCoords(lat, lon) {
    load(lat, lon)
    intervalRef.current = setInterval(() => load(lat, lon), REFRESH_MS)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => startWithCoords(pos.coords.latitude, pos.coords.longitude),
        ()  => startWithCoords(MELBOURNE_LAT, MELBOURNE_LON),
        { timeout: 5000 }
      )
    } else {
      startWithCoords(MELBOURNE_LAT, MELBOURNE_LON)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-muted text-sm">
        <div className="animate-spin text-lg mr-2">⏳</div>
        Loading…
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="flex items-center justify-center h-full text-muted text-sm">
        Weather unavailable ☁️
      </div>
    )
  }

  const condition = WMO[weather.code] || { emoji: '🌡️', label: 'Unknown' }

  return (
    <div className="flex flex-col justify-center h-full px-4 py-3 gap-1">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl">{condition.emoji}</span>
        <span className="text-2xl font-bold text-text">{weather.temp}°C</span>
      </div>
      <div className="text-xs text-muted leading-relaxed">
        Feels like {weather.feels}°C · {condition.label}
      </div>
      <div className="text-xs text-muted">
        💨 {weather.wind} km/h
      </div>
    </div>
  )
}
