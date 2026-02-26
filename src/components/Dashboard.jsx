import React, { useState, useEffect } from 'react'
import '../styles/global.css'

const GREENHOUSES = [
  {
    id: '1',
    name: 'INVERNADERO 1',
    area: 2000,
    tunnels: 6,
    beds: 10,
    plantsPerBed: 470,
    segmentsPerBed: 10,
  },
  {
    id: '2',
    name: 'INVERNADERO 2',
    area: 4900,
    tunnels: 7,
    beds: 10,
    plantsPerBed: 980,
    segmentsPerBed: 20,
  },
]

const SURVEY_HISTORY = {
  '2026-02-02': { 1: [2, 3], 2: [3, 4] },
  '2026-02-09': { 1: [1, 5, 6], 2: [1, 2, 7] },
  '2026-02-16': { 1: [2, 3, 4], 2: [4, 5, 6] },
  '2026-02-24': { 1: [1, 2, 3, 4, 5, 6], 2: [1, 2, 3, 4, 5, 6, 7] },
}

const CLIENTS = [
  { id: 'rey', name: 'Rey', minWeight: 150, image: '/clients/rey.jpg' },
  {
    id: 'riba_smith',
    name: 'Riba Smith',
    minWeight: 180,
    image: '/clients/riba_smith.jpg',
  },
  { id: 'xtra', name: 'Xtra', minWeight: 120, image: '/clients/xtra.jpg' },
  {
    id: 'super_99',
    name: 'Super 99',
    minWeight: 110,
    image: '/clients/super99.jpg',
  },
  {
    id: 'otros',
    name: 'Otros (Especificar)',
    minWeight: 0,
    image: '/clients/otros.jpg',
  },
]

