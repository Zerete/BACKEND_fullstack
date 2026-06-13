import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { formatDateShort } from '../shared/appCore'

export default function PaginaPreguntasFrecuentes({ user, isAdmin }) {
  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('sys_faqs')
    if (saved) return JSON.parse(saved)
    return [
      { id: 1, question: '¿Cómo funciona el sistema de confirmación de reportes?', answer: 'Cuando un usuario publica un reporte, este queda guardado en estado pendiente en la base de datos distribuida de Django. El Administrador del Backoffice verifica los datos de ubicación y la imagen para confirmarlo, haciéndolo visible de inmediato en el mapa público de Leaflet.', user_type: 'admin', username: 'luis', created_at: new Date(2026, 5, 1).toISOString() },
      { id: 2, question: '¿Tiene algún costo publicar un aviso de mascota perdida?', answer: 'No, Sanos y Salvos es una plataforma comunitaria 100% gratuita. Nuestro propósito principal es agilizar las redes de apoyo comunal utilizando tecnologías fullstack de código abierto.', user_type: 'admin', username: 'luis', created_at: new Date(2026, 5, 5).toISOString() },
      { id: 3, question: '¿Qué debo hacer si avisto una mascota perdida en la calle?', answer: 'Te recomendamos no perderla de vista y presionar la tarjeta de la mascota en el carrusel para ver la ficha técnica. Allí podrás contactar directamente al dueño por teléfono/email o usar el botón para actualizar su estado.', user_type: 'user', username: 'vecino_santiago', created_at: new Date(2026, 5, 10).toISOString() },
    ]
  })
  const [newQuestion, setNewQuestion] = useState('')
  const [answerTexts, setAnswerTexts] = useState({})

  useEffect(() => {
    localStorage.setItem('sys_faqs', JSON.stringify(faqs))
  }, [faqs])

  function handleSubmitQuestion(e) {
    e.preventDefault()
    if (!newQuestion.trim()) return
    const newItem = {
      id: Date.now(),
      question: newQuestion.trim(),
      answer: '',
      user_type: isAdmin ? 'admin' : 'user',
      username: user ? user.username : 'Anónimo',
      created_at: new Date().toISOString(),
    }
    setFaqs([newItem, ...faqs])
    setNewQuestion('')
  }

  function handleSubmitAnswer(id) {
    const text = answerTexts[id]
    if (!text || !text.trim()) return
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, answer: text.trim() } : f)))
    setAnswerTexts({ ...answerTexts, [id]: '' })
  }

  return (
    <div className="mainInner">
      <div style={{ marginBottom: '16px' }}>
        <Link className="miniBtn" to="/">← Volver al mapa de inicio</Link>
      </div>

      <section className="card">
        <h2 className="cardTitle" style={{ fontSize: '2rem', color: '#064a55', marginBottom: '8px' }}>Preguntas Frecuentes</h2>
        <p className="mutedText" style={{ marginBottom: '24px' }}>
          Consulta las dudas recurrentes de la comunidad o publica tu propia pregunta. Los administradores e integrantes responderán a tu duda.
        </p>

        <form onSubmit={handleSubmitQuestion} style={{ marginBottom: '40px', background: '#f8f9fa', padding: '20px', borderRadius: '12px', border: '1px solid #e3e6e8' }}>
          <label className="field" style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 'bold', color: '#064a55' }}>
              {isAdmin ? '🛡️ Publicar Pregunta Oficial (Modo Administrador)' : '✍️ Escribe tu pregunta'}
            </span>
            <input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder={user ? 'Escribe tu duda o consulta aquí...' : 'Inicia sesión para poder publicar preguntas...'}
              disabled={!user}
              style={{ padding: '12px' }}
            />
          </label>
          <button type="submit" className="primaryBtn" disabled={!user || !newQuestion.trim()}>
            Enviar Pregunta
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((f) => (
            <div key={f.id} className="card" style={{ borderLeft: f.user_type === 'admin' ? '6px solid var(--teal-500)' : '6px solid #f4a340', padding: '24px', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className="boPill" style={{
                  background: f.user_type === 'admin' ? '#e6fcf5' : '#fff9db',
                  color: f.user_type === 'admin' ? '#19a6b6' : '#f4a340',
                  fontWeight: 'bold', padding: '4px 10px', borderRadius: '12px', fontSize: '0.85rem',
                }}>
                  {f.user_type === 'admin' ? '🛡️ Admin' : '👤 Usuario'} · {f.username}
                </span>
                <span className="mutedText" style={{ fontSize: '0.85rem' }}>{formatDateShort(f.created_at)}</span>
              </div>

              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: '#064a55', lineHeight: '1.4' }}>{f.question}</h3>

              {f.answer ? (
                <div style={{ background: '#f1f3f5', padding: '14px 18px', borderRadius: '8px', borderLeft: '4px solid #19a6b6', marginTop: '10px' }}>
                  <strong style={{ color: 'var(--teal-500)', display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}> Respuesta del Equipo:</strong>
                  <p style={{ margin: 0, color: '#333', lineHeight: '1.5' }}>{f.answer}</p>
                </div>
              ) : (
                <div style={{ marginTop: '10px' }}>
                  <span className="mutedText" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>Esperando respuesta oficial...</span>
                  {isAdmin ? (
                    <div style={{ marginTop: '14px', display: 'flex', gap: '12px' }}>
                      <input
                        type="text"
                        placeholder="Escribe la solución/respuesta como administrador..."
                        value={answerTexts[f.id] || ''}
                        onChange={(e) => setAnswerTexts({ ...answerTexts, [f.id]: e.target.value })}
                        style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.95rem' }}
                      />
                      <button className="miniBtn" type="button" onClick={() => handleSubmitAnswer(f.id)} disabled={!answerTexts[f.id]?.trim()}>
                        Responder
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
