import { useEffect, useState } from 'react'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'

import { apiRequest, formatDateShort, getPetIcon } from '../../shared/appCore'

export function RecentrarMapa({ center, zoom }) {
  const map = useMap()

  useEffect(() => {
    if (!center) return
    map.setView(center, zoom, { animate: true })
  }, [map, center, zoom])

  return null
}

export function InvalidarTamanoMapa({ watch }) {
  const map = useMap()

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize()
    }, 0)
    return () => clearTimeout(t)
  }, [map, watch])

  useEffect(() => {
    function onResize() {
      map.invalidateSize()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [map])

  return null
}

export function SelectorUbicacion({ onPick }) {
  useMapEvents({
    click(e) {
      onPick({ latitude: e.latlng.lat, longitude: e.latlng.lng })
    },
  })

  return null
}

export function MarcadoresReportes({ reports, highlightId, onSelectReport, onMarkerFocus }) {
  const [detailsById, setDetailsById] = useState({})
  const [loadingById, setLoadingById] = useState({})

  async function ensureDetails(id) {
    if (!id) return
    if (detailsById[id] || loadingById[id]) return
    setLoadingById((s) => ({ ...s, [id]: true }))
    try {
      const resp = await apiRequest(`/api/reports/${id}/`)
      if (resp.ok && resp.data) setDetailsById((s) => ({ ...s, [id]: resp.data }))
    } finally {
      setLoadingById((s) => ({ ...s, [id]: false }))
    }
  }

  return (reports || [])
    .filter((r) => r && r.latitude != null && r.longitude != null)
    .map((r) => {
      const isHighlight = highlightId != null && r.id === highlightId
      const details = detailsById[r.id] || null
      const imgUrl = r.image_data_url || details?.image_data_url

      return (
        <Marker
          key={r.id}
          position={[Number(r.latitude), Number(r.longitude)]}
          icon={getPetIcon(r.species, { highlight: isHighlight })}
          eventHandlers={{
            click: () => {
              ensureDetails(r.id)
              if (onMarkerFocus) onMarkerFocus(r.id)
            },
          }}
        >
          <Popup>
            {loadingById[r.id] ? <div className="popupMeta">Cargando…</div> : null}
            {imgUrl ? (
              <img className="popupImg" src={imgUrl} alt={details?.pet_name || r.pet_name || 'Mascota'} />
            ) : null}
            <div className="popupTitle">
              {r.pet_name ? r.pet_name : 'Mascota sin nombre'} · {r.species || 'Mascota'}
            </div>
            <div className="popupMeta">
              {(r.comuna || '').trim()}{r.region ? `, ${r.region}` : ''}
            </div>
            {r.created_at ? <div className="popupMeta">Reportado: {formatDateShort(r.created_at)}</div> : null}
            {r.description ? <div className="popupDesc">{r.description}</div> : null}
            {onSelectReport ? (
              <button className="miniBtn popupActionBtn" type="button" onClick={() => onSelectReport(r.id)}>
                Ver ficha
              </button>
            ) : null}
          </Popup>
        </Marker>
      )
    })
}
