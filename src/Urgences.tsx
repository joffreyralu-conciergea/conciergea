import { useState } from 'react'

type Urgence = {
  id: number
  type: string
  emoji: string
  bien: string
  adresse: string
  conciergerie: string
  statut: 'en_cours' | 'resolue' | 'en_attente'
  heure: string
  eta: string
  color: string
  actions: string[]
}

const urgences: Urgence[] = [
  {
    id: 1,
    type: 'Fuite eau',
    emoji: '💧',
    bien: 'Appartement Vieux Pont',
    adresse: '61 Rue du Pont de Mayenne, Laval',
    conciergerie: 'Sofia Hernandez',
    statut: 'en_cours',
    heure: 'Il y a 12 min',
    eta: '8 minutes',
    color: '#3A5C7A',
    actions: ['Sofia a accepte la mission', 'Plombier contacte', 'En route vers le bien']
  },
  {
    id: 2,
    type: 'Serrure cassee',
    emoji: '🗝️',
    bien: 'Studio Marais',
    adresse: '14 Rue de Bretagne, Paris 3e',
    conciergerie: 'Carlos Moreno',
    statut: 'resolue',
    heure: 'Hier 18h',
    eta: 'Resolue',
    color: '#4A7C59',
    actions: ['Carlos est intervenu', 'Serrure remplacee', 'Voyageur satisfait']
  },
]

