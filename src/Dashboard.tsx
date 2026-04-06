import { useState } from 'react'
import { supabase } from './supabase'
import Messagerie from './Messagerie'
import Conciergeries from './Conciergeries'
import Urgences from './Urgences'
import {
  Key, TrendingUp, Home, Star, MessageSquare, Handshake,
  Calendar, AlertTriangle, Plus, X, LogOut, ChevronRight,
  Building2, MapPin, Download
} from 'lucide-react'

const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

const bienExemple = {
  nom: 'Appartement Bastille',
  adresse: '12 Rue de la Roquette, Paris 11e',
  conciergerie: 'Sofia Hernandez',
  revenus: 1840,
  nuits: 18,
  tauxOccupation: 60,
  note: 4.9,
  reservations: [
    { voyageur: 'Marie L.', debut: '01/04', fin: '05/04', nuits: 4, montant: 420 },
    { voyageur: 'James K.', debut: '07/04', fin: '12/04', nuits: 5, montant: 510 },
    { voyageur: 'Camille D.', debut: '15/04', fin: '22/04', nuits: 7, montant: 680 },
    { voyageur: 'Lucas M.', debut: '25/04', fin: '27/04', nuits: 2, montant: 230 },
  ],
  chargesConciergerie: 184,
  netProprietaire: 1656,
}