const Dashboard = () => {
  const [selectedGH, setSelectedGH] = useState(GREENHOUSES[0])
  const [selectedClient, setSelectedClient] = useState(CLIENTS[0])
  const [customWeight, setCustomWeight] = useState('')
  const [quotation, setQuotation] = useState(350)
  const [cropType, setCropType] = useState('Lechuga')
  const [date, setDate] = useState('2026-02-02')

  const standardWeightPerPlant = 0.1915 // kg
  const comercialWeightPerPlant = 0.1 // kg
  const boxCapacity = 5 // kg/box

  // Check if a tunnel is surveyed for the current date and GH
  const isTunnelSurveyed = (tunnelId) => {
    const dayRecord = SURVEY_HISTORY[date]
    if (!dayRecord) return false // Return false if no data to gray out tunnels
    const ghSurveyed = dayRecord[selectedGH.id]
    return ghSurveyed ? ghSurveyed.includes(tunnelId) : false
  }

  const calculateYield = (segments, plantsPerBed, isSurveyed) => {
    if (!isSurveyed) return { premium: 0, comercial: 0, total: 0 }
    const goodCount = segments.filter((s) => s === 1).length
    const badCount = segments.length - goodCount
    const premium =
      (goodCount / segments.length) * plantsPerBed * standardWeightPerPlant
    const comercial =
      (badCount / segments.length) * plantsPerBed * comercialWeightPerPlant
    return { premium, comercial, total: premium + comercial }
  }

  const generateTunnels = (config) => {
    return Array.from({ length: config.tunnels }, (_, tIndex) => ({
      id: tIndex + 1,
      beds: Array.from({ length: 10 }, (_, bIndex) => {
        const segmentsCount = config.segmentsPerBed
        const minGood = Math.ceil(segmentsCount * 0.3)
        const maxGood = Math.floor(segmentsCount * 0.8)
        const goodSegmentsCount =
          Math.floor(Math.random() * (maxGood - minGood + 1)) + minGood

        const segments = Array(segmentsCount).fill(0)
        const indices = Array.from({ length: segmentsCount }, (_, i) => i).sort(
          () => Math.random() - 0.5,
        )
        for (let i = 0; i < goodSegmentsCount; i++) {
          segments[indices[i]] = 1
        }
        return { id: bIndex + 1, segments: segments }
      }),
    }))
  }

  const [tunnels, setTunnels] = useState(generateTunnels(GREENHOUSES[0]))
  const [recommendedBeds, setRecommendedBeds] = useState([])
  const [totalEstimated, setTotalEstimated] = useState({
    premium: 0,
    surplus: 0,
    comercial: 0,
    total: 0,
  })
  const [totalInventory, setTotalInventory] = useState({
    premium: 0,
    comercial: 0,
    total: 0,
  })
  const [selectedBed, setSelectedBed] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [showOrtofoto, setShowOrtofoto] = useState(false)
  const [showPhotosModal, setShowPhotosModal] = useState(false)

  // Update tunnels when greenhouse changes
  useEffect(() => {
    setTunnels(generateTunnels(selectedGH))
    setSelectedBed(null)
    setRecommendedBeds([])
  }, [selectedGH])

  // Update recommendations and inventory when tunnels or quotation change
  useEffect(() => {
    const allBedsWithYield = tunnels.flatMap((t) => {
      const isSurveyed = isTunnelSurveyed(t.id)
      return t.beds.map((b) => {
        const yieldData = calculateYield(
          b.segments,
          selectedGH.plantsPerBed,
          isSurveyed,
        )
        return {
          ...b,
          tunnelId: t.id,
          isSurveyed,
          ...yieldData,
        }
      })
    })

    const inventory = {
      premium: allBedsWithYield.reduce((acc, b) => acc + b.premium, 0),
      comercial: allBedsWithYield.reduce((acc, b) => acc + b.comercial, 0),
      total: allBedsWithYield.reduce((acc, b) => acc + b.total, 0),
    }
    setTotalInventory(inventory)

    const sortedBeds = [...allBedsWithYield].sort(
      (a, b) => b.premium - a.premium,
    )
    let currentPremiumTotal = 0
    let currentComercial = 0
    const recommended = []
    for (const bed of sortedBeds) {
      if (currentPremiumTotal < quotation) {
        recommended.push(bed)
        currentPremiumTotal += bed.premium
        currentComercial += bed.comercial
      } else {
        break
      }
    }
    setRecommendedBeds(recommended)

    const premiumMeta = Math.min(currentPremiumTotal, quotation)
    const surplusPremium = Math.max(0, currentPremiumTotal - quotation)

    setTotalEstimated({
      premium: premiumMeta,
      surplus: surplusPremium,
      comercial: currentComercial,
      total: currentPremiumTotal + currentComercial,
    })
  }, [quotation, tunnels, selectedGH])

  const getTunnelBeds = (tunnelId) => {
    return recommendedBeds
      .filter((b) => b.tunnelId === tunnelId)
      .map((b) => b.id)
      .join(', ')
  }

  return (
    <div style={{ padding: '0', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div
        className="header-banner"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img
            src="/icon.png"
            alt="Logo"
            style={{
              height: '50px',
              width: '50px',
              objectFit: 'cover',
              backgroundColor: '#fff',
              padding: '4px',
              borderRadius: '50%',
            }}
          />
          <div>
            <h2 style={{ margin: 0 }}>TECNI COSECHAS</h2>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>FECHA MUESTREO:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: '0.4rem',
                borderRadius: '4px',
                border: 'none',
                marginRight: '5px',
              }}
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              {Object.keys(SURVEY_HISTORY)
                .sort()
                .map((histDate) => {
                  const isSelected = date === histDate
                  const dateObj = new Date(histDate + 'T00:00:00') // Ensure local time
                  const label = dateObj
                    .toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                    })
                    .toUpperCase()
                  return (
                    <button
                      key={histDate}
                      onClick={() => setDate(histDate)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.7rem',
                        borderRadius: '15px',
                        border:
                          '1px solid ' +
                          (isSelected ? '#2e7d32' : 'rgba(255,255,255,0.3)'),
                        backgroundColor: isSelected
                          ? '#fff'
                          : 'rgba(255,255,255,0.1)',
                        color: isSelected ? '#2e7d32' : '#fff',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '1.5rem',
          padding: '1.5rem',
        }}
      >
        {/* Main Content: Greenhouse Map */}
        <div className="card">
          <div
            style={{
              backgroundColor: '#2e7d32',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>MAPA DEL INVERNADERO (Vista de Túneles)</span>
            <span
              style={{
                fontSize: '0.85rem',
                opacity: 0.9,
                fontWeight: 'normal',
              }}
            >
              {selectedGH.name} • {selectedGH.area} m²
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '2rem',
              padding: '0.5rem',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#0056b3',
                  borderRadius: '4px',
                }}
              ></div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: '#0056b3',
                }}
              >
                Premium (Cat A)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#e67e22',
                  borderRadius: '4px',
                }}
              ></div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: '#e67e22',
                }}
              >
                Comercial (Cat B)
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
              justifyContent: 'center',
            }}
          >
            {tunnels.map((tunnel) => {
              const isSurveyed = isTunnelSurveyed(tunnel.id)
              return (
                <div
                  key={tunnel.id}
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #eee',
                    minWidth: 'min-content',
                    opacity: isSurveyed ? 1 : 0.4,
                    filter: isSurveyed ? 'none' : 'grayscale(1)',
                    pointerEvents: isSurveyed ? 'auto' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <h3
                    style={{
                      marginBottom: '1.2rem',
                      fontSize: '1rem',
                      color: isSurveyed ? '#2e7d32' : '#999',
                      borderBottom:
                        '2px solid' + (isSurveyed ? '#e8f5e9' : '#eee'),
                      paddingBottom: '0.5rem',
                    }}
                  >
                    TÚNEL {tunnel.id} {!isSurveyed && '(NO LEVANTADO)'}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {tunnel.beds.map((bed) => {
                      const isRecommended = recommendedBeds.some(
                        (rb) => rb.id === bed.id && rb.tunnelId === tunnel.id,
                      )
                      return (
                        <div
                          key={bed.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            const yieldData = calculateYield(
                              bed.segments,
                              selectedGH.plantsPerBed,
                              isSurveyed,
                            )
                            setSelectedBed({
                              ...bed,
                              tunnelId: tunnel.id,
                              ...yieldData,
                            })
                          }}
                        >
                          <span
                            style={{ fontSize: '0.65rem', marginBottom: '2px' }}
                          >
                            {bed.id}
                          </span>
                          <div
                            style={{
                              width: '20px',
                              height: selectedGH.id === '2' ? '380px' : '210px',
                              border: isRecommended
                                ? '2.5px solid #ffeb3b'
                                : selectedBed?.id === bed.id &&
                                    selectedBed?.tunnelId === tunnel.id
                                  ? '2.5px solid #0056b3'
                                  : '1px solid #ccc',
                              borderRadius: '8px',
                              display: 'flex',
                              flexDirection: 'column',
                              overflow: 'hidden',
                              transition:
                                'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              boxShadow: isRecommended
                                ? '0 0 10px rgba(255, 235, 59, 0.7)'
                                : 'none',
                            }}
                          >
                            {bed.segments.map((seg, i) => (
                              <div
                                key={i}
                                style={{
                                  flex: 1,
                                  backgroundColor:
                                    seg === 1 ? '#0056b3' : '#e67e22',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontSize: '0.55rem',
                                  borderBottom:
                                    i < bed.segments.length - 1
                                      ? '1px solid rgba(255,255,255,0.2)'
                                      : 'none',
                                }}
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Inventory Summary at Bottom of Map Card */}
          <div
            style={{
              marginTop: '2.5rem',
              borderTop: '2px solid #eee',
              paddingTop: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
            }}
          >
            <div>
              <p
                style={{
                  color: '#1b5e20',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginBottom: '0.8rem',
                }}
              >
                RESUMEN DE COSECHA ACTUAL
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '1rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '1.2rem', color: '#0056b3' }}>
                    <strong>{totalEstimated.premium.toFixed(1)}kg</strong>
                  </span>
                  <p style={{ fontSize: '0.65rem', color: '#666' }}>
                    TOTAL PREMIUM
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '1.2rem', color: '#0056b3' }}>
                    <strong>{totalEstimated.surplus.toFixed(1)}kg</strong>
                  </span>
                  <p style={{ fontSize: '0.65rem', color: '#666' }}>
                    SOBRANTE PREM.
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '1.2rem', color: '#e67e22' }}>
                    <strong>{totalEstimated.comercial.toFixed(1)}kg</strong>
                  </span>
                  <p style={{ fontSize: '0.65rem', color: '#666' }}>
                    TOTAL COMERCIAL
                  </p>
                </div>
                <div
                  style={{ borderLeft: '1px solid #ddd', paddingLeft: '1rem' }}
                >
                  <span style={{ fontSize: '1.2rem', color: '#333' }}>
                    <strong>{totalEstimated.total.toFixed(1)}kg</strong>
                  </span>
                  <p
                    style={{
                      fontSize: '0.65rem',
                      color: '#333',
                      fontWeight: 'bold',
                    }}
                  >
                    TOTAL COSECHADO
                  </p>
                </div>
                <div
                  style={{ borderLeft: '1px solid #ddd', paddingLeft: '1rem' }}
                >
                  <span style={{ fontSize: '1.2rem', color: '#e65100' }}>
                    <strong>
                      {(
                        totalEstimated.surplus + totalEstimated.comercial
                      ).toFixed(1)}
                      kg
                    </strong>
                  </span>
                  <p
                    style={{
                      fontSize: '0.65rem',
                      color: '#666',
                      fontWeight: 'bold',
                    }}
                  >
                    TOTAL EXCEDENTE
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p
                style={{
                  color: '#666',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  marginBottom: '0.8rem',
                }}
              >
                INVENTARIO DISPONIBLE EN CAMPO
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    padding: '0.8rem',
                    backgroundColor: '#eef6ff',
                    borderRadius: '8px',
                    borderLeft: '4px solid #0056b3',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>
                    INVENTARIO PREMIUM (Cat A)
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#0056b3',
                    }}
                  >
                    {totalInventory.premium.toFixed(1)} kg
                  </p>
                </div>
                <div
                  style={{
                    padding: '0.8rem',
                    backgroundColor: '#fff3e0',
                    borderRadius: '8px',
                    borderLeft: '4px solid #e67e22',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>
                    INVENTARIO COMERCIAL (Cat B)
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: '#e65100',
                    }}
                  >
                    {totalInventory.comercial.toFixed(1)} kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.2rem' }}>
            <h4
              style={{
                marginBottom: '1.2rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '0.5rem',
                fontSize: '0.9rem',
                color: '#1b5e20',
                letterSpacing: '0.5px',
              }}
            >
              CONTACTO TÉCNICO
            </h4>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #2e7d32',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/perfil.png"
                  alt="Ing. Ricardo Rodríguez"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                  Ing. Ricardo Rodríguez
                </p>
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: '0.8rem',
                    color: '#666',
                    fontWeight: 'bold',
                  }}
                >
                  Agrícola RS Hermanos
                </p>
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: '0.85rem',
                    color: '#2e7d32',
                  }}
                >
                  📞 68853787
                </p>
                <div
                  style={{
                    marginTop: '0.8rem',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid #eee',
                    fontSize: '0.75rem',
                    color: '#666',
                  }}
                >
                  <p style={{ margin: '2px 0' }}>
                    📍 <strong>Lugar:</strong> Potrerillos Abajo
                  </p>
                  <p style={{ margin: '2px 0' }}>
                    📑 <strong>Finca N°:</strong> 75483
                  </p>
                  <a
                    href="https://www.google.com/maps/place/8%C2%B041'53.9%22N+82%C2%B030'36.6%22W/@8.698337,-82.5104474,198m/data=!3m1!1e3!4m4!3m3!8m2!3d8.698304!4d-82.510176!17m2!4m1!1e3!18m1!1e1?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '8px',
                      fontSize: '0.7rem',
                      backgroundColor: '#2e7d32',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    VER EN GOOGLE MAPS
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.2rem',
                paddingTop: '1.2rem',
                borderTop: '1px solid #eee',
              }}
            >
              <p
                style={{
                  margin: '0 0 10px 0',
                  fontSize: '0.8rem',
                  color: '#666',
                  fontWeight: 'bold',
                }}
              >
                FOTOS DE INSTALACIÓN
              </p>
              <button
                onClick={() => setShowPhotosModal(true)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: '#f5f5f5',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: 'bold',
                  color: '#333',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#e0e0e0')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#f5f5f5')
                }
              >
                <span style={{ fontSize: '1.2rem' }}>📸</span>
                VER GALERÍA DE INSTALACIONES
              </button>
            </div>
          </div>

          <div className="card">
            <h4
              style={{
                marginBottom: '1.2rem',
                borderBottom: '1px solid #eee',
                paddingBottom: '0.5rem',
              }}
            >
              CONTROLES DE COSECHA
            </h4>

            {/* selected bed details display */}
            {selectedBed && (
              <div
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#eef6ff',
                  border: '1px solid #0056b3',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: 'bold' }}>
                    T{selectedBed.tunnelId} - Cama {selectedBed.id}
                  </span>
                  <button
                    onClick={() => setSelectedBed(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#999',
                      cursor: 'pointer',
                    }}
                  >
                    &times;
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#0056b3', fontWeight: 'bold' }}>
                      PREMIUM (A):
                    </span>{' '}
                    <strong>{selectedBed.premium.toFixed(1)}kg</strong>
                  </div>
                  <div>
                    <span style={{ color: '#e67e22', fontWeight: 'bold' }}>
                      COMERCIAL (B):
                    </span>{' '}
                    <strong>{selectedBed.comercial.toFixed(1)}kg</strong>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '0.75rem',
                    marginTop: '0.5rem',
                    color: '#666',
                  }}
                >
                  Viabilidad:{' '}
                  {(
                    (selectedBed.segments.filter((s) => s === 1).length /
                      selectedBed.segments.length) *
                    100
                  ).toFixed(0)}
                  % ({selectedBed.segments.length} tramos)
                </p>
                <button
                  onClick={() => setShowOrtofoto(true)}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    padding: '6px',
                    backgroundColor: '#0056b3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                  }}
                >
                  🔍 VER ORTOFOTO (AI)
                </button>
              </div>
            )}

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  INVERNADERO:
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                  value={selectedGH.id}
                  onChange={(e) =>
                    setSelectedGH(
                      GREENHOUSES.find((gh) => gh.id === e.target.value),
                    )
                  }
                >
                  {GREENHOUSES.map((gh) => (
                    <option key={gh.id} value={gh.id}>
                      {gh.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  CLIENTE:
                </label>
                <select
                  value={selectedClient.id}
                  onChange={(e) =>
                    setSelectedClient(
                      CLIENTS.find((c) => c.id === e.target.value),
                    )
                  }
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    marginBottom: '8px',
                  }}
                >
                  {CLIENTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                {selectedClient.id === 'otros' ? (
                  <div style={{ marginBottom: '8px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: '#666',
                        marginBottom: '4px',
                      }}
                    >
                      Peso mínimo (g):
                    </label>
                    <input
                      type="number"
                      value={customWeight}
                      onChange={(e) => setCustomWeight(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                      }}
                    />
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#666',
                      margin: '4px 0 8px 0',
                    }}
                  >
                    Peso mínimo: <strong>{selectedClient.minWeight}g</strong>
                  </p>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  COTIZACIÓN PREMIUM (KG):
                </label>
                <input
                  type="number"
                  value={quotation}
                  onChange={(e) => setQuotation(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    color: '#666',
                    marginBottom: '4px',
                  }}
                >
                  CULTIVO:
                </label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                >
                  <option>Lechuga</option>
                  <option>Tomate</option>
                  <option>Pimentón</option>
                  <option>Cebolla</option>
                  <option>Pepino</option>
                  <option>Berenjena</option>
                </select>
              </div>
            </div>

            {/* Harvest Plan Recap */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #1b5e20',
              }}
            >
              <p
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: '#1b5e20',
                  marginBottom: '0.8rem',
                }}
              >
                PLAN DE COSECHA RECOMENDADO
              </p>
              {tunnels.map((t) => {
                const beds = getTunnelBeds(t.id)
                if (!beds) return null
                return (
                  <div
                    key={t.id}
                    style={{
                      marginBottom: '0.6rem',
                      paddingBottom: '0.4rem',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                      }}
                    >
                      <strong>Túnel {t.id}</strong>
                      <span>
                        {recommendedBeds
                          .filter((b) => b.tunnelId === t.id)
                          .reduce((acc, b) => acc + b.premium, 0)
                          .toFixed(1)}{' '}
                        kg P.
                      </span>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#666' }}>
                      Camas: {beds}
                    </p>
                  </div>
                )
              })}
              <div style={{ marginTop: '0.8rem', paddingTop: '0.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#0056b3',
                  }}
                >
                  <span>TOTAL PREMIUM (Cat A):</span>
                  <strong>{totalEstimated.premium.toFixed(1)} kg</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: '#0056b3',
                    marginTop: '4px',
                  }}
                >
                  <span>SOBRANTE PREMIUM (Cat A):</span>
                  <strong>{totalEstimated.surplus.toFixed(1)} kg</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: '#e67e22',
                    marginTop: '4px',
                  }}
                >
                  <span>TOTAL COMERCIAL (Cat B):</span>
                  <strong>{totalEstimated.comercial.toFixed(1)} kg</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.95rem',
                    color: '#333',
                    marginTop: '10px',
                    backgroundColor: '#eee',
                    padding: '6px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  <span>TOTAL COSECHADO:</span>
                  <span>{totalEstimated.total.toFixed(1)} kg</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#e65100',
                    marginTop: '8px',
                    borderTop: '1px solid #eee',
                    paddingTop: '6px',
                    fontWeight: 'bold',
                  }}
                >
                  <span>TOTAL EXCEDENTE:</span>
                  <strong>
                    {(
                      totalEstimated.surplus + totalEstimated.comercial
                    ).toFixed(1)}{' '}
                    kg
                  </strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#0056b3',
                    marginTop: '8px',
                    borderTop: '1px solid #ddd',
                    paddingTop: '6px',
                  }}
                >
                  <span>CAJAS PREMIUM (Cat A):</span>
                  <strong>
                    {Math.ceil(totalEstimated.premium / boxCapacity)}
                  </strong>
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: '1.5rem', padding: '1rem' }}
              onClick={() => setShowReport(true)}
            >
              GENERAR INFORME DETALLADO
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Informe */}
      {showReport && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '900px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #eee',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
              >
                <img
                  src="/icon.png"
                  alt="Logo"
                  style={{
                    height: '60px',
                    width: '60px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '1px solid #eee',
                  }}
                />
                <div>
                  <h2 style={{ color: '#2e7d32', margin: 0 }}>
                    TECNI COSECHAS - REPORTE INTELIGENTE
                  </h2>
                  <p style={{ color: '#666', margin: 0 }}>
                    Agrícola RS Hermanos - {selectedGH.name}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>
                  ID REPORTE:{' '}
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p style={{ margin: 0, color: '#666' }}>
                  FECHA MUESTREO: {date}
                </p>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <h4 style={{ marginBottom: '0.8rem' }}>RESUMEN LOGÍSTICO</h4>
                <p>
                  Meta Cotizada: <strong>{quotation} kg</strong>
                </p>
                <div style={{ marginBottom: '1rem' }}>
                  <p
                    style={{
                      borderBottom: '1px solid #eee',
                      paddingBottom: '4px',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '0.85rem',
                    }}
                  >
                    Resumen de Cosecha:
                  </p>
                  <p
                    style={{
                      color: '#0056b3',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Premium (Cat A) Pedido:</span>{' '}
                    <strong>{totalEstimated.premium.toFixed(1)} kg</strong>
                  </p>
                  <p
                    style={{
                      color: '#0056b3',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Sobrante Premium (Cat A):</span>{' '}
                    <strong>{totalEstimated.surplus.toFixed(1)} kg</strong>
                  </p>
                  <p
                    style={{
                      color: '#e67e22',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Comercial (Cat B) Total:</span>{' '}
                    <strong>{totalEstimated.comercial.toFixed(1)} kg</strong>
                  </p>
                  <p
                    style={{
                      borderTop: '1px solid #1b5e20',
                      marginTop: '4px',
                      paddingTop: '4px',
                      color: '#1b5e20',
                      fontWeight: 'bold',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>TOTAL COSECHADO:</span>{' '}
                    <strong>{totalEstimated.total.toFixed(1)} kg</strong>
                  </p>
                  <p
                    style={{
                      color: '#e65100',
                      fontSize: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px',
                      backgroundColor: '#fff8f1',
                      borderRadius: '4px',
                    }}
                  >
                    <span>Total Excedente (Sobrante A + B):</span>{' '}
                    <strong>
                      {(
                        totalEstimated.surplus + totalEstimated.comercial
                      ).toFixed(1)}{' '}
                      kg
                    </strong>
                  </p>
                </div>
              </div>
              <p style={{ marginTop: '0.8rem', fontSize: '1.1rem' }}>
                Total Cajas Premium (Cat A) @5kg:{' '}
                <strong>
                  {Math.ceil(totalEstimated.premium / boxCapacity)}
                </strong>
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#f5f5f5',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h4 style={{ marginBottom: '0.8rem' }}>DETALLE DE CAMAS</h4>
              <div
                style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  padding: '10px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #eee',
                }}
              >
                {recommendedBeds.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: '1.2rem',
                      padding: '0.8rem',
                      border: '1px solid #eee',
                      borderRadius: '8px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      <span>
                        Túnel {b.tunnelId} - Cama {b.id}
                      </span>
                      <span style={{ color: '#2e7d32' }}>
                        {b.premium.toFixed(1)}kg A / {b.comercial.toFixed(1)}kg
                        B
                      </span>
                    </div>
                    {/* Miniature Bed Chart */}
                    <div
                      style={{
                        display: 'flex',
                        height: '24px',
                        width: '100%',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #ddd',
                        backgroundColor: '#f5f5f5',
                      }}
                    >
                      {b.segments.map((seg, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            flex: 1,
                            backgroundColor: seg === 1 ? '#0056b3' : '#e67e22',
                            borderRight:
                              sIdx < b.segments.length - 1
                                ? '1px solid rgba(255,255,255,0.2)'
                                : 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '0.6rem',
                            lineHeight: '1',
                          }}
                        >
                          <span style={{ fontWeight: 'bold' }}>
                            {seg === 1 ? 'A' : 'B'}
                          </span>
                          <span>{sIdx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1.5rem',
                  borderTop: '1px solid #eee',
                  paddingTop: '1.5rem',
                }}
              >
                <button
                  className="btn-primary"
                  style={{ flex: 2, padding: '1rem' }}
                  onClick={() => window.print()}
                >
                  IMPRIMIR / EXPORTAR PDF
                </button>
                <button
                  onClick={() => setShowReport(false)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#eee',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: '#666',
                  }}
                >
                  VOLVER AL MAPA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ortofoto */}
      {showOrtofoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '1000px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ margin: 0, color: '#1b5e20' }}>
                VISTA DE ORTOFOTO (DETALLE AI)
              </h3>
              <button
                onClick={() => setShowOrtofoto(false)}
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '5px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                CERRAR
              </button>
            </div>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '1rem',
              }}
            >
              Túnel {selectedBed.tunnelId} - Cama {selectedBed.id} | Análisis
              multiespectral para detección de vigor y calidad.
            </p>
            <div
              style={{
                width: '100%',
                height: '60vh',
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/ortofoto.png"
                alt="Detección Ortofoto"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  cursor: 'zoom-in',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.5)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
            </div>
          </div>
        </div>
      )}
      {/* Modal de Fotos de Instalaciones */}
      {showPhotosModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '2rem',
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                flexShrink: 0,
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: '#1b5e20' }}>
                  FOTOS DE INSTALACIONES
                </h3>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: '0.85rem',
                    color: '#666',
                  }}
                >
                  Agrícola RS Hermanos - Potrerillos Abajo
                </p>
              </div>
              <button
                onClick={() => setShowPhotosModal(false)}
                style={{
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '5px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                CERRAR
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignContent: 'center',
                gap: '1.5rem',
                padding: '1rem',
              }}
            >
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  style={{
                    backgroundColor: '#eee',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    width: 'calc(50% - 1rem)',
                    maxWidth: '380px',
                    aspectRatio: '4/3',
                    border: '1px solid #ddd',
                    position: 'relative',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                >
                  <img
                    src={`/instalaciones/foto${num}.jpg`}
                    alt={`Instalación ${num}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div
                    style={{
                      display: 'none',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      color: '#999',
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>📸</span>
                    <span style={{ fontSize: '0.8rem', marginTop: '8px' }}>
                      Foto {num} no disponible
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
