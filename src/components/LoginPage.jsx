import React, { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@tecnicosechas.com' && password === 'admin123') {
      window.location.href = '/dashboard'
    } else {
      alert(
        'Credenciales incorrectas. Pruebe con admin@tecnicosechas.com / admin123',
      )
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/hero_bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Overlay for depth and readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '450px',
          padding: '20px',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#ffffff',
              borderRadius: '50%',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              marginBottom: '15px',
            }}
          >
            <img
              src="/icon.png"
              alt="Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '1.8rem',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              margin: 0,
            }}
          >
            TECNI COSECHAS
          </h1>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2
            style={{
              color: '#1a2a3a',
              fontSize: '1.5rem',
              fontWeight: '800',
              marginBottom: '25px',
              textAlign: 'center',
            }}
          >
            Bienvenido de nuevo
          </h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                placeholder="usuario@tecnicosechas.com"
                required
              />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#4caf50',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#43a047'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 15px rgba(76, 175, 80, 0.4)'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#4caf50'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}
            >
              ACCEDER AL PANEL
            </button>
          </form>
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <a
              href="/"
              style={{
                color: '#666',
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              ← Volver a la página principal
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
