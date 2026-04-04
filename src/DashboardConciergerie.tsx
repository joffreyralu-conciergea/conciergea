import { useState } from 'react'
import { supabase } from './supabase'
import {
  Key, TrendingUp, Star, CheckCircle, Clock,
  User, MapPin, LogOut, ChevronRight, Camera,
  AlertTriangle, Calendar
} from 'lucide-react'

const font = 'Inter, sans-serif'
const serif = 'Playfair Display, Georgia, serif'

const missions = [
  { id:1, type:'Ménage', bien:'Studio Marais', adresse:'14 Rue de Bretagne, Paris 3e', proprietaire:'Jean-Marc D.', date:"Aujourd'hui 14h", duree:'2h', prix:50, statut:'urgent', color:'#B83C3C' },
  { id:2, type:'Check-in', bien:'Appartement Vieux Pont', adresse:'61 Rue du Pont, Laval', proprietaire:'Joffrey R.', date:'Demain 15h', duree:'1h', prix:35, statut:'confirme', color:'#4A7C59' },
  { id:3, type:'Ménage + Linge', bien:'Villa Nice', adresse:'12 Promenade des Anglais', proprietaire:'Sophie M.', date:'Samedi 10h', duree:'3h', prix:75, statut:'en_attente', color:'#C9A84C' },
]

