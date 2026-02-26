import React, { useState } from 'react';

const LandingPage = () => {
  return (
    <div className="landing-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Tecni-Cosechas</h1>
      <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '2rem' }}>
        Optimización de cosecha inteligente basada en IA para invernaderos de alta precisión.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="/login" className="btn-primary" style={{ textDecoration: 'none', background: 'white', color: '#1b5e20', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 'bold' }}>
          Ingresar al Sistema
        </a>
      </div>
      
      <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '1000px' }}>
        <div className="glass-card" style={{ padding: '1.5rem', color: 'white' }}>
          <h3>Mapa Real</h3>
          <p>Visualiza tus túneles y camas en tiempo real.</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', color: 'white' }}>
          <h3>Análisis IA</h3>
          <p>Detección automática de producto óptimo mediante ortofotos.</p>
        </div>
        <div className="glass-card" style={{ padding: '1.5rem', color: 'white' }}>
          <h3>Gestión de Pedidos</h3>
          <p>Calcula exactamente qué cosechar para cumplir tus metas.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
