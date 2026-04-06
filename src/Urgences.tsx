import { useState } from 'react'
import { ArrowLeft, Key, Droplets, User, Shield, CheckCircle, Phone } from 'lucide-react'

const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

type Urgence = {
  id: number; type: string; icon: any; bien: string
  adresse: string; conciergerie: string
  statut: 'en_cours' | 'resolue'
  heure: string; eta: string; color: string; actions: string[]
}

const urgences: Urgence[] = [
  { id:1, type:"Fuite d'eau", icon:Droplets, bien:'Appartement Vieux Pont', adresse:'61 Rue du Pont de Mayenne, Laval', conciergerie:'Sofia Hernandez', statut:'en_cours', heure:'Il y a 12 min', eta:'8 min', color:'#6B9EC4', actions:['Sofia a accepté la mission','Plombier contacté','En route vers le bien'] },
  { id:2, type:'Serrure cassée', icon:Key, bien:'Studio Marais', adresse:'14 Rue de Bretagne, Paris 3e', conciergerie:'Carlos Moreno', statut:'resolue', heure:'Hier 18h', eta:'Résolue', color:'#7A9E7E', actions:['Carlos est intervenu','Serrure remplacée','Voyageur satisfait'] },
]

export default function Urgences({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number|null>(null)
  const urg = urgences.find(u => u.id === selected)

  if (selected !== null && urg) {
    const Icon = urg.icon
    return (
      <div style={{ minHeight:'100vh', background:'#0A0A0B' }}>
        <div style={{ background:'#16161A', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${border}` }}>
          <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B6570', display:'flex', alignItems:'center' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:serif, fontSize:20, color:'#F5F0E8', fontWeight:300 }}>{urg.type}</div>
            <div style={{ fontSize:10, color: urg.statut === 'resolue' ? '#7A9E7E' : or, marginTop:2, fontFamily:font, fontWeight:500, letterSpacing:1 }}>
              {urg.statut === 'resolue' ? '✓ Résolue' : '● En cours'}
            </div>
          </div>
        </div>

        <div style={{ padding:16 }}>
          {[
            {
              title: 'Bien concerné',
              content: (
                <>
                  <div style={{ fontSize:15, fontWeight:500, color:'#F5F0E8', marginBottom:6, fontFamily:font }}>{urg.bien}</div>
                  <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
                    <Icon size={12} color={urg.color} /> {urg.adresse}
                  </div>
                </>
              )
            },
          ].map((block, i) => (
            <div key={i} style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
              <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:500 }}>{block.title}</div>
              {block.content}
            </div>
          ))}

          <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
            <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:500 }}>Conciergerie en charge</div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:46, height:46, borderRadius:14, background:'rgba(201,169,110,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
                <User size={20} color="#6B6570" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{urg.conciergerie}</div>
                <div style={{ fontSize:12, color: urg.statut === 'resolue' ? '#7A9E7E' : or, marginTop:3, fontFamily:font, fontWeight:500 }}>
                  {urg.statut === 'resolue' ? 'Mission terminée' : `Arrivée estimée : ${urg.eta}`}
                </div>
              </div>
              {urg.statut === 'en_cours' && (
                <div style={{ textAlign:'right' as const }}>
                  <div style={{ fontFamily:serif, fontSize:32, color:or, fontWeight:300, lineHeight:1 }}>{urg.eta}</div>
                  <div style={{ fontSize:9, color:'#6B6570', fontFamily:font, marginTop:3, letterSpacing:1 }}>avant arrivée</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
            <div style={{ fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:500 }}>Suivi en temps réel</div>
            {urg.actions.map((action, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom: i < urg.actions.length - 1 ? 14 : 0 }}>
                <div style={{ width:26, height:26, borderRadius:'50%', background:'rgba(122,158,126,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(122,158,126,0.2)' }}>
                  <CheckCircle size={13} color="#7A9E7E" />
                </div>
                <div style={{ fontSize:13, color:'#F5F0E8', paddingTop:3, fontFamily:font }}>{action}</div>
              </div>
            ))}
          </div>

          <div style={{ background:'#16161A', borderRadius:16, padding:16, marginBottom:12, border:`1px solid ${border}` }}>
            <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, lineHeight:1.6 }}>
              {urg.statut === 'resolue'
                ? 'Urgence résolue par votre conciergerie. Aucune action requise de votre part.'
                : 'Votre conciergerie gère tout. Vous êtes informé en temps réel. Aucune action requise.'}
            </div>
          </div>

          {urg.statut === 'en_cours' && (
            <button style={{ width:'100%', background:'#16161A', color:'#F5F0E8', border:`1px solid ${border}`, borderRadius:50, padding:'13px', fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Phone size={14} /> Contacter {urg.conciergerie.split(' ')[0]} si nécessaire
            </button>
          )}
          {urg.statut === 'resolue' && (
            <button onClick={() => setSelected(null)} style={{ width:'100%', background:'#7A9E7E', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <CheckCircle size={14} /> Marquer comme traité
            </button>
          )}
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
          <div style={{ fontFamily:serif, fontSize:22, color:'#F5F0E8', fontWeight:300 }}>Urgences</div>
          <div style={{ fontSize:10, color:'#6B6570', marginTop:2, fontFamily:font, letterSpacing:2, textTransform:'uppercase' as const }}>Gérées par vos conciergeries</div>
        </div>
        <span style={{ background:'rgba(196,96,96,0.1)', color:'#C46060', fontSize:10, fontWeight:500, padding:'4px 12px', borderRadius:20, fontFamily:font }}>1 active</span>
      </div>

      <div style={{ background:'rgba(196,96,96,0.04)', padding:'10px 18px', fontSize:11, color:'#C46060', fontFamily:font, display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(196,96,96,0.15)' }}>
        <Shield size={12} /> Vos conciergeries gèrent les urgences. Vous êtes informé, vous ne gérez pas.
      </div>

      <div style={{ padding:'8px 0 24px' }}>
        <div style={{ padding:'14px 18px 6px', fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, fontFamily:font, fontWeight:500 }}>En cours</div>
        {urgences.filter(u => u.statut === 'en_cours').map(u => {
          const Icon = u.icon
          return (
            <div key={u.id} onClick={() => setSelected(u.id)} style={{ background:'#16161A', borderRadius:16, padding:16, margin:'0 14px 10px', cursor:'pointer', border:`1px solid ${border}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <div style={{ width:48, height:48, borderRadius:16, background:`rgba(107,158,196,0.08)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(107,158,196,0.2)' }}>
                  <Icon size={20} color={u.color} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:14, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{u.type}</span>
                    <span style={{ background:'rgba(196,96,96,0.1)', color:'#C46060', fontSize:9, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font }}>En cours</span>
                  </div>
                  <div style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{u.bien}</div>
                </div>
                <div style={{ textAlign:'right' as const }}>
                  <div style={{ fontFamily:serif, fontSize:24, color:or, fontWeight:300 }}>{u.eta}</div>
                  <div style={{ fontSize:9, color:'#6B6570', fontFamily:font, letterSpacing:1 }}>ETA</div>
                </div>
              </div>
              <div style={{ background:'#0A0A0B', borderRadius:10, padding:'9px 12px', display:'flex', alignItems:'center', gap:10, border:`1px solid ${border}` }}>
                <User size={13} color="#6B6570" />
                <span style={{ fontSize:12, color:'#F5F0E8', fontFamily:font, flex:1 }}>{u.conciergerie} est en route</span>
                <span style={{ fontSize:10, color:'#6B6570', fontFamily:font }}>{u.heure}</span>
              </div>
            </div>
          )
        })}

        <div style={{ padding:'14px 18px 6px', fontSize:9, color:'#6B6570', letterSpacing:3, textTransform:'uppercase' as const, fontFamily:font, fontWeight:500 }}>Résolues</div>
        {urgences.filter(u => u.statut === 'resolue').map(u => {
          const Icon = u.icon
          return (
            <div key={u.id} onClick={() => setSelected(u.id)} style={{ background:'#16161A', borderRadius:16, padding:16, margin:'0 14px 10px', cursor:'pointer', opacity:0.6, border:`1px solid ${border}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:14, background:'rgba(201,169,110,0.04)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
                  <Icon size={18} color="#6B6570" />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font }}>{u.type}</span>
                    <span style={{ background:'rgba(122,158,126,0.1)', color:'#7A9E7E', fontSize:9, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font }}>Résolue</span>
                  </div>
                  <div style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{u.bien} · {u.heure}</div>
                </div>
                <CheckCircle size={16} color="#7A9E7E" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