export default function DashboardConciergerie() {
  const [onglet, setOnglet] = useState<'avenir'|'terminees'>('avenir')
  const [missionActive, setMissionActive] = useState<number|null>(null)

  async function deconnecter() {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const mission = missions.find(m => m.id === missionActive)

  if (missionActive !== null && mission) return (
    <div style={{ minHeight:'100vh', background:'#1A1410' }}>
      <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
        <button onClick={() => setMissionActive(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#8C7E72', display:'flex', alignItems:'center' }}>
          <ChevronRight size={20} style={{ transform:'rotate(180deg)' }} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:17, color:'white', fontWeight:700 }}>{mission.type}</div>
          <div style={{ fontSize:11, color:'#8C7E72', marginTop:2, fontFamily:font }}>{mission.bien}</div>
        </div>
        <span style={{
          background: mission.statut === 'urgent' ? '#B83C3C22' : mission.statut === 'confirme' ? '#4A7C5922' : '#C9A84C22',
          color: mission.statut === 'urgent' ? '#B83C3C' : mission.statut === 'confirme' ? '#4A7C59' : '#C9A84C',
          fontSize:10, fontWeight:600, padding:'3px 10px', borderRadius:20, fontFamily:font
        }}>
          {mission.statut === 'urgent' ? 'Urgent' : mission.statut === 'confirme' ? 'Confirmé' : 'En attente'}
        </span>
      </div>

      <div style={{ padding:16 }}>
        <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
          <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:600 }}>
            Détails de la mission
          </div>
          {[
            { l:'Bien', v:mission.bien },
            { l:'Adresse', v:mission.adresse },
            { l:'Propriétaire', v:mission.proprietaire },
            { l:'Date', v:mission.date },
            { l:'Durée estimée', v:mission.duree },
            { l:'Rémunération', v:mission.prix + ' €' },
          ].map((row,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', paddingBottom:10, marginBottom:10, borderBottom: i < 5 ? '1px solid #3E3028' : 'none' }}>
              <span style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>{row.l}</span>
              <span style={{ fontSize:12, fontWeight:600, color:'white', fontFamily:font }}>{row.v}</span>
            </div>
          ))}
        </div>

        <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
          <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 }}>
            Checklist
          </div>
          {["Entrée + salon", "Chambre(s)", "Salle de bain", "Cuisine", "Linge propre installé", "Photos envoyées"].map((item,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, paddingBottom:10, marginBottom:10, borderBottom: i < 5 ? '1px solid #3E3028' : 'none' }}>
              <div style={{ width:22, height:22, borderRadius:6, border:'2px solid #4A7C59', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <CheckCircle size={13} color="#4A7C59" />
              </div>
              <span style={{ fontSize:13, color:'white', fontFamily:font }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <button style={{ background:'#3A5C7A', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Camera size={15} /> Photos
          </button>
          <button style={{ background:'#4A7C59', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <CheckCircle size={15} /> Clôturer
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#1A1410', padding:18 }}>

      <div style={{ background:'#2C2218', borderRadius:16, padding:'14px 18px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, background:'#4A7C59', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Key size={18} color="white" />
          </div>
          <div>
            <div style={{ fontFamily:serif, fontSize:17, color:'white', fontWeight:700 }}>Conciergea</div>
            <div style={{ fontSize:11, color:'#4A7C59', marginTop:1, fontFamily:font, fontWeight:600 }}>● Disponible</div>
          </div>
        </div>
        <button onClick={deconnecter} style={{ background:'none', border:'1px solid #3E3028', color:'#8C7E72', borderRadius:50, padding:'7px 14px', fontSize:12, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
          <LogOut size={13} /> Déconnexion
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 }}>
        {[
          { icon:<Calendar size={16} color="#4A7C59" />, v:'3', l:'Missions ce mois', c:'#4A7C59' },
          { icon:<TrendingUp size={16} color="#C4714A" />, v:'160 €', l:'Revenus ce mois', c:'#C4714A' },
          { icon:<Star size={16} color="#C9A84C" fill="#C9A84C" />, v:'4.97', l:'Ma note', c:'#C9A84C' },
          { icon:<CheckCircle size={16} color="#3A5C7A" />, v:'47', l:'Missions totales', c:'#3A5C7A' },
        ].map((k,i) => (
          <div key={i} style={{ background:'#2C2218', borderRadius:14, padding:'14px' }}>
            <div style={{ marginBottom:8 }}>{k.icon}</div>
            <div style={{ fontFamily:serif, fontSize:24, color:k.c, fontWeight:700 }}>{k.v}</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:4, fontFamily:font }}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'#B83C3C18', borderRadius:14, padding:'12px 16px', marginBottom:14, border:'1px solid #B83C3C33', display:'flex', alignItems:'center', gap:10 }}>
        <AlertTriangle size={16} color="#B83C3C" />
        <div>
          <div style={{ fontSize:12, fontWeight:600, color:'#B83C3C', fontFamily:font }}>1 mission urgente</div>
          <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font, marginTop:2 }}>Studio Marais — Ménage aujourd'hui 14h</div>
        </div>
      </div>

      <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:14 }}>
        <div style={{ display:'flex', borderBottom:'1px solid #3E3028', marginBottom:14 }}>
          {[
            { id:'avenir', label:'À venir' },
            { id:'terminees', label:'Terminées' },
          ].map(t => (
            <button key={t.id} onClick={() => setOnglet(t.id as any)} style={{
              flex:1, padding:'10px', border:'none', background:'none',
              fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font,
              borderBottom: onglet === t.id ? '2px solid #4A7C59' : '2px solid transparent',
              color: onglet === t.id ? '#4A7C59' : '#8C7E72',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {onglet === 'avenir' && missions.map(m => (
          <div key={m.id} onClick={() => setMissionActive(m.id)} style={{ background:'#3E3028', borderRadius:14, padding:'12px 14px', marginBottom:10, borderLeft:`4px solid ${m.color}`, cursor:'pointer' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font, marginBottom:4 }}>{m.type}</div>
                <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{m.bien}</div>
              </div>
              <div style={{ textAlign:'right' as const }}>
                <div style={{ fontFamily:serif, fontSize:18, color:'#4A7C59', fontWeight:700 }}>{m.prix} €</div>
                <span style={{
                  background: m.statut === 'urgent' ? '#B83C3C22' : m.statut === 'confirme' ? '#4A7C5922' : '#C9A84C22',
                  color: m.statut === 'urgent' ? '#B83C3C' : m.statut === 'confirme' ? '#4A7C59' : '#C9A84C',
                  fontSize:9, fontWeight:600, padding:'2px 8px', borderRadius:20, fontFamily:font
                }}>
                  {m.statut === 'urgent' ? 'Urgent' : m.statut === 'confirme' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
            </div>
            <div style={{ fontSize:11, color:'#8C7E72', fontFamily:font, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Calendar size={11} color="#8C7E72" /> {m.date}
              </span>
              <span>·</span>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}>
                <Clock size={11} color="#8C7E72" /> {m.duree}
              </span>
            </div>
          </div>
        ))}

        {onglet === 'terminees' && (
          <div style={{ textAlign:'center' as const, padding:'28px 20px' }}>
            <div style={{ width:48, height:48, background:'#3E3028', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
              <CheckCircle size={22} color="#4A7C59" />
            </div>
            <div style={{ fontSize:14, fontWeight:600, color:'white', marginBottom:4, fontFamily:font }}>2 missions terminées</div>
            <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>Ce mois · 160 € encaissés</div>
          </div>
        )}
      </div>

      <div style={{ background:'#2C2218', borderRadius:16, padding:16 }}>
        <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 }}>Mon profil</div>
        {[
          { icon:<User size={16} color="#C4714A" />, t:'Sofia Hernandez', s:'Conciergerie indépendante' },
          { icon:<MapPin size={16} color="#3A5C7A" />, t:'Paris 3e–11e', s:"Zone d'intervention" },
          { icon:<Star size={16} color="#C9A84C" fill="#C9A84C" />, t:'4.97 / 5', s:'47 missions réalisées' },
          { icon:<CheckCircle size={16} color="#4A7C59" />, t:'Profil vérifié', s:'SIRET validé' },
        ].map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, paddingBottom: i<3?12:0, marginBottom: i<3?12:0, borderBottom: i<3?'1px solid #3E3028':'none' }}>
            <div style={{ width:38, height:38, borderRadius:12, background:'#3E3028', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font }}>{item.t}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:3, fontFamily:font }}>{item.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
