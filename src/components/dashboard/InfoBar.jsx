import { useState, useEffect, useRef } from 'react'

const WMO_ICONS = {
  0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️', 45:'🌫️', 48:'🌫️',
  51:'🌦️', 53:'🌦️', 55:'🌧️', 61:'🌧️', 63:'🌧️', 65:'🌧️',
  71:'🌨️', 73:'❄️', 75:'❄️', 80:'🌦️', 81:'🌧️', 85:'🌨️',
  95:'⛈️', 99:'⛈️',
}

function uvInfo(uv) {
  if (uv == null || isNaN(uv)) return null
  if (uv <= 2)  return { label: `UV ${uv} Low`,       cls: 'text-green-400' }
  if (uv <= 5)  return { label: `UV ${uv} Moderate`,  cls: 'text-yellow-400' }
  if (uv <= 7)  return { label: `UV ${uv} High`,      cls: 'text-orange-400' }
  if (uv <= 10) return { label: `UV ${uv} Very High`, cls: 'text-red-400' }
  return             { label: `UV ${uv} Extreme`,     cls: 'text-purple-400' }
}

export function InfoBar() {
  const [now, setNow] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [geoConsent, setGeoConsent] = useState(() => localStorage.getItem('gyst_geo_consent'))
  const timerRef = useRef(null)
  const pollRef  = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  async function fetchWeather(lat, lon) {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m` +
        `&daily=uv_index_max&timezone=auto&forecast_days=1`
      )
      if (!res.ok) return
      const d = await res.json()
      setWeather({
        temp:  Math.round(d.current.temperature_2m),
        feels: Math.round(d.current.apparent_temperature),
        wind:  Math.round(d.current.windspeed_10m),
        code:  d.current.weathercode,
        uv:    Math.round(d.daily?.uv_index_max?.[0]),
        tz:    d.timezone_abbreviation || '',
      })
    } catch {}
  }

  function grantConsent() {
    localStorage.setItem('gyst_geo_consent', 'granted')
    setGeoConsent('granted')
  }

  function denyConsent() {
    localStorage.setItem('gyst_geo_consent', 'denied')
    setGeoConsent('denied')
  }

  useEffect(() => {
    if (geoConsent === null) return
    function start(lat, lon) {
      fetchWeather(lat, lon)
      pollRef.current = setInterval(() => fetchWeather(lat, lon), 600_000)
    }
    if (geoConsent === 'granted' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        p  => start(p.coords.latitude, p.coords.longitude),
        () => start(-37.8136, 144.9631),
        { timeout: 5000 }
      )
    } else {
      start(-37.8136, 144.9631)
    }
    return () => clearInterval(pollRef.current)
  }, [geoConsent])

  const timeStr = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true })
  const dateStr = now.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
  const icon = weather ? (WMO_ICONS[weather.code] ?? '🌡️') : null
  const uv   = weather ? uvInfo(weather.uv) : null

  return (
    <div className="px-6 pb-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Time + date */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-text tabular-nums leading-none">{timeStr}</span>
          <span className="text-xs text-muted">{dateStr}</span>
        </div>

        {/* Geolocation consent prompt — shown once until user decides */}
        {geoConsent === null && (
          <>
            <div className="w-px h-4 bg-border shrink-0" />
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span>📍</span>
              <span>Local weather?</span>
              <button onClick={grantConsent} className="text-accent hover:underline font-medium">Allow</button>
              <span className="text-muted/30">·</span>
              <button onClick={denyConsent} className="text-muted/60 hover:text-text">Use Melbourne</button>
            </div>
          </>
        )}

        {geoConsent !== null && weather && (
          <>
            <div className="w-px h-4 bg-border shrink-0" />

            {/* Condition + temp */}
            <div className="flex items-center gap-1.5 text-sm">
              <span>{icon}</span>
              <span className="font-semibold text-text">{weather.temp}°C</span>
              <span className="text-xs text-muted">feels {weather.feels}°C</span>
            </div>

            {/* UV */}
            {uv && (
              <span className={`text-xs font-medium ${uv.cls}`}>{uv.label}</span>
            )}

            {/* Wind */}
            <span className="text-xs text-muted">💨 {weather.wind} km/h</span>

            {/* Timezone */}
            {weather.tz && (
              <span className="text-xs text-muted/60 font-mono">{weather.tz}</span>
            )}

            {/* Attribution — required by Open-Meteo ToS */}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-muted/40 hover:text-muted/60 ml-auto"
            >
              Open-Meteo
            </a>
          </>
        )}
      </div>
    </div>
  )
}
