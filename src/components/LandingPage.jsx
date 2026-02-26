import React from 'react'

const LandingPage = () => {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        color: '#2c3e50',
        backgroundColor: '#ffffff',
        overflowX: 'hidden',
      }}
    >
      {/* --- HERO SECTION --- */}
      <section
        style={{
          position: 'relative',
          height: '85vh',
          width: '100%',
          backgroundImage: 'url("/hero_bg.png")', // User will provide this
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '40px',
        }}
      >
        {/* Overlay for readability if needed, but the image shows a direct view */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
        ></div>

        {/* Logo & Header content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                flexShrink: 0,
              }}
            >
              <img
                src="/icon.png"
                alt="Tecni Cosechas Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: '900',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              TECNI COSECHAS
            </div>
          </div>

          <div style={{ maxWidth: '700px' }}>
            <h1
              style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                color: '#ffffff',
                lineHeight: '1.1',
                textTransform: 'uppercase',
                marginBottom: '20px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              COSECHA CON PRECISIÓN.
              <br />
              MAXIMIZA TUS GANANCIAS.
            </h1>
            <p
              style={{
                fontSize: '1.5rem',
                color: '#ffffff',
                fontWeight: '500',
                marginBottom: '30px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              Tecni Cosechas: Precisión que Cosecha Futuro.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a
                href="/login"
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  backgroundColor: '#4caf50',
                  color: '#ffffff',
                  padding: '12px 28px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '30px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              >
                DESCUBRE CÓMO
              </a>
              <a
                href="#contacto"
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  padding: '12px 28px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  border: '2px solid #ffffff',
                  borderRadius: '30px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#ffffff'
                  e.target.style.color = '#1b5e20'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#ffffff'
                }}
              >
                CONTÁCTANOS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section
        style={{
          padding: '80px 20px',
          textAlign: 'left',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}
        >
          ACERCA DE NOSOTROS:
        </h2>
        <h3
          style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#2c3e50',
            marginBottom: '30px',
          }}
        >
          Pioneros en la Transformación Digital del Agro Panameño.
        </h3>
        <div
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#555',
            maxWidth: '900px',
            textAlign: 'left',
          }}
        >
          <p style={{ marginBottom: '20px' }}>
            En Tecni Cosechas, somos pioneros en la transformación digital del
            agro panameño. Nacimos en el corazón de las tierras altas de
            Chiriquí con una convicción clara: la tecnología más avanzada debe
            estar al servicio del productor, no para reemplazarlo, sino para
            potenciar su experiencia.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Fusionamos la inteligencia artificial, la visión por computadora y
            la robótica con el conocimiento ancestral del campo. Nuestra
            plataforma no solo cuenta plantas; entrega certeza financiera.
            Ayudamos a los agricultores a estandarizar su producción, maximizar
            cada metro cuadrado de invernadero y conectar sus cosechas premium
            con los mercados más exigentes, reduciendo la merma y aumentando la
            rentabilidad.
          </p>
          <p>
            No somos solo una empresa de software; somos tu socio estratégico en
            el surco, garantizando que cada lechuga que cosechas tenga nombre,
            peso y destino antes de salir de la tierra.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '50px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#4caf50',
                textTransform: 'uppercase',
                marginBottom: '15px',
              }}
            >
              NUESTRA MISIÓN:
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#2c3e50',
                fontWeight: '500',
                fontStyle: 'italic',
              }}
            >
              "Transformar la agricultura de precisión en una herramienta
              accesible y rentable para el productor panameño, utilizando
              inteligencia artificial para convertir la incertidumbre del campo
              en datos procesables que aseguren la calidad, reduzcan el
              desperdicio alimentario y fortalezcan la economía rural."
            </p>
          </div>

          <div>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#4caf50',
                textTransform: 'uppercase',
                marginBottom: '15px',
              }}
            >
              NUESTRA VISIÓN:
            </h2>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#2c3e50',
                fontWeight: '500',
                fontStyle: 'italic',
              }}
            >
              "Ser la plataforma líder en Latinoamérica en certificación digital
              y optimización de cultivos de hoja verde, reconocidos por crear el
              estándar de 'Protocolo de Comunidad' más confiable del mercado,
              donde la tecnología y la sostenibilidad agrícola crecen de la
              mano."
            </p>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#1a2a3a',
              textTransform: 'uppercase',
              marginBottom: '60px',
            }}
          >
            NUESTROS VALORES
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}
          >
            {[
              {
                title: 'Precisión Obsesiva',
                desc: 'No adivinamos, medimos. Creemos en el poder de los datos exactos.',
                icon: '🎯',
              },
              {
                title: 'Innovación con Propósito',
                desc: 'Desarrollamos tecnología que resuelve problemas reales, no solo que se ve bien.',
                icon: '💡',
              },
              {
                title: 'Compromiso con el Productor',
                desc: 'Su éxito es nuestra única métrica de rendimiento. Estamos en el campo con ellos.',
                icon: '🤝',
              },
              {
                title: 'Sostenibilidad Rentable',
                desc: 'Demostramos que cuidar los recursos y reducir la merma es el mejor negocio.',
                icon: '🌱',
              },
            ].map((v, i) => (
              <div
                key={i}
                style={{
                  padding: '30px',
                  borderRadius: '16px',
                  backgroundColor: '#f9f9f9',
                  borderTop: '4px solid #4caf50',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>
                  {v.icon}
                </div>
                <h4
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    color: '#1a2a3a',
                  }}
                >
                  {v.title}
                </h4>
                <p
                  style={{ fontSize: '1rem', color: '#555', lineHeight: '1.5' }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section
        style={{
          padding: '60px 20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#1a2a3a',
              textTransform: 'uppercase',
              marginBottom: '50px',
            }}
          >
            NUESTRO EQUIPO DE EXPERTOS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}
          >
            {/* Expert 1: Ricardo A Sanjur A */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '20px',
              }}
            >
              <img
                src="/expert_1.png"
                alt="Ricardo A Sanjur A"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  backgroundColor: 'transparent',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Ricardo A Sanjur A
              </h4>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Especialidad
              </p>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Ing. Civil con Maestría en Sist. Inf. Geográfico y Diplomado en
                Geodesia
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Descripción
              </p>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Experto en análisis espacial y precisión cartográfica aplicada a
                la agricultura.
              </p>
            </div>

            {/* Expert 2: Miguel Chavarria */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '20px',
              }}
            >
              <img
                src="/expert_2.png"
                alt="Miguel Chavarria"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Miguel Chavarria
              </h4>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Especialidad
              </p>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Lic. en Desarrollo de Software
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Descripción
              </p>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Desarrollador full-stack especializado en arquitecturas
                escalables y soluciones digitales.
              </p>
            </div>

            {/* Expert 3: Ricardo Rodriguez */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '20px',
              }}
            >
              <img
                src="/expert_3.png"
                alt="Ricardo Rodriguez"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Ricardo Rodriguez
              </h4>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Especialidad
              </p>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Ing. Agrónomo
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Descripción
              </p>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Especialista en optimización de cultivos y protocolos de
                producción eficiente.
              </p>
            </div>

            {/* Expert 4: Jessica Hidalgo */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '20px',
              }}
            >
              <img
                src="/expert_4.png"
                alt="Jessica Hidalgo"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Jessica Hidalgo
              </h4>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Especialidad
              </p>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Lic. en Derecho y Ciencias Políticas
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Descripción
              </p>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Experta en procesos de aseguramiento de calidad y gestión
                operativa.
              </p>
            </div>

            {/* Expert 5: Carlos de Obaldia */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '20px',
              }}
            >
              <img
                src="/expert_5.png"
                alt="Carlos de Obaldia"
                style={{
                  width: '100%',
                  height: '240px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              />
              <h4
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 'bold',
                  marginBottom: '5px',
                }}
              >
                Carlos de Obaldia
              </h4>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Especialidad
              </p>
              <p style={{ color: '#666', marginBottom: '15px' }}>
                Ing. en Sistemas
              </p>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '5px',
                  fontSize: '1rem',
                }}
              >
                Descripción
              </p>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>
                Arquitecto de sistemas enfocado en la integración de IA y
                soluciones de automatización.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section
        style={{
          padding: '80px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '800',
              color: '#1a2a3a',
              textTransform: 'uppercase',
              marginBottom: '60px',
            }}
          >
            POR QUÉ ELEGIRNOS
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '3rem',
                  color: '#4caf50',
                  marginBottom: '15px',
                }}
              >
                🎯
              </div>
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                Precisión Milimétrica
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#666' }}>
                Líder experto con experiencia en agronegocios y tecnología.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontSize: '3rem',
                  color: '#4caf50',
                  marginBottom: '15px',
                }}
              >
                📉
              </div>
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                Reducción de Merma
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#666' }}>
                Reducción de merma o montos de reducción de merma.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontSize: '3rem',
                  color: '#4caf50',
                  marginBottom: '15px',
                }}
              >
                📊
              </div>
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                Datos en Tiempo Real
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#666' }}>
                Especialista en cultivos y lechugas y protocolos de calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM SECTION --- */}
      <section
        id="contacto"
        style={{ padding: '80px 20px', backgroundColor: '#f4f7f6' }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: '800',
              color: '#1a2a3a',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            CONTÁCTANOS
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#666',
              marginBottom: '40px',
              fontSize: '1.1rem',
            }}
          >
            ¿Listo para llevar tu producción al siguiente nivel? Déjanos tus
            datos y te contactaremos.
          </p>
          <form
            style={{
              backgroundColor: '#ffffff',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              display: 'grid',
              gap: '20px',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
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
                  placeholder="juan@ejemplo.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Ubicación / Finca
                </label>
                <input
                  type="text"
                  placeholder="Ej. Boquete, Chiriquí"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  placeholder="+507 6000-0000"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                ¿Cómo podemos ayudarte?
              </label>
              <textarea
                placeholder="Cuéntanos sobre tu proyecto o necesidades..."
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  outline: 'none',
                  resize: 'vertical',
                }}
              ></textarea>
            </div>
            <button
              style={{
                backgroundColor: '#4caf50',
                color: '#ffffff',
                padding: '15px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                marginTop: '10px',
              }}
            >
              ENVIAR INFORMACIÓN
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer
        style={{
          backgroundColor: '#0a1a2a',
          color: '#ffffff',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <div style={{ fontSize: '0.9rem', opacity: '0.8' }}>
          info@romeria.com | (34) 223--1381
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '1.2rem' }}>
          <span>📸</span>
          <span>FB</span>
          <span>𝕏</span>
          <span>in</span>
        </div>
      </footer>

      {/* Login Link Floating or at top? The image doesn't show it but we need it */}
      <a
        href="/login"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          color: '#1b5e20',
          padding: '8px 16px',
          borderRadius: '20px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        Login
      </a>
    </div>
  )
}

export default LandingPage
