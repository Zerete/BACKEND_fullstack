import { useEffect, useState } from 'react'

import { apiRequest, formatDateShort } from '../shared/appCore'

export default function PaginaAdminUsuarios({ search }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadUsers() {
    const resp = await apiRequest('/api/auth/users/', { method: 'GET' })
    if (!resp.ok) throw new Error(resp.data?.detail || 'No se pudieron cargar los usuarios')
    setUsers(resp.data?.results || [])
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        await loadUsers()
      } catch (e) {
        setError(e?.message || 'Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const q = (search || '').trim().toLowerCase()
  const filtered = q
    ? users.filter((u) => `${u.username || ''} ${u.email || ''} ${u.id || ''}`.toLowerCase().includes(q))
    : users

  return (
    <section className="boCard">
      <div className="boCardTop">
        <div>
          <div className="boH1">Usuarios</div>
          <div className="boSub">Listado de cuentas registradas</div>
        </div>
        <button className="miniBtn" type="button" disabled={loading} onClick={() => {
          setLoading(true)
          setError('')
          loadUsers().catch((e) => setError(e?.message || 'Error')).finally(() => setLoading(false))
        }}>
          Actualizar
        </button>
      </div>
      {error ? <div className="formError">{error}</div> : null}
      {loading ? <div className="mutedText">Cargando…</div> : null}
      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Staff</th>
              <th>Activo</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email || '-'}</td>
                <td>{u.is_staff ? 'Sí' : 'No'}</td>
                <td>{u.is_active ? 'Sí' : 'No'}</td>
                <td>{u.date_joined ? formatDateShort(u.date_joined) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
