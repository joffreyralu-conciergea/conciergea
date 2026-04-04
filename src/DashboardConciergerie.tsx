import { useState } from 'react'
import { supabase } from './supabase'

type Page = 'dashboard' | 'missions' | 'profil'

const missions = [
  { id:1, type:'Menage', bien:'Studio Marais', adresse:'14 Rue de Bretagne, Paris 3e', proprietaire:'Jean-Marc D.', date:'Aujourd hui 14h', duree:'2h', prix:50, statut:'urgent', color:'#B83C3C' },
  { id:2, type:'Check-in', bien:'Appartement Vieux Pont', adresse:'61 Rue du Pont, Laval', proprietaire:'Joffrey R.', date:'Demain 15h', duree:'1h', prix:35, statut:'confirme', color:'#4A7C59' },
  { id:3, type:'Menage + Linge', bien:'Villa Nice', adresse:'12 Promenade des Anglais', proprietaire:'Sophie M.', date:'Samedi 10h', duree:'3h', prix:75, statut:'en_attente', color:'#C9A84C' },
]

export default function DashboardConciergerie() {
  const [page, setPage] = useState<Page>('dashboard')
  const [missionActive, setMissionActive] = useState<number|null>(null)

  async function deconnecter() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const S = {
    page: { minHeight:'100vh', background:'#1A1410', padding:18 } as const,
    header: { background:'#2C2218', borderRadius:16, padding:'14px 18px', marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' } as const,
    kpis: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:16 } as const,
    kpi: { background:'#2C2218', borderRadius:14, padding:'14px', textAlign:'center' as const },
    kpiV: { fontFamily:'Georgia', fontSize:24, color:'#4A7C59', margin:0 } as const,
    kpiL: { fontSize:10, color:'#8C7E72', marginTop:4 } as const,
    section: { background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 } as const,
    secTitle: { fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12 } as const,
    card: (c:string) => ({ background:'#3E3028', borderRadius:14, padding:'12px 14px', marginBottom:10, borderLeft:`4px solid ${c}`, cursor:'pointer' }),
    badge: (c:string) => ({ background:c+'22', color:c, fontSize:9, fontWeight:700 as const, padding:'2px 8px', borderRadius:20 }),
    btn: (c:string) => ({ background:c, color:'white', border:'none', borderRadius:50, padding:'12px 20px', fontSize:13, fontWeight:700 as const, cursor:'pointer' }),
    tab: (on:boolean) => ({ flex:1, padding:'10px', border:'none', background:'none', fontSize:11, fontWeight:700 as const, cursor:'pointer', borderBottom: on ? '2px solid #4A7C59' : '2px solid transparent', color: on ? '#4A7C59' : '#8C7E72' }),
  }

  // Vue détail mission
  if (missionActive !== null) {
    const m = missions.find(x => x.id === missionActive)!
    return (
      <div style={{ minHeight:'100vh', background:'#1A1410' }}>
        <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
          <button onClick={() => setMissionActive(null)} style={{ background:'none', border:'none', color:'#8C7E72', cursor:'pointer', fontSize:20 }}>←</button>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'Georgia', fontSize:16, color:'white' }}>{m.type}</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:2 }}>{m.bien}</div>
          </div>
          <span style={S.badge(m.color)}>{m.statut === 'urgent' ? 'URGENT' : m.statut === 'confirme' ? 'Confirme' : 'En attente'}</span>
        </div>

        <div style={{ padding:16 }}>
          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:10 }}>DETAILS DE LA MISSION</div>
            {[
              { l:'Bien', v:m.bien },
              { l:'Adresse', v:m.adresse },
              { l:'Proprietaire', v:m.proprietaire },
              { l:'Date', v:m.date },
              { l:'Duree estimee', v:m.duree },
              { l:'Remuneration', v:m.prix + '€' },
            ].map((row,i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', paddingBottom:8, marginBottom:8, borderBottom:'1px solid #3E3028' }}>
                <span style={{ fontSize:12, color:'#8C7E72' }}>{row.l}</span>
                <span style={{ fontSize:12, fontWeight:700, color:'white' }}>{row.v}</span>
              </div>
            ))}
          </div>

          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:10 }}>CHECKLIST</div>
            {['Entree + salon', 'Chambre(s)', 'Salle de bain', 'Cuisine', 'Linge propre installe', 'Photos envoyees'].map((item,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, paddingBottom:8, marginBottom:8, borderBottom:'1px solid #3E3028' }}>
                <div style={{ width:20, height:20, borderRadius:6, border:'2px solid #4A7C59', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:11, color:'#4A7C59' }}>✓</span>
                </div>
                <span style={{ fontSize:12, color:'white' }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            <button style={S.btn('#3A5C7A')}>📷 Ajouter photos</button>
            <button style={S.btn('#4A7C59')}>✓ Cloturer</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={{ fontFamily:'Georgia', fontSize:18, color:'white', margin:0 }}>🤝 Conciergea</h1>
          <div style={{ fontSize:11, color:'#4A7C59', marginTop:2 }}>● Disponible</div>
        </div>
        <button onClick={deconnecter} style={{ background:'none', border:'1px solid #3E3028', color:'#8C7E72', borderRadius:50, padding:'7px 14px', fontSize:11, cursor:'pointer' }}>
          Deconnexion
        </button>
      </div>

      <div style={S.kpis}>
        {[
          { v:'3', l:'Missions ce mois', c:'#4A7C59' },
          { v:'160€', l:'Revenus ce mois', c:'#4A7C59' },
          { v:'4.97', l:'Ma note', c:'#C9A84C' },
          { v:'47', l:'Missions totales', c:'#3A5C7A' },
        ].map((k,i) => (
          <div key={i} style={S.kpi}>
            <p style={{ ...S.kpiV, color:k.c }}>{k.v}</p>
            <p style={S.kpiL}>{k.l}</p>
          </div>
        ))}
      </div>

      <div style={{ background:'#4A7C5922', borderRadius:14, padding:'12px 16px', marginBottom:14, border:'1px solid #4A7C5944' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#4A7C59', marginBottom:2 }}>1 mission urgente</div>
        <div style={{ fontSize:11, color:'#8C7E72' }}>Studio Marais — Menage aujourd hui 14h</div>
      </div>

      <div style={S.section}>
        <div style={{ display:'flex', borderBottom:'1px solid #3E3028', marginBottom:14 }}>
          {[
            { id:'dashboard', l:'A venir' },
            { id:'missions', l:'Terminees' },
          ].map(t => (
            <button key={t.id} onClick={() => setPage(t.id as Page)} style={S.tab(page===t.id)}>{t.l}</button>
          ))}
        </div>

        {page === 'dashboard' && missions.map(m => (
          <div key={m.id} onClick={() => setMissionActive(m.id)} style={S.card(m.color)}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'white', marginBottom:3 }}>{m.type}</div>
                <div style={{ fontSize:11, color:'#8C7E72' }}>{m.bien}</div>
              </div>
              <div style={{ textAlign:'right' as const }}>
                <div style={{ fontFamily:'Georgia', fontSize:16, color:'#4A7C59', fontWeight:700 }}>{m.prix}€</div>
                <span style={S.badge(m.color)}>{m.statut === 'urgent' ? 'URGENT' : m.statut === 'confirme' ? 'Confirme' : 'En attente'}</span>
              </div>
            </div>
            <div style={{ fontSize:11, color:'#8C7E72' }}>📅 {m.date} · ⏱ {m.duree}</div>
          </div>
        ))}

        {page === 'missions' && (
          <div style={{ textAlign:'center' as const, padding:'24px 0' }}>
            <div style={{ fontSize:32, marginBottom:8 }}>✅</div>
            <div style={{ fontSize:13, fontWeight:700, color:'white', marginBottom:4 }}>2 missions terminees</div>
            <div style={{ fontSize:11, color:'#8C7E72' }}>Ce mois · 160€ encaisses</div>
          </div>
        )}
      </div>

      <div style={S.section}>
        <div style={S.secTitle}>MON PROFIL</div>
        {[
          { e:'👤', t:'Sofia Hernandez', s:'Conciergerie independante' },
          { e:'📍', t:'Paris 3e-11e', s:'Zone d intervention' },
          { e:'⭐', t:'4.97 / 5', s:'47 missions realisees' },
          { e:'✓', t:'Profil verifie', s:'SIRET valide' },
        ].map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:10, paddingBottom:10, marginBottom:10, borderBottom: i<3 ? '1px solid #3E3028' : 'none' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'#3E3028', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{item.e}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:'white' }}>{item.t}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:2 }}>{item.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
