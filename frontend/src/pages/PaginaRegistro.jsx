import { Link } from 'react-router-dom'

export default function PaginaRegistro({ error, busy, authForm, onAuthFormChange, onSubmitAuth, locationSearch, onSwitchToLogin }) {
  return (
    <div className="mainInner">
      <section className="card authCard">
        <h2 className="cardTitle">Registro</h2>
        {error ? <div className="formError">{error}</div> : null}
        <form className="form" onSubmit={onSubmitAuth}>
          <label className="field"><span>Usuario</span><input value={authForm.username} onChange={(e) => onAuthFormChange({ username: e.target.value })} autoComplete="username" /></label>
          <label className="field"><span>Contraseña</span><input type="password" value={authForm.password} onChange={(e) => onAuthFormChange({ password: e.target.value })} autoComplete="new-password" /></label>
          <label className="field"><span>Email</span><input type="email" value={authForm.email} onChange={(e) => onAuthFormChange({ email: e.target.value })} autoComplete="email" /></label>
          <button className="primaryBtn" type="submit" disabled={busy}>Crear cuenta</button>
        </form>
        <div className="mutedText">¿Ya tienes cuenta? <Link to={`/login${locationSearch || ''}`} onClick={onSwitchToLogin}>Inicia sesión</Link></div>
      </section>
    </div>
  )
}
