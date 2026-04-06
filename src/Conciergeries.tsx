import { useState } from 'react'
import {
  ArrowLeft, MapPin, Star, Clock, CheckCircle,
  User, SlidersHorizontal, Zap, X
} from 'lucide-react'

const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

type Conciergerie = {
  id: number; nom: string; zone: string; distance: string
  note: number; missions: number; services: string[]
  prix: number; dispo: boolean; top: boolean; score?: number
}

const data: Conciergerie[] = [
  { id:1, nom:'Sofia Hernandez', zone:'Paris 3e–11e', distance:'0.4 km', note:4.97, missions:47, services:['Check-in','Ménage','Linge','Urgences'], prix:25, dispo:true, top:true, score:94 },
  { id:2, nom:'Carlos Moreno', zone:'Paris 10e–20e', distance:'1.2 km', note:4.91, missions:31, services:['Ménage','Linge'], prix:20, dispo:false, top:false },
  { id:3, nom:'Marie Dupont', zone:'Paris 1e–6e', distance:'2.1 km', note:4.88, missions:22, services:['Check-in','Ménage','Urgences'], prix:28, dispo:true, top:false },
  { id:4, nom:'Lucas Martin', zone:'Paris 15e–20e', distance:'3.4 km', note:4.85, missions:18, services:['Check-in','Ménage','Linge'], prix:22, dispo:true, top:false },
]

