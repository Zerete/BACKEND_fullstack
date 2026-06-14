import { Link, Outlet, useLocation } from 'react-router-dom'

export default function DisposicionPublica({ user, isAdmin, busy, onLogout, year }) {
  const location = useLocation()
  if (String(location.pathname || '').includes('admin')) return null

  return (
    <div className="appShell">
      <header className="siteHeader">
        <div className="headerInner">
          <Link className="brand" to="/">
            <img className="brandLogo" src="/logo_nuevo_sys.png" alt="Sanos y Salvos" />
            <span className="brandName">Sanos y Salvos</span>
          </Link>

          <nav className="siteNav" aria-label="Navegación principal">
            <Link className="navLink" to="/">Inicio</Link>
            <Link className="navLink" to="/mapa">Mapa</Link>
            <Link className="navLink" to="/adopciones">Adopciones</Link>
            {/* AQUÍ ESTÁ EL CAMBIO: Se usa <Link> en lugar de <a> */}
            <Link className="navLink" to="/voluntarios">Voluntarios</Link>
            <Link className="navLink" to="/preguntas-frecuentes">Consejos</Link>
          </nav>

          <div className="headerActions">
            {isAdmin ? (
              <Link className="adminBtn" to="/admin">
                Dashboard
              </Link>
            ) : null}
            {user ? (
              <Link className="loginBtn" to="/perfil">
                <svg className="userIcon" viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <path fill="currentColor" d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.505 4.505 0 0 0 12 12Zm0 2.25c-4.135 0-7.5 2.52-7.5 5.625A1.125 1.125 0 0 0 5.625 21h12.75a1.125 1.125 0 0 0 1.125-1.125c0-3.105-3.365-5.625-7.5-5.625Z" />
                </svg>
                <span style={{ marginLeft: '8px' }}>Mi perfil</span>
              </Link>
            ) : (
              <Link className="loginBtn" to="/login?next=/perfil">
                <svg className="userIcon" viewBox="0 0 24 24" role="presentation" aria-hidden="true">
                  <path fill="currentColor" d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.505 4.505 0 0 0 12 12Zm0 2.25c-4.135 0-7.5 2.52-7.5 5.625A1.125 1.125 0 0 0 5.625 21h12.75a1.125 1.125 0 0 0 1.125-1.125c0-3.105-3.365-5.625-7.5-5.625Z" />
                </svg>
                <span style={{ marginLeft: '8px' }}>Iniciar sesion</span>
              </Link>
            )}
            <Link className="reportBtn" to={user ? '/reportar' : '/login?next=/reportar'}>
              Registrar mascota
            </Link>
          </div>
        </div>
      </header>

      <main className="siteMain" role="main">
        <Outlet />
      </main>

      <footer className="siteFooter">
        <div className="footerInner">
          <div className="footerGrid">
            <div className="footerBrand">
              <div className="footerBrandTop">
                <img className="footerLogo" src="/logo_nuevo_sys.png" alt="Sanos y Salvos" />
                <div className="footerBrandName">Sanos y Salvos</div>
              </div>
              <div className="footerText footerTagline">
                Plataforma comunitaria para reportar mascotas perdidas y ayudar a reencontrarlas.
              </div>
              <div className="footerSocialButtons" aria-label="Redes sociales">
                <a className="footerSocialBtn" href="https://instagram.com/sanosysalvos.cl" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                  <svg className="footerSocialIcon" viewBox="0 0 24 24" aria-hidden="true" role="presentation"><path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-2.15a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"/></svg>
                </a>
                <a className="footerSocialBtn" href="https://facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                  <span className="footerSocialIconText" aria-hidden="true">f</span>
                </a>
                <a className="footerSocialBtn" href="https://tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok">
                  <span className="footerSocialIconText" aria-hidden="true">♪</span>
                </a>
              </div>
            </div>
            <div className="footerCol">
              <div className="footerTitle">Contacto</div>
              <a className="footerLink" href="mailto:contacto@sanosysalvos.cl">contacto@sanosysalvos.cl</a>
              <div className="footerText">Chile</div>
            </div>
            <div className="footerCol">
              <div className="footerTitle">Navegación</div>
              <div className="footerLinks">
                <Link className="footerLink" to="/">Inicio</Link>
                <Link className="footerLink" to="/adopciones">Adopciones</Link>
                <a className="footerLink" href="/#sobre-nosotros">Sobre nosotros</a>
                <Link className="footerLink" to="/preguntas-frecuentes">Preguntas frecuentes</Link>
                <Link className="footerLink" to="/reportar">Reportar mascota</Link>
              </div>
            </div>
            <div className="footerCol">
              <div className="footerTitle">Empresa</div>
              <div className="footerLinks">
                <a className="footerLink" href="/#sobre-nosotros">Nosotros</a>
                <Link className="footerLink" to="/politicas-de-privacidad">Políticas de privacidad</Link>
                <Link className="footerLink" to="/terminos-y-condiciones">Términos y condiciones</Link>
              </div>
            </div>
          </div>
          <div className="footerBottom">
            <div>© {year} Sanos y Salvos</div>
            <div className="footerSmall">Hecho para la comunidad</div>
          </div>
        </div>
      </footer>
    </div>
  )
}