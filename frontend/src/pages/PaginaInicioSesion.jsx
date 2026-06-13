import { Link } from 'react-router-dom'

export default function PaginaInicioSesion({ error, busy, authForm, onAuthFormChange, onSubmitAuth, locationSearch, onSwitchToRegister }) {
  return (
    <div className="mainInner">
      <section className="card authCard">
        <h2 className="cardTitle">Iniciar sesión</h2>
        {error ? <div className="formError">{error}</div> : null}
        <form className="form" onSubmit={onSubmitAuth}>
          <label className="field"><span>Usuario</span><input value={authForm.username} onChange={(e) => onAuthFormChange({ username: e.target.value })} autoComplete="username" /></label>
          <label className="field"><span>Contraseña</span><input type="password" value={authForm.password} onChange={(e) => onAuthFormChange({ password: e.target.value })} autoComplete="current-password" /></label>
          <button className="primaryBtn" type="submit" disabled={busy}>Entrar</button>
        </form>
        <div className="mutedText">¿No tienes cuenta? <Link to={`/register${locationSearch || ''}`} onClick={onSwitchToRegister}>Regístrate</Link></div>
      </section>
    </div>
  )
}