export default function Conciergeries({ onBack }: { onBack: () => void }) {
  const [filtre, setFiltre] = useState<'proximite'|'note'|'prix'>('proximite')
  const [selected, setSelected] = useState<number|null>(null)
  const [confirme, setConfirme] = useState<number|null>(null)

  const sorted = [...data].sort((a,b) => {
    if (filtre === 'note') return b.note - a.note
    if (filtre === 'prix') return a.prix - b.prix
    return parseFloat(a.distance) - parseFloat(b.distance)
  })
  const ia = data.find(d => d.score)

  if (confirme !== null) {
    const c = data.find(d => d.id === confirme)!
    return (
      <div style={{ minHeight:'100vh', background:'#0A0A0B', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ textAlign:'center', maxWidth:340 }}>
          <div style={{ width:72, height:72, background:'rgba(122,158,126,0.1)', borderRadius:24, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', border:'1px solid rgba(122,158,126,0.2)' }}>
            <CheckCircle size={36} color="#7A9E7E" />
          </div>
          <h2 style={{ fontFamily:serif, fontSize:32, color:'#F5F0E8', marginBottom:8, fontWeight:300 }}>{c.nom}</h2>
          <p style={{ color:'#6B6570', fontSize:14, marginBottom:24, fontFamily:font, lineHeight:1.6 }}>
            est maintenant assignée à votre bien. Elle recevra les missions automatiquement.
          </p>
          <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:24, border:`1px solid ${border}` }}>
            <div style={{ fontSize:10, color:'#6B6570', marginBottom:4, fontFamily:font, letterSpacing:2, textTransform:'uppercase' as const }}>Commission Keia</div>
            <div style={{ fontFamily:serif, fontSize:36, color:or, fontWeight:300 }}>12 %</div>
            <div style={{ fontSize:11, color:'#6B6570', marginTop:4, fontFamily:font }}>sur chaque mission</div>
          </div>
          <button onClick={onBack} style={{ width:'100%', background:or, color:'#0A0A0B', border:'none', borderRadius:50, padding:'14px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font }}>
            Retour au tableau de bord
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0B' }}>
      <div style={{ background:'#16161A', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${border}` }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B6570', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:22, color:'#F5F0E8', fontWeight:300 }}>Conciergeries</div>
          <div style={{ fontSize:10, color:'#6B6570', marginTop:2, fontFamily:font, letterSpacing:2, textTransform:'uppercase' as const }}>8 disponibles près de vos biens</div>
        </div>
        <span style={{ background:'rgba(122,158,126,0.1)', color:'#7A9E7E', fontSize:10, fontWeight:500, padding:'4px 12px', borderRadius:20, fontFamily:font }}>8 dispo</span>
      </div>

      {ia && (
        <div style={{ background:'#16161A', margin:'14px 14px 0', borderRadius:16, padding:16, border:`1px solid ${border}` }}>
          <div style={{ fontSize:9, color:or, letterSpacing:3, textTransform:'uppercase' as const, marginBottom:10, fontFamily:font, fontWeight:500, display:'flex', alignItems:'center', gap:6 }}>
            <Zap size={11} color={or} /> Recommandation IA
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ textAlign:'center' as const, flexShrink:0 }}>
              <div style={{ fontFamily:serif, fontSize:40, color:or, lineHeight:1, fontWeight:300 }}>{ia.score}%</div>
              <div style={{ fontSize:9, color:'#6B6570', marginTop:2, fontFamily:font, letterSpacing:1 }}>Compatibilité</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:500, color:'#F5F0E8', fontFamily:font, marginBottom:6 }}>{ia.nom}</div>
              <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, lineHeight:1.7 }}>
                3 biens similaires dans le 4e<br/>Note 4.97 · Réactive sous 30 min
              </div>
            </div>
            <button onClick={() => setSelected(ia.id)} style={{ background:or, color:'#0A0A0B', border:'none', borderRadius:50, padding:'9px 18px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font, flexShrink:0 }}>
              Voir
            </button>
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8, padding:'12px 14px', overflowX:'auto' as const, alignItems:'center' }}>
        <SlidersHorizontal size={13} color="#6B6570" />
        {([
          { id:'proximite', label:'Proximité' },
          { id:'note', label:'Note' },
          { id:'prix', label:'Prix' },
        ] as const).map(f => (
          <button key={f.id} onClick={() => setFiltre(f.id)} style={{
            padding:'6px 16px', borderRadius:20, fontSize:11, fontWeight:500,
            border: filtre === f.id ? 'none' : `1px solid ${border}`,
            cursor:'pointer', fontFamily:font,
            background: filtre === f.id ? or : 'transparent',
            color: filtre === f.id ? '#0A0A0B' : '#6B6570',
            whiteSpace:'nowrap' as const,
          }}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ padding:'4px 0 24px' }}>
        {sorted.map(c => (
          <div key={c.id} onClick={() => setSelected(c.id)} style={{
            background:'#16161A', borderRadius:16, padding:16, margin:'0 14px 12px',
            border: selected === c.id ? `1px solid ${or}` : `1px solid ${border}`,
            cursor:'pointer',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
              <div style={{ width:48, height:48, borderRadius:16, background:'rgba(201,169,110,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
                <User size={20} color="#6B6570" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:500, color:'#F5F0E8', fontFamily:font, marginBottom:4 }}>{c.nom}</div>
                <div style={{ fontSize:11, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ display:'flex', alignItems:'center', gap:3 }}><MapPin size={10} /> {c.zone}</span>
                  <span>·</span><span>{c.distance}</span>
                </div>
              </div>
              <div style={{ textAlign:'right' as const }}>
                <div style={{ display:'flex', alignItems:'center', gap:4, justifyContent:'flex-end', marginBottom:4 }}>
                  <Star size={12} color={or} fill={or} />
                  <span style={{ fontSize:14, fontWeight:600, color:'#F5F0E8', fontFamily:serif }}>{c.note}</span>
                </div>
                {c.top && <span style={{ background:`rgba(201,169,110,0.1)`, color:or, fontSize:9, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font }}>Top</span>}
              </div>
            </div>

            <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6, marginBottom:12 }}>
              {c.services.map(sv => (
                <span key={sv} style={{ background:'rgba(201,169,110,0.06)', color:'#6B6570', fontSize:10, padding:'3px 10px', borderRadius:20, fontFamily:font, border:`1px solid ${border}` }}>{sv}</span>
              ))}
            </div>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:12, borderTop:`1px solid ${border}` }}>
              <div>
                <span style={{ fontFamily:serif, fontSize:24, color:'#F5F0E8', fontWeight:300 }}>{c.prix} €</span>
                <span style={{ fontSize:11, color:'#6B6570', fontFamily:font }}> / mission</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:11, fontWeight:500, color: c.dispo ? '#7A9E7E' : '#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:4 }}>
                  {c.dispo ? <><CheckCircle size={12} /> Disponible</> : <><Clock size={12} /> Dispo demain</>}
                </span>
                <button onClick={e => { e.stopPropagation(); setConfirme(c.id) }} style={{
                  background: c.dispo ? or : 'transparent',
                  color: c.dispo ? '#0A0A0B' : '#6B6570',
                  border: c.dispo ? 'none' : `1px solid ${border}`,
                  borderRadius:50, padding:'8px 18px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font,
                }}>
                  Choisir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (() => {
        const c = data.find(d => d.id === selected)!
        return (
          <div style={{ position:'fixed' as const, inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:100 }}
            onClick={() => setSelected(null)}>
            <div style={{ background:'#16161A', borderRadius:'24px 24px 0 0', padding:24, width:'100%', maxWidth:480, border:`1px solid ${border}` }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
                <h3 style={{ fontFamily:serif, fontSize:24, color:'#F5F0E8', margin:0, fontWeight:300 }}>{c.nom}</h3>
                <button onClick={() => setSelected(null)} style={{ background:'#0A0A0B', border:`1px solid ${border}`, color:'#6B6570', cursor:'pointer', borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:18 }}>
                {[
                  { v:`${c.note}`, l:'Note', icon:<Star size={13} color={or} fill={or} /> },
                  { v:`${c.missions}`, l:'Missions', icon:<CheckCircle size={13} color="#7A9E7E" /> },
                  { v:`${c.prix} €`, l:'Par mission', icon:<Zap size={13} color={or} /> },
                ].map((s,i) => (
                  <div key={i} style={{ background:'#0A0A0B', borderRadius:12, padding:'12px', textAlign:'center' as const, border:`1px solid ${border}` }}>
                    <div style={{ display:'flex', justifyContent:'center', marginBottom:6 }}>{s.icon}</div>
                    <div style={{ fontFamily:serif, fontSize:22, color:'#F5F0E8', fontWeight:300 }}>{s.v}</div>
                    <div style={{ fontSize:9, color:'#6B6570', marginTop:4, fontFamily:font, letterSpacing:1, textTransform:'uppercase' as const }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:18 }}>
                <div style={{ fontSize:9, color:'#6B6570', marginBottom:10, fontFamily:font, fontWeight:500, letterSpacing:2, textTransform:'uppercase' as const }}>Services</div>
                <div style={{ display:'flex', flexWrap:'wrap' as const, gap:8 }}>
                  {c.services.map(sv => (
                    <span key={sv} style={{ background:'rgba(201,169,110,0.06)', color:'#F5F0E8', fontSize:12, padding:'6px 14px', borderRadius:20, fontFamily:font, border:`1px solid ${border}` }}>{sv}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => { setSelected(null); setConfirme(c.id) }} style={{ width:'100%', background:or, color:'#0A0A0B', border:'none', borderRadius:50, padding:'14px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:font }}>
                Choisir {c.nom}
              </button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
