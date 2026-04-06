import { useState } from 'react'
import { supabase } from './supabase'
import {
  Key, TrendingUp, Star, CheckCircle, Clock,
  User, MapPin, LogOut, ChevronRight, Camera,
  AlertTriangle, Calendar
} from 'lucide-react'

const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

const missions = [
  { id:1, type:'Ménage', bien:'Studio Marais', adresse:'14 Rue de Bretagne, Paris 3e', proprietaire:'Jean-Marc D.', date:"Aujourd'hui 14h", duree:'2h', prix:50, statut:'urgent', color:'#C46060' },
  { id:2, type:'Check-in', bien:'Appartement Vieux Pont', adresse:'61 Rue du Pont, Laval', proprietaire:'Joffrey R.', date:'Demain 15h', duree:'1h', prix:35, statut:'confirme', color:'#7A9E7E' },
  { id:3, type:'Ménage + Linge', bien:'Villa Nice', adresse:'12 Promenade des Anglais', proprietaire:'Sophie M.', date:'Samedi 10h', duree:'3h', prix:75, statut:'en_attente', color:or },
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
    <div style={{ minHeight:'100vh', background:'#0A0A0B' }}>
      <div style={{ background:'#16161A', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${border}` }}>
        <button onClick={() => setMissionActive(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B6570', display:'flex', alignItems:'center' }}>
          <ChevronRight size={20} style={{ transform:'rotate(180deg)' }} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:20, color:'#F5F0E8', fontWeight:300 }}>{mission.type}</div>
          <div style={{ fontSize:10, color:'#6B6570', marginTop:2, fontFamily:font, letterSpacing:1 }}>{mission.bien}</div>
        </div>
        <span style={{
          background: mission.statut === 'urgent' ? 'rgba(196,96,96,0.1)' : mission.statut === 'confirme' ? 'rgba(122,158,126,0.1)' : 'rgba(201,169,110,0.1)',
          color: mission.statut === 'urgent' ? '#C46060' : mission.statut === 'confirme' ? '#7A9E7E' : or,
          fontSize:10, fontWeight:500, padding:'3px 10px', borderRadius:20, fontFamily:font
        }}>
          {mission.statut === 'urgent' ? 'Urgent' : mission.statut === 'confirme' ? 'Confirmé' : 'En attente'}
        </span>
      </div>

      <div style={{ padding:16 }}>
        <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
          <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:500 }}>Détails de la mission</div>
          {[
            { l:'Bien', v:mission.bien },
            { l:'Adresse', v:mission.adresse },
            { l:'Propriétaire', v:mission.proprietaire },
            { l:'Date', v:mission.date },
            { l:'Durée estimée', v:mission.duree },
            { l:'Rémunération', v:mission.prix + ' €' },
          ].map((row,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', paddingBottom:10, marginBottom:10, borderBottom: i < 5 ? `1px solid ${border}` : 'none' }}>
              <span style={{ fontSize:12, color:'#6B6570', fontFamily:font }}>{row.l}</span>
              <span style={{ fontSize:12, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{row.v}</span>
            </div>
          ))}
        </div>

        <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
          <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:500 }}>Checklist</div>
          {["Entrée + salon","Chambre(s)","Salle de bain","Cuisine","Linge propre installé","Photos envoyées"].map((item,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, paddingBottom:10, marginBottom:10, borderBottom: i < 5 ? `1px solid ${border}` : 'none' }}>
              <div style={{ width:22, height:22, borderRadius:6, border:'1px solid #7A9E7E', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <CheckCircle size={12} color="#7A9E7E" />
              </div>
              <span style={{ fontSize:13, color:'#F5F0E8', fontFamily:font }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <button style={{ background:'#16161A', color:'#F5F0E8', border:`1px solid ${border}`, borderRadius:50, padding:'13px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Camera size={14} /> Photos
          </button>
          <button style={{ background:'#7A9E7E', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <CheckCircle size={14} /> Clôturer
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0B', padding:18 }}>
      <div style={{ background:'#16161A', borderRadius:16, padding:'14px 18px', marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center', border:`1px solid ${border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, background:or, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Key size={18} color="#0A0A0B" />
          </div>
          <div>
            <div style={{ fontFamily:serif, fontSize:20, color:'#F5F0E8', fontWeight:300, letterSpacing:1 }}>Keia</div>
            <div style={{ fontSize:10, color:'#7A9E7E', marginTop:1, fontFamily:font, fontWeight:500, letterSpacing:1 }}>● Disponible</div>
          </div>
        </div>
        <button onClick={deconnecter} style={{ background:'none', border:`1px solid ${border}`, color:'#6B6570', borderRadius:50, padding:'7px 14px', fontSize:12, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
          <LogOut size={13} /> Déconnexion
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:14 }}>
        {[
          { icon:<Calendar size={14} color="#7A9E7E" />, v:'3', l:'Missions ce mois', c:'#7A9E7E' },
          { icon:<TrendingUp size={14} color={or} />, v:'160 €', l:'Revenus ce mois', c:or },
          { icon:<Star size={14} color={or} fill={or} />, v:'4.97', l:'Ma note', c:or },
          { icon:<CheckCircle size={14} color="#F5F0E8" />, v:'47', l:'Missions totales', c:'#F5F0E8' },
        ].map((k,i) => (
          <div key={i} style={{ background:'#16161A', borderRadius:14, padding:'14px', border:`1px solid ${border}` }}>
            <div style={{ marginBottom:8 }}>{k.icon}</div>
            <div style={{ fontFamily:serif, fontSize:28, color:k.c, fontWeight:300 }}>{k.v}</div>
            <div style={{ fontSize:10, color:'#6B6570', marginTop:4, fontFamily:font, letterSpacing:1, textTransform:'uppercase' as const }}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'rgba(196,96,96,0.06)', borderRadius:14, padding:'12px 16px', marginBottom:14, border:'1px solid rgba(196,96,96,0.2)', display:'flex', alignItems:'center', gap:10 }}>
        <AlertTriangle size={14} color="#C46060" />
        <div>
          <div style={{ fontSize:12, fontWeight:500, color:'#C46060', fontFamily:font }}>1 mission urgente</div>
          <div style={{ fontSize:11, color:'#6B6570', fontFamily:font, marginTop:2 }}>Studio Marais — Ménage aujourd'hui 14h</div>
        </div>
      </div>

      <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:14, border:`1px solid ${border}` }}>
        <div style={{ display:'flex', borderBottom:`1px solid ${border}`, marginBottom:14 }}>
          {[
            { id:'avenir', label:'À venir' },
            { id:'terminees', label:'Terminées' },
          ].map(t => (
            <button key={t.id} onClick={() => setOnglet(t.id as any)} style={{
              flex:1, padding:'10px', border:'none', background:'none',
              fontSize:12, fontWeight:500, cursor:'pointer', fontFamily:font,
              borderBottom: onglet === t.id ? `2px solid ${or}` : '2px solid transparent',
              color: onglet === t.id ? or : '#6B6570',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {onglet === 'avenir' && missions.map(m => (
          <div key={m.id} onClick={() => setMissionActive(m.id)} style={{ background:'#0A0A0B', borderRadius:14, padding:'12px 14px', marginBottom:10, borderLeft:`3px solid ${m.color}`, cursor:'pointer', border:`1px solid ${border}`, borderLeftColor:m.color, borderLeftWidth:3 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font, marginBottom:4 }}>{m.type}</div>
                <div style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{m.bien}</div>
              </div>
              <div style={{ textAlign:'right' as const }}>
                <div style={{ fontFamily:serif, fontSize:20, color:'#7A9E7E', fontWeight:300 }}>{m.prix} €</div>
                <span style={{
                  background: m.statut === 'urgent' ? 'rgba(196,96,96,0.1)' : m.statut === 'confirme' ? 'rgba(122,158,126,0.1)' : 'rgba(201,169,110,0.1)',
                  color: m.statut === 'urgent' ? '#C46060' : m.statut === 'confirme' ? '#7A9E7E' : or,
                  fontSize:9, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font
                }}>
                  {m.statut === 'urgent' ? 'Urgent' : m.statut === 'confirme' ? 'Confirmé' : 'En attente'}
                </span>
              </div>
            </div>
            <div style={{ fontSize:11, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Calendar size={10} color="#6B6570" /> {m.date}</span>
              <span>·</span>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={10} color="#6B6570" /> {m.duree}</span>
            </div>
          </div>
        ))}

        {onglet === 'terminees' && (
          <div style={{ textAlign:'center' as const, padding:'28px 20px' }}>
            <div style={{ width:48, height:48, background:'#0A0A0B', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', border:`1px solid ${border}` }}>
              <CheckCircle size={20} color="#7A9E7E" />
            </div>
            <div style={{ fontSize:14, fontWeight:500, color:'#F5F0E8', marginBottom:4, fontFamily:font }}>2 missions terminées</div>
            <div style={{ fontSize:12, color:'#6B6570', fontFamily:font }}>Ce mois · 160 € encaissés</div>
          </div>
        )}
      </div>

      <div style={{ background:'#16161A', borderRadius:16, padding:16, border:`1px solid ${border}` }}>
        <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:500 }}>Mon profil</div>
        {[
          { icon:<User size={14} color={or} />, t:'Sofia Hernandez', s:'Conciergerie indépendante' },
          { icon:<MapPin size={14} color="#6B9EC4" />, t:'Paris 3e–11e', s:"Zone d'intervention" },
          { icon:<Star size={14} color={or} fill={or} />, t:'4.97 / 5', s:'47 missions réalisées' },
          { icon:<CheckCircle size={14} color="#7A9E7E" />, t:'Profil vérifié', s:'SIRET validé' },
        ].map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, paddingBottom: i<3?12:0, marginBottom: i<3?12:0, borderBottom: i<3?`1px solid ${border}`:'none' }}>
            <div style={{ width:36, height:36, borderRadius:12, background:'rgba(201,169,110,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{item.t}</div>
              <div style={{ fontSize:11, color:'#6B6570', marginTop:3, fontFamily:font }}>{item.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