export default function Urgences({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  const urg = urgences.find(u => u.id === selected)

  const S = {
    page: { minHeight: '100vh', background: '#1A1410' } as const,
    header: { background: '#2C2218', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #3E3028' } as const,
    back: { background: 'none', border: 'none', color: '#8C7E72', cursor: 'pointer', fontSize: 20 } as const,
    htitle: { fontFamily: 'Georgia', fontSize: 18, color: 'white', margin: 0, flex: 1 } as const,
    info: { background: '#FBF0EA', padding: '10px 16px', fontSize: 11, color: '#8C4E2E', borderBottom: '1px solid #E8DECE' } as const,
    infoV: { background: '#4A7C5911', padding: '10px 16px', fontSize: 11, color: '#4A7C59', borderBottom: '1px solid #3E3028' } as const,
    card: { background: '#2C2218', borderRadius: 16, padding: 16, margin: '12px 14px', cursor: 'pointer' } as const,
    badge: (c: string) => ({ background: c + '22', color: c, fontSize: 10, fontWeight: 700 as const, padding: '3px 10px', borderRadius: 20, display: 'inline-block' }),
    btn: (c: string) => ({ background: c, color: 'white', border: 'none', borderRadius: 50, padding: '13px 24px', fontSize: 13, fontWeight: 700 as const, cursor: 'pointer', width: '100%' as const }),
  }

  if (selected !== null && urg) return (
    <div style={S.page}>
      <div style={S.header}>
        <button onClick={() => setSelected(null)} style={S.back}>←</button>
        <div style={{ flex: 1 }}>
          <div style={S.htitle}>{urg.emoji} {urg.type}</div>
          <div style={{ fontSize: 11, color: urg.statut === 'resolue' ? '#4A7C59' : '#C4714A', marginTop: 2 }}>
            {urg.statut === 'resolue' ? '✓ Resolue' : '● En cours'}
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ background: '#2C2218', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#8C7E72', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>BIEN CONCERNE</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>{urg.bien}</div>
          <div style={{ fontSize: 12, color: '#8C7E72' }}>📍 {urg.adresse}</div>
        </div>

        <div style={{ background: '#2C2218', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#8C7E72', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>CONCIERGERIE EN CHARGE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: '#3E3028', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{urg.conciergerie}</div>
              <div style={{ fontSize: 12, color: urg.statut === 'resolue' ? '#4A7C59' : '#C4714A', marginTop: 3 }}>
                {urg.statut === 'resolue' ? '✓ Mission terminee' : `ETA ${urg.eta}`}
              </div>
            </div>
            {urg.statut === 'en_cours' && (
              <div style={{ textAlign: 'right' as const }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#C4714A', fontFamily: 'Georgia' }}>{urg.eta}</div>
                <div style={{ fontSize: 10, color: '#8C7E72' }}>avant arrivee</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ background: '#2C2218', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#8C7E72', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>SUIVI EN TEMPS REEL</div>
          {urg.actions.map((action, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#4A7C59', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'white', flexShrink: 0 }}>✓</div>
              <div style={{ fontSize: 13, color: 'white', paddingTop: 4 }}>{action}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#2C2218', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#8C7E72', marginBottom: 8 }}>
            Votre role dans cette urgence
          </div>
          <div style={{ fontSize: 13, color: 'white', lineHeight: 1.6 }}>
            {urg.statut === 'resolue'
              ? 'Urgence resolue par votre conciergerie. Aucune action requise de votre part.'
              : 'Votre conciergerie gere tout. Vous etes informe en temps reel. Aucune action requise.'}
          </div>
        </div>

        {urg.statut === 'en_cours' && (
          <button style={S.btn('#3A5C7A')}>
            📞 Contacter Sofia si necessaire
          </button>
        )}
        {urg.statut === 'resolue' && (
          <button style={S.btn('#4A7C59')}>
            ✓ Marquer comme traite
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button onClick={onBack} style={S.back}>←</button>
        <div style={{ flex: 1 }}>
          <div style={S.htitle}>Urgences</div>
          <div style={{ fontSize: 11, color: '#8C7E72', marginTop: 2 }}>Gerees par vos conciergeries</div>
        </div>
        <span style={{ background: '#B83C3C22', color: '#B83C3C', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>1 active</span>
      </div>

      <div style={S.info}>
        🛡️ Vos conciergeries gerent les urgences. Vous etes informe, vous ne gerez pas.
      </div>

      <div style={{ padding: '4px 0' }}>
        <div style={{ padding: '12px 14px 4px', fontSize: 11, color: '#8C7E72', letterSpacing: 2, textTransform: 'uppercase' as const }}>EN COURS</div>

        {urgences.filter(u => u.statut === 'en_cours').map(u => (
          <div key={u.id} onClick={() => setSelected(u.id)} style={S.card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: u.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{u.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{u.type}</span>
                  <span style={S.badge('#B83C3C')}>En cours</span>
                </div>
                <div style={{ fontSize: 12, color: '#8C7E72' }}>{u.bien}</div>
              </div>
              <div style={{ textAlign: 'right' as const }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#C4714A', fontFamily: 'Georgia' }}>{u.eta}</div>
                <div style={{ fontSize: 10, color: '#8C7E72' }}>ETA</div>
              </div>
            </div>
            <div style={{ background: '#3E3028', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>👤</span>
              <span style={{ fontSize: 12, color: 'white' }}>{u.conciergerie} est en route</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8C7E72' }}>{u.heure}</span>
            </div>
          </div>
        ))}

        <div style={{ padding: '12px 14px 4px', fontSize: 11, color: '#8C7E72', letterSpacing: 2, textTransform: 'uppercase' as const }}>RESOLUES</div>

        {urgences.filter(u => u.statut === 'resolue').map(u => (
          <div key={u.id} onClick={() => setSelected(u.id)} style={{ ...S.card, opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: '#3E3028', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{u.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{u.type}</span>
                  <span style={S.badge('#4A7C59')}>Resolue</span>
                </div>
                <div style={{ fontSize: 12, color: '#8C7E72' }}>{u.bien} · {u.heure}</div>
              </div>
              <span style={{ fontSize: 18, color: '#4A7C59' }}>✓</span>
            </div>
          </div>
        ))}

        {urgences.length === 0 && (
          <div style={{ textAlign: 'center' as const, padding: '48px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 6 }}>Aucune urgence</div>
            <div style={{ fontSize: 12, color: '#8C7E72' }}>Vos conciergeries gèrent tout</div>
          </div>
        )}
      </div>
    </div>
  )
}