function exportExcel() {
  const mois = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
  const b = bienExemple
  const rows = [
    ['RAPPORT FINANCIER KEIA — ' + b.nom.toUpperCase()],
    ['Période : ' + mois],
    ['Adresse : ' + b.adresse],
    ['Conciergerie : ' + b.conciergerie],
    [''],
    ['SYNTHÈSE DU MOIS'],
    ['Revenus bruts', b.revenus + ' €'],
    ['Charges conciergerie (10%)', b.chargesConciergerie + ' €'],
    ['Net propriétaire', b.netProprietaire + ' €'],
    ['Nuits louées', b.nuits + ' nuits'],
    ["Taux d'occupation", b.tauxOccupation + ' %'],
    ['Note moyenne voyageurs', b.note + ' / 5'],
    [''],
    ['DÉTAIL DES RÉSERVATIONS'],
    ['Voyageur', 'Arrivée', 'Départ', 'Nuits', 'Montant'],
    ...b.reservations.map(r => [r.voyageur, r.debut, r.fin, r.nuits, r.montant + ' €']),
    [''],
    ['TOTAL', '', '', b.nuits + ' nuits', b.revenus + ' €'],
  ]
  const csv = rows.map(r => Array.isArray(r) ? r.join(';') : r).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Keia_${b.nom.replace(/ /g, '_')}_${mois.replace(/ /g, '_')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Dashboard() {
  const [bienNom, setBienNom] = useState('')
  const [bienAdresse, setBienAdresse] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [biens, setBiens] = useState<{nom:string,adresse:string}[]>([])
  const [message, setMessage] = useState('')
  const [page, setPage] = useState<'dashboard'|'messagerie'|'conciergeries'|'urgences'>('dashboard')
  const [showBienDetail, setShowBienDetail] = useState(false)

  if (page === 'messagerie') return <Messagerie onBack={() => setPage('dashboard')} />
  if (page === 'conciergeries') return <Conciergeries onBack={() => setPage('dashboard')} />
  if (page === 'urgences') return <Urgences onBack={() => setPage('dashboard')} />

  async function ajouterBien() {
    if (!bienNom || !bienAdresse) return setMessage('Remplissez tous les champs')
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('biens').insert({ nom: bienNom, adresse: bienAdresse, proprietaire_id: user?.id })
    if (error) return setMessage(error.message)
    setBiens([...biens, { nom: bienNom, adresse: bienAdresse }])
    setBienNom(''); setBienAdresse(''); setShowForm(false); setMessage('')
  }

  const S = {
    page: { minHeight:'100vh', background:'#0A0A0B', padding:18 } as const,
    header: { background:'#16161A', borderRadius:16, padding:'14px 18px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center', border:`1px solid ${border}` } as const,
    kpis: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 } as const,
    kpi: { background:'#16161A', borderRadius:14, padding:'16px 14px', border:`1px solid ${border}` } as const,
    section: { background:'#16161A', borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${border}` } as const,
    secTitle: { fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:500 } as const,
    inp: { width:'100%', background:'#0A0A0B', border:`1px solid ${border}`, borderRadius:12, padding:'13px 14px', color:'#F5F0E8', fontSize:14, marginBottom:10, boxSizing:'border-box' as const, outline:'none', fontFamily:font },
  }

  if (showBienDetail) {
    const b = bienExemple
    return (
      <div style={{ minHeight:'100vh', background:'#0A0A0B', padding:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
          <button onClick={() => setShowBienDetail(false)} style={{ background:'#16161A', border:`1px solid ${border}`, color:'#6B6570', borderRadius:12, padding:'8px 14px', cursor:'pointer', fontFamily:font, fontSize:13 }}>
            ← Retour
          </button>
          <div style={{ fontFamily:serif, fontSize:22, color:'#F5F0E8', fontWeight:300 }}>{b.nom}</div>
        </div>

        <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${border}` }}>
          <div style={S.secTitle}>Informations</div>
          <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            <MapPin size={12} color={or} /> {b.adresse}
          </div>
          <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
            <Star size={12} color={or} /> {b.note}/5 · Conciergerie : {b.conciergerie}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 }}>
          {[
            { v: b.revenus + ' €', l: 'Revenus ce mois', c: or },
            { v: b.tauxOccupation + ' %', l: "Taux d'occupation", c: '#7A9E7E' },
            { v: b.nuits + ' nuits', l: 'Nuits louées', c: '#F5F0E8' },
            { v: b.netProprietaire + ' €', l: 'Net propriétaire', c: '#E8D5A8' },
          ].map((k,i) => (
            <div key={i} style={{ background:'#16161A', borderRadius:14, padding:'16px 14px', border:`1px solid ${border}` }}>
              <div style={{ fontFamily:serif, fontSize:26, color:k.c, fontWeight:600 }}>{k.v}</div>
              <div style={{ fontSize:10, color:'#6B6570', marginTop:4, fontFamily:font, letterSpacing:1, textTransform:'uppercase' as const }}>{k.l}</div>
            </div>
          ))}
        </div>

        <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${border}` }}>
          <div style={S.secTitle}>Réservations du mois</div>
          {b.reservations.map((r, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom: i < b.reservations.length - 1 ? `1px solid ${border}` : 'none' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{r.voyageur}</div>
                <div style={{ fontSize:11, color:'#6B6570', fontFamily:font, marginTop:2 }}>{r.debut} → {r.fin} · {r.nuits} nuits</div>
              </div>
              <div style={{ fontFamily:serif, fontSize:18, color:or, fontWeight:600 }}>{r.montant} €</div>
            </div>
          ))}
        </div>

        <button onClick={exportExcel} style={{ width:'100%', background:'#7A9E7E', color:'white', border:'none', borderRadius:50, padding:'15px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <Download size={17} /> Exporter rapport comptable
        </button>
        <div style={{ fontSize:11, color:'#6B6570', fontFamily:font, textAlign:'center' as const, marginTop:8 }}>
          Fichier .csv compatible Excel · Keia
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, background:or, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Key size={18} color="#0A0A0B" />
          </div>
          <div>
            <div style={{ fontFamily:serif, fontSize:20, color:'#F5F0E8', fontWeight:300, letterSpacing:1 }}>Keia</div>
            <div style={{ fontSize:10, color:'#6B6570', fontFamily:font, letterSpacing:2, textTransform:'uppercase' as const }}>Espace propriétaire</div>
          </div>
        </div>
        <button onClick={async () => { await supabase.auth.signOut(); window.location.reload() }}
          style={{ background:'none', border:`1px solid ${border}`, color:'#6B6570', borderRadius:50, padding:'7px 14px', fontSize:12, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
          <LogOut size={13} /> Déconnexion
        </button>
      </div>

      <div style={S.kpis}>
        {[
          { icon:<TrendingUp size={16} color={or} />, v: bienExemple.revenus + ' €', l:'Revenus ce mois', c:or },
          { icon:<Home size={16} color="#7A9E7E" />, v: bienExemple.tauxOccupation + ' %', l:"Taux d'occupation", c:'#7A9E7E' },
          { icon:<Building2 size={16} color="#F5F0E8" />, v: String(1 + biens.length), l:'Biens actifs', c:'#F5F0E8' },
          { icon:<Star size={16} color="#E8D5A8" />, v: String(bienExemple.note), l:'Note moyenne', c:'#E8D5A8' },
        ].map((k,i) => (
          <div key={i} style={S.kpi}>
            <div style={{ marginBottom:8 }}>{k.icon}</div>
            <div style={{ fontFamily:serif, fontSize:28, color:k.c, fontWeight:600 }}>{k.v}</div>
            <div style={{ fontSize:10, color:'#6B6570', marginTop:4, fontFamily:font, letterSpacing:1, textTransform:'uppercase' as const }}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={S.section}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div style={S.secTitle}>Mes biens</div>
          <button onClick={() => setShowForm(!showForm)} style={{ background: showForm ? 'transparent' : or, color: showForm ? '#6B6570' : '#0A0A0B', border: showForm ? `1px solid ${border}` : 'none', borderRadius:50, padding:'8px 16px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
            {showForm ? <><X size={13} /> Annuler</> : <><Plus size={13} /> Ajouter</>}
          </button>
        </div>

        {showForm && (
          <div style={{ background:'#0A0A0B', borderRadius:14, padding:16, marginBottom:14, border:`1px solid ${border}` }}>
            <input value={bienNom} onChange={e => setBienNom(e.target.value)} placeholder="Nom du bien" style={S.inp} />
            <input value={bienAdresse} onChange={e => setBienAdresse(e.target.value)} placeholder="Adresse complète" style={S.inp} />
            <button onClick={ajouterBien} style={{ width:'100%', background:or, color:'#0A0A0B', border:'none', borderRadius:50, padding:'13px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font }}>
              Enregistrer
            </button>
            {message && <p style={{ color:or, fontSize:12, marginTop:8, fontFamily:font }}>{message}</p>}
          </div>
        )}

        <div onClick={() => setShowBienDetail(true)} style={{ background:'#0A0A0B', borderRadius:14, padding:'14px', display:'flex', alignItems:'center', gap:12, marginBottom:8, cursor:'pointer', border:`1px solid ${border}` }}>
          <div style={{ width:42, height:42, background:`rgba(201,169,110,0.08)`, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Building2 size={18} color={or} />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{bienExemple.nom}</div>
            <div style={{ fontSize:11, color:'#6B6570', marginTop:3, fontFamily:font, display:'flex', alignItems:'center', gap:4 }}>
              <MapPin size={11} /> {bienExemple.adresse}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:4 }}>
            <span style={{ background:'rgba(122,158,126,0.1)', color:'#7A9E7E', fontSize:10, fontWeight:500, padding:'3px 10px', borderRadius:20, fontFamily:font }}>Actif</span>
            <ChevronRight size={14} color="#6B6570" />
          </div>
        </div>

        {biens.map((b, i) => (
          <div key={i} style={{ background:'#0A0A0B', borderRadius:14, padding:'14px', display:'flex', alignItems:'center', gap:12, marginBottom:8, border:`1px solid ${border}` }}>
            <div style={{ width:42, height:42, background:'rgba(201,169,110,0.08)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Building2 size={18} color={or} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{b.nom}</div>
              <div style={{ fontSize:11, color:'#6B6570', marginTop:3, fontFamily:font, display:'flex', alignItems:'center', gap:4 }}>
                <MapPin size={11} /> {b.adresse}
              </div>
            </div>
            <span style={{ background:'rgba(122,158,126,0.1)', color:'#7A9E7E', fontSize:10, fontWeight:500, padding:'3px 10px', borderRadius:20, fontFamily:font }}>Actif</span>
          </div>
        ))}
      </div>

      <div style={S.section}>
        <div style={S.secTitle}>Actions rapides</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { icon:<MessageSquare size={18} color={or} />, t:'Messages', s:'2 actions requises', bg:'rgba(201,169,110,0.08)', action: () => setPage('messagerie') },
            { icon:<Handshake size={18} color="#7A9E7E" />, t:'Conciergeries', s:'Trouver un partenaire', bg:'rgba(122,158,126,0.08)', action: () => setPage('conciergeries') },
            { icon:<Calendar size={18} color="#6B6570" />, t:'Réservations', s:'Connecter Airbnb', bg:'rgba(107,101,112,0.08)', action: () => {} },
            { icon:<AlertTriangle size={18} color="#C46060" />, t:'Urgences', s:'Intervention rapide', bg:'rgba(196,96,96,0.08)', action: () => setPage('urgences') },
          ].map((a,i) => (
            <button key={i} onClick={a.action} style={{ background:'#0A0A0B', border:`1px solid ${border}`, borderRadius:16, padding:'14px 12px', cursor:'pointer', textAlign:'left' as const }}>
              <div style={{ width:36, height:36, background:a.bg, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10 }}>
                {a.icon}
              </div>
              <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font, marginBottom:3 }}>{a.t}</div>
              <div style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{a.s}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={S.section}>
        <div style={S.secTitle}>À faire</div>
        {[
          { icon:<Handshake size={14} color={or} />, t:'Trouvez une conciergerie', s:'Assignez une conciergerie à chaque bien', c:or, action: () => setPage('conciergeries') },
          { icon:<Calendar size={14} color="#7A9E7E" />, t:'Connectez vos calendriers', s:'Synchronisez Airbnb et Booking', c:'#7A9E7E', action: () => {} },
        ].map((a,i) => (
          <button key={i} onClick={a.action} style={{ width:'100%', background:'#0A0A0B', border:`1px solid ${border}`, borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:10, marginBottom:8, cursor:'pointer', textAlign:'left' as const }}>
            <div style={{ width:34, height:34, background:`rgba(201,169,110,0.08)`, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {a.icon}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{a.t}</div>
              <div style={{ fontSize:11, color:'#6B6570', marginTop:2, fontFamily:font }}>{a.s}</div>
            </div>
            <ChevronRight size={14} color="#6B6570" />
          </button>
        ))}
      </div>
    </div>
  )
}
