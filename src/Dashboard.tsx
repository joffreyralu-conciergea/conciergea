import { useState } from 'react'
import { supabase } from './supabase'
import Messagerie from './Messagerie'
import Conciergeries from './Conciergeries'
import Urgences from './Urgences'

export default function Dashboard() {
  const [bienNom, setBienNom] = useState('')
  const [bienAdresse, setBienAdresse] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [biens, setBiens] = useState<{nom:string,adresse:string}[]>([])
  const [message, setMessage] = useState('')
  const [page, setPage] = useState<'dashboard'|'messagerie'|'conciergeries'|'urgences'>('dashboard')

  if (page === 'messagerie') return <Messagerie onBack={() => setPage('dashboard')} />
  if (page === 'conciergeries') return <Conciergeries onBack={() => setPage('dashboard')} />
  if (page === 'urgences') return <Urgences onBack={() => setPage('dashboard')} />

  async function ajouterBien() {
    if (!bienNom || !bienAdresse) return setMessage('Remplissez tous les champs')
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('biens').insert({
      nom: bienNom,
      adresse: bienAdresse,
      proprietaire_id: user?.id
    })
    if (error) return setMessage(error.message)
    setBiens([...biens, { nom: bienNom, adresse: bienAdresse }])
    setBienNom('')
    setBienAdresse('')
    setShowForm(false)
    setMessage('')
  }

  const S = {
    page: { minHeight:'100vh', background:'#1A1410', padding: 20 } as const,
    header: { background:'#2C2218', borderRadius:16, padding:'16px 20px', marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'center' } as const,
    title: { fontFamily:'Georgia', fontSize:22, color:'white', margin:0 } as const,
    kpis: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 } as const,
    kpi: { background:'#2C2218', borderRadius:14, padding:'16px', textAlign:'center' as const },
    kpiV: { fontFamily:'Georgia', fontSize:26, color:'#C4714A', margin:0 } as const,
    kpiL: { fontSize:11, color:'#8C7E72', marginTop:4 } as const,
    section: { background:'#2C2218', borderRadius:16, padding:18, marginBottom:16 } as const,
    secTitle: { fontSize:11, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12 } as const,
    bien: { background:'#3E3028', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8 } as const,
    bienNom: { fontSize:14, fontWeight:700, color:'white' } as const,
    bienAdr: { fontSize:11, color:'#8C7E72', marginTop:3 } as const,
    badge: { background:'#4A7C59', color:'white', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20 } as const,
    btn: { background:'#C4714A', color:'white', border:'none', borderRadius:50, padding:'12px 24px', fontSize:13, fontWeight:700, cursor:'pointer' } as const,
    inp: { width:'100%', background:'#3E3028', border:'1px solid #4E4038', borderRadius:12, padding:'12px 14px', color:'white', fontSize:13, marginBottom:10, boxSizing:'border-box' as const, outline:'none' },
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <h1 style={S.title}>🗝️ Conciergea</h1>
        <button onClick={async () => { await supabase.auth.signOut(); window.location.reload() }} style={{ background:'none', border:'1px solid #3E3028', color:'#8C7E72', borderRadius:50, padding:'8px 16px', fontSize:12, cursor:'pointer' }}>
          Deconnexion
        </button>
      </div>

      <div style={S.kpis}>
        {[
          { v:'0€', l:'Revenus ce mois' },
          { v:'0%', l:'Taux occupation' },
          { v: String(biens.length), l:'Biens actifs' },
          { v:'—', l:'Note moyenne' },
        ].map((k,i) => (
          <div key={i} style={S.kpi}>
            <p style={S.kpiV}>{k.v}</p>
            <p style={S.kpiL}>{k.l}</p>
          </div>
        ))}
      </div>

      <div style={S.section}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={S.secTitle}>MES BIENS</div>
          <button onClick={() => setShowForm(!showForm)} style={S.btn}>
            {showForm ? 'Annuler' : '+ Ajouter un bien'}
          </button>
        </div>

        {showForm && (
          <div style={{ background:'#3E3028', borderRadius:14, padding:16, marginBottom:14 }}>
            <input value={bienNom} onChange={e => setBienNom(e.target.value)} placeholder="Nom du bien" style={S.inp} />
            <input value={bienAdresse} onChange={e => setBienAdresse(e.target.value)} placeholder="Adresse complete" style={S.inp} />
            <button onClick={ajouterBien} style={{ ...S.btn, width:'100%', padding:'13px' }}>
              Enregistrer le bien
            </button>
            {message && <p style={{ color:'#C4714A', fontSize:12, marginTop:8 }}>{message}</p>}
          </div>
        )}

        {biens.length === 0 && !showForm && (
          <div style={{ textAlign:'center', padding:'24px 0' }}>
            <p style={{ fontSize:32, marginBottom:8 }}>🏠</p>
            <p style={{ color:'#8C7E72', fontSize:13 }}>Aucun bien pour le moment</p>
          </div>
        )}

        {biens.map((b, i) => (
          <div key={i} style={S.bien}>
            <div>
              <div style={S.bienNom}>{b.nom}</div>
              <div style={S.bienAdr}>{b.adresse}</div>
            </div>
            <span style={S.badge}>Actif</span>
          </div>
        ))}
      </div>

      <div style={S.section}>
        <div style={S.secTitle}>ACTIONS RAPIDES</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <button onClick={() => setPage('messagerie')} style={{ background:'#3E3028', border:'none', borderRadius:14, padding:'16px 12px', cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ fontSize:22, marginBottom:8 }}>💬</div>
            <div style={{ fontSize:13, fontWeight:700, color:'white' }}>Messages</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:3 }}>2 actions requises</div>
          </button>
          <button onClick={() => setPage('conciergeries')} style={{ background:'#3E3028', border:'none', borderRadius:14, padding:'16px 12px', cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ fontSize:22, marginBottom:8 }}>🤝</div>
            <div style={{ fontSize:13, fontWeight:700, color:'white' }}>Conciergeries</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:3 }}>Trouver un partenaire</div>
          </button>
          <button style={{ background:'#3E3028', border:'none', borderRadius:14, padding:'16px 12px', cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ fontSize:22, marginBottom:8 }}>📅</div>
            <div style={{ fontSize:13, fontWeight:700, color:'white' }}>Reservations</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:3 }}>Connecter Airbnb</div>
          </button>
          <button onClick={() => setPage('urgences')} style={{ background:'#3E3028', border:'none', borderRadius:14, padding:'16px 12px', cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ fontSize:22, marginBottom:8 }}>🚨</div>
            <div style={{ fontSize:13, fontWeight:700, color:'#B83C3C' }}>Urgences</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:3 }}>Intervention rapide</div>
          </button>
        </div>
      </div>
    </div>
  )
}
