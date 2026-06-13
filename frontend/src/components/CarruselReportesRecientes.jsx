import { useEffect, useRef, useState } from 'react'

import { apiRequest, formatDateShort, normalizeSpecies } from '../shared/appCore'

export default function CarruselReportesRecientes({ title, reports, onMarkFound, onCardClick }) {
  const trackRef = useRef(null)
  const [detailsById, setDetailsById] = useState({})
  const [loadingById, setLoadingById] = useState({})
  const [markingById, setMarkingById] = useState({})
  const detailsRef = useRef({})
  const loadingRef = useRef({})
  const fetchTokenRef = useRef(0)

  function scrollByAmount(direction) {
    const el = trackRef.current
    if (!el) return
    const amount = Math.max(240, Math.floor(el.clientWidth * 0.8))
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const token = ++fetchTokenRef.current
    const ids = (reports || [])
      .map((r) => r?.id)
      .filter((id) => id != null)
      .slice(0, 12)

    ;(async () => {
      const toFetch = ids.filter((id) => !detailsRef.current[id] && !loadingRef.current[id])
      if (toFetch.length === 0) return

      setLoadingById((s) => {
        const next = { ...s }
        for (const id of toFetch) next[id] = true
        loadingRef.current = next
        return next
      })

      const results = await Promise.allSettled(toFetch.map((id) => apiRequest(`/api/reports/${id}/`)))
      if (fetchTokenRef.current !== token) return

      const updates = []
      for (let i = 0; i < toFetch.length; i++) {
        const id = toFetch[i]
        const r = results[i]
        if (r.status === 'fulfilled' && r.value?.ok && r.value?.data) updates.push([id, r.value.data])
      }

      if (updates.length) {
        setDetailsById((s) => {
          const next = { ...s }
          for (const [id, data] of updates) next[id] = data
          detailsRef.current = next
          return next
        })
      }

      setLoadingById((s) => {
        const next = { ...s }
        for (const id of toFetch) next[id] = false
        loadingRef.current = next
        return next
      })
    })()
  }, [reports])

  function getSpeciesEmoji(species) {
    const kind = normalizeSpecies(species)
    if (kind === 'perro') return '🐶'
    if (kind === 'gato') return '🐱'
    return '🐾'
  }

  return (
    <section className="section">
      <div className="carouselHeader">
        <h2 className="carouselTitle">{title}</h2>
        <div className="carouselControls">
          <button className="iconBtn" type="button" onClick={() => scrollByAmount(-1)} aria-label="Anterior">
            ‹
          </button>
          <button className="iconBtn" type="button" onClick={() => scrollByAmount(1)} aria-label="Siguiente">
            ›
          </button>
        </div>
      </div>

      <div className="carouselTrack" ref={trackRef}>
        {(reports || []).length === 0 ? (
          <div className="carouselEmpty">Sin reportes recientes</div>
        ) : (
          (reports || []).map((r) => {
            const imgUrl = r.image_data_url || detailsById[r.id]?.image_data_url

            return (
              <div
                key={r.id}
                className="carouselCard"
                onClick={(e) => {
                  if (e.target.tagName !== 'BUTTON') {
                    onCardClick?.(r.id)
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className="carouselImgWrap">
                  {imgUrl ? (
                    <img
                      className="carouselImg"
                      src={imgUrl}
                      alt={r.pet_name || 'Mascota'}
                    />
                  ) : (
                    <div className={`carouselImgPlaceholder${loadingById[r.id] ? ' isLoading' : ''}`}>
                      <div className="carouselImgEmoji" aria-hidden="true">{getSpeciesEmoji(r.species)}</div>
                    </div>
                  )}
                </div>
                <div className="carouselCardTop">
                  <div className="carouselCardTitle">
                    {r.species || 'Mascota'}{r.pet_name ? ` · ${r.pet_name}` : ''}
                  </div>
                  <div className="carouselCardMeta">{formatDateShort(r.created_at)}</div>
                </div>
                <div className="carouselCardMeta">
                  {r.comuna || ''}{r.region ? `, ${r.region}` : ''}
                </div>
                {r.distance_km != null ? (
                  <div className="carouselCardMeta">A {Number(r.distance_km).toFixed(1)} km</div>
                ) : null}
                {r.description ? <div className="carouselCardDesc">{r.description}</div> : null}
                {r.status === 'perdido' ? (
                  <button
                    className="primaryBtn carouselActionBtn"
                    type="button"
                    disabled={markingById[r.id]}
                    onClick={(e) => {
                      e.stopPropagation()
                      setMarkingById((s) => ({ ...s, [r.id]: true }))
                      Promise.resolve(onMarkFound?.(r.id)).finally(() => {
                        setMarkingById((s) => ({ ...s, [r.id]: false }))
                      })
                    }}
                  >
                    {markingById[r.id] ? 'Marcando...' : 'Reportar como encontrado'}
                  </button>
                ) : (
                  <div className="carouselCardMeta" style={{ marginTop: '12px', fontWeight: 'bold', color: '#19a6b6' }}>
                    ✓ Encontrado
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
