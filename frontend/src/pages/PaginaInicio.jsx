import { Link } from 'react-router-dom'

import CarruselReportesRecientes from '../components/CarruselReportesRecientes'

export default function PaginaInicio({
  selectedReportId,
  detailedReport,
  loadingDetail,
  error,
  success,
  busy,
  user,
  nearbyRecentReports,
  heroStats,
  onMarkFound,
  onViewDetail,
  onResetDetail,
}) {
  return (
    <div className="mainInner mainInnerHome">
      {selectedReportId ? (
        <div className="mainInner">
          <button className="miniBtn" type="button" onClick={onResetDetail} style={{ marginBottom: '20px' }}>
            ← Volver al mapa y reportes
          </button>

          {loadingDetail ? <div className="mutedText" style={{ marginTop: '20px' }}>Cargando ficha técnica...</div> : null}
          {error ? <div className="formError" style={{ marginTop: '20px' }}>{error}</div> : null}
          {success ? <div className="formSuccess" style={{ marginTop: '20px' }}>{success}</div> : null}

          {detailedReport ? (
            <div className="reportGrid" style={{ marginTop: '20px' }}>
              <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', padding: '24px' }}>
                {detailedReport.image_data_url ? (
                  <img
                    src={detailedReport.image_data_url}
                    alt={detailedReport.pet_name}
                    style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain', borderRadius: '8px' }}
                  />
                ) : (
                  <div className="carouselImgPlaceholder" style={{ height: '300px', width: '100%', borderRadius: '12px' }}>🐾</div>
                )}
              </section>

              <section className="card" style={{ padding: '24px' }}>
                <h2 style={{ color: 'var(--teal-500)', fontSize: '2.5rem', marginBottom: '16px', marginTop: 0 }}>
                  {detailedReport.pet_name || 'Mascota sin nombre'}
                </h2>
                <div style={{ marginBottom: '24px' }}>
                  <span className="boPill" style={{ background: detailedReport.status === 'perdido' ? '#ffe8cc' : '#e6fcf5', color: detailedReport.status === 'perdido' ? '#f4a340' : '#19a6b6', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {detailedReport.status === 'perdido' ? '🔍 Buscado' : '✅ Encontrado'}
                  </span>
                </div>

                <table className="adminTable" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                  <tbody>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Especie:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.species}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Región:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.region}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Comuna:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.comuna}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Descripción:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.description || 'Sin descripción adicional.'}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Contacto:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.contact_name || 'Anónimo'}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Teléfono:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.contact_phone || 'No especificado'}</td></tr>
                    <tr><td style={{ padding: '10px 8px' }}><strong>Email:</strong></td><td style={{ padding: '10px 8px' }}>{detailedReport.contact_email || 'No especificado'}</td></tr>
                  </tbody>
                </table>

                <div style={{ marginTop: '30px' }}>
                  {detailedReport.status === 'perdido' ? (
                    <button
                      className="primaryBtn"
                      style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
                      type="button"
                      disabled={busy}
                      onClick={async (e) => {
                        e.preventDefault()
                        if (!user) {
                          window.scrollTo(0, 0)
                          return
                        }
                        await onMarkFound(detailedReport.id)
                      }}
                    >
                      ¡Reportar como encontrado!
                    </button>
                  ) : (
                    <div style={{ background: '#e6fcf5', color: '#19a6b6', padding: '16px', textAlign: 'center', fontWeight: 'bold', borderRadius: '8px', fontSize: '1.1rem', border: '2px solid #20c997' }}>
                      🎉 Esta mascota ya fue marcada como encontrada 🎉
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <section className="section homeHero">
            <div className="homeHeroContent">
              <div className="homeHeroEyebrow">
                {heroStats.totalReports} reportes activos en tu zona ahora mismo
              </div>
              <h1 className="homeHeroTitle">
                Encuentra a tu
                <span className="homeHeroAccent"> mascota perdida</span>
                <br />
                con tu comunidad
              </h1>
              <p className="homeHeroText">
                Reporta, busca y recibe alertas en tiempo real. Miles de vecinos listos para
                ayudarte a encontrar pistas cerca de tu zona.
              </p>
              <div className="homeHeroActions">
                <Link className="primaryBtn homeHeroBtn homeHeroBtnPrimary" to="/reportar">Perdi a mi mascota</Link>
                <a className="miniBtn homeHeroBtn homeHeroBtnSecondary" href="#inicio">Como funciona</a>
              </div>

              <div className="homeHeroStats" aria-label="Resumen de actividad">
                <div className="homeHeroStat">
                  <strong>{heroStats.totalReports}</strong>
                  <span>reportes activos</span>
                </div>
                <div className="homeHeroStat">
                  <strong>{heroStats.activeRegions}</strong>
                  <span>regiones cubiertas</span>
                </div>
                <div className="homeHeroStat">
                  <strong>{heroStats.coveredComunas}</strong>
                  <span>comunas con alertas</span>
                </div>
              </div>
            </div>
          </section>

          <section id="reportes" className="section">
            <CarruselReportesRecientes title="Reportes recientes cerca de ti" reports={nearbyRecentReports} onMarkFound={onMarkFound} onCardClick={onViewDetail} />
          </section>

          <div className="fullBleed howShowcaseBand">
            <section id="inicio" className="section howShowcase">
              <div className="howShowcaseInner">
                <div className="howHeading howHeadingLeft">
                  <div className="howEyebrow">Como funciona</div>
                  <h2 className="howTitle howTitleLight">Tres pasos para reunificar a tu mascota</h2>
                </div>

                <div className="howSteps howStepsDark">
                  <article className="howStep howStepCard">
                    <div className="howStepBadge howStepBadgeWarm">01</div>
                    <div className="howIconBox howIconBoxDark">📸</div>
                    <div className="howStepTitle howStepTitleLight">Reporta la perdida</div>
                    <div className="howStepText howStepTextLight">
                      Sube una foto, describe a tu mascota e indica la ultima ubicacion conocida. Solo toma unos minutos.
                    </div>
                  </article>

                  <article className="howStep howStepCard">
                    <div className="howStepBadge howStepBadgeGold">02</div>
                    <div className="howIconBox howIconBoxDark">🔔</div>
                    <div className="howStepTitle howStepTitleLight">La comunidad se activa</div>
                    <div className="howStepText howStepTextLight">
                      Vecinos en un radio de varios kilometros reciben una alerta inmediata. Cualquiera puede reportar un avistamiento.
                    </div>
                  </article>

                  <article className="howStep howStepCard">
                    <div className="howStepBadge howStepBadgeGreen">03</div>
                    <div className="howIconBox howIconBoxDark">💗</div>
                    <div className="howStepTitle howStepTitleLight">Reunificacion</div>
                    <div className="howStepText howStepTextLight">
                      Te conectamos con quien encontro a tu mascota y coordinamos el reencuentro lo antes posible.
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  )
}
