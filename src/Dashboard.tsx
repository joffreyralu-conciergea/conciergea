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

const font = 'Inter, sans-serif'
const serif = 'Playfair Display, Georgia, serif'

const bienExemple = {
  nom: 'Appartement Bastille',
  adresse: '12 Rue de la Roquette, Paris 11e',
  statut: 'Actif',
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
    ['RAPPORT FINANCIER — ' + b.nom.toUpperCase()],
    ['Période : ' + mois],
    ['Adresse : ' + b.adresse],
    ['Conciergerie : ' + b.conciergerie],
    [''],
    ['SYNTHÈSE DU MOIS'],
    ['Revenus bruts', b.revenus + ' €'],
    ['Charges conciergerie (10%)', b.chargesConciergerie + ' €'],
    ['Net propriétaire', b.netProprietaire + ' €'],
    ['Nuits louées', b.nuits + ' nuits'],
    ['Taux d\'occupation', b.tauxOccupation + ' %'],
    ['Note moyenne voyageurs', b.note + ' / 5'],
    [''],
    ['DÉTAIL DES RÉSERVATIONS'],
    ['Voyageur', 'Arrivée', 'Départ', 'Nuits', 'Montant'],
    ...b.reservations.map(r => [r.voyageur, r.debut, r.fin, r.nuits, r.montant + ' €']),
    [''],
    ['TOTAL', '', '', b.nuits + ' nuits', b.revenus + ' €'],
  ]

  const csv = rows.map(r => Array.isArray(r) ? r.join(';') : r).join('\n')
  const bom = '\uFEFF'
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Conciergea_${b.nom.replace(/ /g, '_')}_${mois.replace(/ /g, '_')}.csv`
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
    page: { minHeight:'100vh', background:'#1A1410', padding: 18 } as const,
    header: { background:'#2C2218', borderRadius:16, padding:'14px 18px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' } as const,
    kpis: { display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 } as const,
    kpi: { background:'#2C2218', borderRadius:14, padding:'16px 14px' } as const,
    section: { background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 } as const,
    secTitle: { fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 } as const,
    inp: { width:'100%', background:'#3E3028', border:'1px solid #4E4038', borderRadius:12, padding:'13px 14px', color:'white', fontSize:14, marginBottom:10, boxSizing:'border-box' as const, outline:'none', fontFamily:font },
  }

  // VUE DÉTAIL BIEN
  if (showBienDetail) {
    const b = bienExemple
    return (
      <div style={{ minHeight:'100vh', background:'#1A1410', padding:18 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
          <button onClick={() => setShowBienDetail(false)} style={{ background:'#2C2218', border:'none', color:'#8C7E72', borderRadius:12, padding:'8px 14px', cursor:'pointer', fontFamily:font, fontSize:13 }}>
            ← Retour
          </button>
          <div style={{ fontFamily:serif, fontSize:18, color:'white', fontWeight:700 }}>{b.nom}</div>
        </div>

        {/* Infos bien */}
        <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 }}>
          <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:600 }}>Informations</div>
          <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
            <MapPin size={12} color="#C4714A" /> {b.adresse}
          </div>
          <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
            <Star size={12} color="#C9A84C" /> {b.note}/5 · Conciergerie : {b.conciergerie}
          </div>
        </div>

        {/* KPIs mois */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 }}>
          {[
            { v: b.revenus + ' €', l: 'Revenus ce mois', c: '#C4714A' },
            { v: b.tauxOccupation + ' %', l: "Taux d'occupation", c: '#3A5C7A' },
            { v: b.nuits + ' nuits', l: 'Nuits louées', c: '#4A7C59' },
            { v: b.netProprietaire + ' €', l: 'Net propriétaire', c: '#C9A84C' },
          ].map((k,i) => (
            <div key={i} style={{ background:'#2C2218', borderRadius:14, padding:'16px 14px' }}>
              <div style={{ fontFamily:serif, fontSize:22, color:k.c, fontWeight:700 }}>{k.v}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:4, fontFamily:font }}>{k.l}</div>
            </div>
          ))}
        </div>

        {/* Réservations */}
        <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 }}>
          <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 }}>Réservations du mois</div>
          {b.reservations.map((r, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom: i < b.reservations.length - 1 ? '1px solid #3E3028' : 'none' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font }}>{r.voyageur}</div>
                <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font, marginTop:2 }}>{r.debut} → {r.fin} · {r.nuits} nuits</div>
              </div>
              <div style={{ fontFamily:serif, fontSize:16, color:'#C4714A', fontWeight:700 }}>{r.montant} €</div>
            </div>
          ))}
        </div>

        {/* Export Excel */}
        <button onClick={exportExcel} style={{ width:'100%', background:'#4A7C59', color:'white', border:'none', borderRadius:50, padding:'15px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
          <Download size={17} /> Exporter vers Excel (comptable)
        </button>
        <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font, textAlign:'center' as const, marginTop:8 }}>
          Fichier .csv compatible Excel · Revenus, nuits, taux d'occupation
        </div>
      </div>
    )
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
          { icon:<TrendingUp size={18} color="#C4714A" />, v: bienExemple.revenus + ' €', l:'Revenus ce mois', c:'#C4714A' },
          { icon:<Home size={18} color="#3A5C7A" />, v: bienExemple.tauxOccupation + ' %', l:"Taux d'occupation", c:'#3A5C7A' },
          { icon:<Building2 size={18} color="#4A7C59" />, v: String(1 + biens.length), l:'Biens actifs', c:'#4A7C59' },
          { icon:<Star size={18} color="#C9A84C" />, v: String(bienExemple.note), l:'Note moyenne', c:'#C9A84C' },
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

        {/* BIEN EXEMPLE */}
        <div onClick={() => setShowBienDetail(true)} style={{ background:'#3E3028', borderRadius:12, padding:'12px 14px', display:'flex', alignItems:'center', gap:12, marginBottom:8, cursor:'pointer' }}>
          <div style={{ width:40, height:40, background:'#C4714A22', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Building2 size={18} color="#C4714A" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, color:'white', fontFamily:font }}>{bienExemple.nom}</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:3, fontFamily:font, display:'flex', alignItems:'center', gap:4 }}>
              <MapPin size={11} /> {bienExemple.adresse}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:4 }}>
            <span style={{ background:'#4A7C5922', color:'#4A7C59', fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, fontFamily:font }}>Actif</span>
            <ChevronRight size={14} color="#8C7E72" />
          </div>
        </div>

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
