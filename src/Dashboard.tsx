import { useState } from 'react'
import { supabase } from './supabase'
import Messagerie from './Messagerie'
import Conciergeries from './Conciergeries'
import Urgences from './Urgences'
import {
  Key, TrendingUp, Home, Star, MessageSquare, Handshake,
  Calendar, AlertTriangle, Plus, X, LogOut, ChevronRight,
  Building2, MapPin
} from 'lucide-react'

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

  const font = 'Inter, sans-serif'
  const serif = 'Playfair Display, Georgia, serif'

  const S = {
    page: { minHeight:'100vh', background:'#1A1410', padding: 18 } as const,
    header: { background:'#2C2218', borderRadius:16, padding:'14px 18px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' } as const,
    kpis: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 } as const,
    kpi: { background:'#2C2218', borderRadius:14, padding:'16px 14px' } as const,
    section: { background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 } as const,
    secTitle: { fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 } as const,
    inp: { width:'100%', background:'#3E3028', border:'1px solid #4E4038', borderRadius:12, padding:'13px 14px', color:'white', fontSize:14, marginBottom:10, boxSizing:'border-box' as const, outline:'none', fontFamily:font },
  }

  return (
    <div style={S.page}>

      {/* HEADER */}
      <div style={S.header}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, background:'#C4714A', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Key size={18} color="white" />
          </div>
          <div>
            <div style={{ fontFamily:serif, fontSize:17, color:'white', fontWeight:700 }}>Conciergea</div>
            <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>Espace propriétaire</div>
          </div>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); window.location.reload() }}
          style={{ background:'none', border:'1px solid #3E3028', color:'#8C7E72', borderRadius:50, padding:'7px 14px', fontSize:12, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
          <LogOut size={13} /> Déconnexion
        </button>
      </div>

      {/* KPIs */}
      <div style={S.kpis}>
        {[
          { icon:<TrendingUp size={18} color="#C4714A" />, v:'0 €', l:'Revenus ce mois', c:'#C4714A' },
          { icon:<Home size={18} color="#3A5C7A" />, v:'0 %', l:'Taux d\'occupation', c:'#3A5C7A' },
          { icon:<Building2 size={18} color="#4A7C59" />, v:String(biens.length), l:'Biens actifs', c:'#4A7C59' },
          { icon:<Star size={18} color="#C9A84C" />, v:'—', l:'Note moyenne', c:'#C9A84C' },
        ].map((k,i) => (
          <div key={i} style={S.kpi}>
            <div style={{ marginBottom:8 }}>{k.icon}</div>
            <div style={{ fontFamily:serif, fontSize:24, color:k.c, fontWeight:700 }}>{k.v}</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:4, fontFamily:font }}>{k.l}</div>
          </div>
        ))}
      </div>

      {/* MES BIENS */}
      <div style={S.section}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div style={S.secTitle}>Mes biens</div>
          <button onClick={() => setShowForm(!showForm)} style={{ background: showForm ? '#3E3028' : '#C4714A', color:'white', border:'none', borderRadius:50, padding:'8px 16px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
            {showForm ? <><X size={13} /> Annuler</> : <><Plus size={13} /> Ajouter un bien</>}
          </button>
        </div>

        {showForm && (
          <div style={{ background:'#3E3028', borderRadius:14, padding:16, marginBottom:14 }}>
            <input value={bienNom} onChange={e => setBienNom(e.target.value)} placeholder="Nom du bien (ex : Studio Marais)" style={S.inp} />
            <input value={bienAdresse} onChange={e => setBienAdresse(e.target.value)} placeholder="Adresse complète" style={S.inp} />
            <button onClick={ajouterBien} style={{ width:'100%', background:'#C4714A', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font }}>
              Enregistrer le bien
            </button>
            {message && <p style={{ color:'#C4714A', fontSize:12, marginTop:8, fontFamily:font }}>{message}</p>}
          </div>
        )}

        {biens.length === 0 && !showForm && (
          <div style={{ textAlign:'center', padding:'32px 20px' }}>
            <div style={{ width:56, height:56, background:'#3E3028', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
              <Home size={26} color="#8C7E72" />
            </div>
            <div style={{ fontSize:15, fontWeight:600, color:'white', marginBottom:6, fontFamily:font }}>Aucun bien pour le moment</div>
            <div style={{ fontSize:13, color:'#8C7E72', fontFamily:font, lineHeight:1.6 }}>
              Ajoutez votre premier bien pour commencer à gérer vos locations depuis Conciergea.
            </div>
          </div>
        )}

        {biens.map((b, i) => (
          <div key={i} style={{ background:'#3E3028', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
            <div style={{ width:40, height:40, background:'#2C2218', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Building2 size={18} color="#C4714A" />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:'white', fontFamily:font }}>{b.nom}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:3, fontFamily:font, display:'flex', alignItems:'center', gap:4 }}>
                <MapPin size={11} /> {b.adresse}
              </div>
            </div>
            <span style={{ background:'#4A7C5922', color:'#4A7C59', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, fontFamily:font }}>Actif</span>
          </div>
        ))}
      </div>

      {/* ACTIONS RAPIDES */}
      <div style={S.section}>
        <div style={S.secTitle}>Actions rapides</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { icon:<MessageSquare size={20} color="#C4714A" />, t:'Messages', s:'2 actions requises', bg:'#C4714A22', action: () => setPage('messagerie') },
            { icon:<Handshake size={20} color="#3A5C7A" />, t:'Conciergeries', s:'Trouver un partenaire', bg:'#3A5C7A22', action: () => setPage('conciergeries') },
            { icon:<Calendar size={20} color="#4A7C59" />, t:'Réservations', s:'Connecter Airbnb', bg:'#4A7C5922', action: () => {} },
            { icon:<AlertTriangle size={20} color="#B83C3C" />, t:'Urgences', s:'Intervention rapide', bg:'#B83C3C22', action: () => setPage('urgences') },
          ].map((a,i) => (
            <button key={i} onClick={a.action} style={{ background:'#3E3028', border:'none', borderRadius:14, padding:'14px 12px', cursor:'pointer', textAlign:'left' as const }}>
              <div style={{ width:38, height:38, background:a.bg, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                {a.icon}
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font, marginBottom:3 }}>{a.t}</div>
              <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{a.s}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ALERTES */}
      <div style={S.section}>
        <div style={S.secTitle}>À faire</div>
        {[
          { icon:<Handshake size={16} color="#C4714A" />, t:'Trouvez une conciergerie', s:'Assignez une conciergerie à chaque bien', c:'#C4714A', action: () => setPage('conciergeries') },
          { icon:<Calendar size={16} color="#3A5C7A" />, t:'Connectez vos calendriers', s:'Synchronisez Airbnb et Booking', c:'#3A5C7A', action: () => {} },
        ].map((a,i) => (
          <button key={i} onClick={a.action} style={{ width:'100%', background:'#3E3028', border:'none', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:10, marginBottom:8, cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ width:34, height:34, background:a.c+'22', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {a.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font }}>{a.t}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:2, fontFamily:font }}>{a.s}</div>
            </div>
            <ChevronRight size={16} color="#8C7E72" />
          </button>
        ))}
      </div>

    </div>
  )
}
