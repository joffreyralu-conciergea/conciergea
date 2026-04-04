import { useState } from 'react'
import {
  ArrowLeft, Wrench, Key, Droplets, User,
  Shield, CheckCircle, Clock, Phone, MessageSquare
} from 'lucide-react'

const font = 'Inter, sans-serif'
const serif = 'Playfair Display, Georgia, serif'

type Urgence = {
  id: number
  type: string
  icon: any
  bien: string
  adresse: string
  conciergerie: string
  statut: 'en_cours' | 'resolue'
  heure: string
  eta: string
  color: string
  actions: string[]
}

const urgences: Urgence[] = [
  {
    id: 1,
    type: 'Fuite d\'eau',
    icon: Droplets,
    bien: 'Appartement Vieux Pont',
    adresse: '61 Rue du Pont de Mayenne, Laval',
    conciergerie: 'Sofia Hernandez',
    statut: 'en_cours',
    heure: 'Il y a 12 min',
    eta: '8 min',
    color: '#3A5C7A',
    actions: ['Sofia a accepté la mission', 'Plombier contacté', 'En route vers le bien']
  },
  {
    id: 2,
    type: 'Serrure cassée',
    icon: Key,
    bien: 'Studio Marais',
    adresse: '14 Rue de Bretagne, Paris 3e',
    conciergerie: 'Carlos Moreno',
    statut: 'resolue',
    heure: 'Hier 18h',
    eta: 'Résolue',
    color: '#4A7C59',
    actions: ['Carlos est intervenu', 'Serrure remplacée', 'Voyageur satisfait']
  },
]

export default function Urgences({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null)

  const urg = urgences.find(u => u.id === selected)

  if (selected !== null && urg) {
    const Icon = urg.icon
    return (
      <div style={{ minHeight:'100vh', background:'#1A1410' }}>
        <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
          <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#8C7E72', display:'flex', alignItems:'center' }}>
            <ArrowLeft size={20} />
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:serif, fontSize:17, color:'white', fontWeight:700 }}>{urg.type}</div>
            <div style={{ fontSize:11, color: urg.statut === 'resolue' ? '#4A7C59' : '#C4714A', marginTop:2, fontFamily:font, fontWeight:600 }}>
              {urg.statut === 'resolue' ? '✓ Résolue' : '● En cours'}
            </div>
          </div>
        </div>

        <div style={{ padding:16 }}>
          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:600 }}>Bien concerné</div>
            <div style={{ fontSize:15, fontWeight:600, color:'white', marginBottom:6, fontFamily:font }}>{urg.bien}</div>
            <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, display:'flex', alignItems:'center', gap:6 }}>
              <Icon size={13} color={urg.color} /> {urg.adresse}
            </div>
          </div>

          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:12, fontFamily:font, fontWeight:600 }}>Conciergerie en charge</div>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{ width:46, height:46, borderRadius:14, background:'#3E3028', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <User size={22} color="#8C7E72" />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:'white', fontFamily:font }}>{urg.conciergerie}</div>
                <div style={{ fontSize:12, color: urg.statut === 'resolue' ? '#4A7C59' : '#C4714A', marginTop:3, fontFamily:font, fontWeight:600 }}>
                  {urg.statut === 'resolue' ? 'Mission terminée' : `Arrivée estimée : ${urg.eta}`}
                </div>
              </div>
              {urg.statut === 'en_cours' && (
                <div style={{ textAlign:'right' as const }}>
                  <div style={{ fontFamily:serif, fontSize:26, color:'#C4714A', fontWeight:700, lineHeight:1 }}>{urg.eta}</div>
                  <div style={{ fontSize:10, color:'#8C7E72', fontFamily:font, marginTop:3 }}>avant arrivée</div>
                </div>
              )}
            </div>
          </div>

          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:14, fontFamily:font, fontWeight:600 }}>Suivi en temps réel</div>
            {urg.actions.map((action, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom: i < urg.actions.length - 1 ? 14 : 0 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'#4A7C5922', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <CheckCircle size={14} color="#4A7C59" />
                </div>
                <div style={{ fontSize:13, color:'white', paddingTop:4, fontFamily:font }}>{action}</div>
              </div>
            ))}
          </div>

          <div style={{ background:'#2C2218', borderRadius:16, padding:16, marginBottom:12 }}>
            <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, lineHeight:1.6 }}>
              {urg.statut === 'resolue'
                ? 'Urgence résolue par votre conciergerie. Aucune action requise de votre part.'
                : 'Votre conciergerie gère tout. Vous êtes informé en temps réel. Aucune action requise.'}
            </div>
          </div>

          {urg.statut === 'en_cours' && (
            <button style={{ width:'100%', background:'#3A5C7A', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <Phone size={15} /> Contacter {urg.conciergerie.split(' ')[0]} si nécessaire
            </button>
          )}
          {urg.statut === 'resolue' && (
            <button onClick={() => setSelected(null)} style={{ width:'100%', background:'#4A7C59', color:'white', border:'none', borderRadius:50, padding:'13px', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:font, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
              <CheckCircle size={15} /> Marquer comme traité
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'#1A1410' }}>
      <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:'#8C7E72', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:18, color:'white', fontWeight:700 }}>Urgences</div>
          <div style={{ fontSize:11, color:'#8C7E72', marginTop:2, fontFamily:font }}>Gérées par vos conciergeries</div>
        </div>
        <span style={{ background:'#B83C3C22', color:'#B83C3C', fontSize:11, fontWeight:600, padding:'4px 12px', borderRadius:20, fontFamily:font }}>1 active</span>
      </div>

      <div style={{ background:'#FBF0EA', padding:'10px 18px', fontSize:12, color:'#8C4E2E', fontFamily:font, display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #E8DECE' }}>
        <Shield size={13} /> Vos conciergeries gèrent les urgences. Vous êtes informé, vous ne gérez pas.
      </div>

      <div style={{ padding:'8px 0 24px' }}>
        <div style={{ padding:'14px 18px 6px', fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, fontFamily:font, fontWeight:600 }}>En cours</div>

        {urgences.filter(u => u.statut === 'en_cours').map(u => {
          const Icon = u.icon
          return (
            <div key={u.id} onClick={() => setSelected(u.id)} style={{ background:'#2C2218', borderRadius:16, padding:16, margin:'0 14px 10px', cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:12 }}>
                <div style={{ width:48, height:48, borderRadius:16, background:u.color+'22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={22} color={u.color} />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:14, fontWeight:600, color:'white', fontFamily:font }}>{u.type}</span>
                    <span style={{ background:'#B83C3C22', color:'#B83C3C', fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, fontFamily:font }}>En cours</span>
                  </div>
                  <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>{u.bien}</div>
                </div>
                <div style={{ textAlign:'right' as const }}>
                  <div style={{ fontFamily:serif, fontSize:20, color:'#C4714A', fontWeight:700 }}>{u.eta}</div>
                  <div style={{ fontSize:10, color:'#8C7E72', fontFamily:font }}>ETA</div>
                </div>
              </div>
              <div style={{ background:'#3E3028', borderRadius:10, padding:'9px 12px', display:'flex', alignItems:'center', gap:10 }}>
                <User size={14} color="#8C7E72" />
                <span style={{ fontSize:12, color:'white', fontFamily:font, flex:1 }}>{u.conciergerie} est en route</span>
                <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{u.heure}</span>
              </div>
            </div>
          )
        })}

        <div style={{ padding:'14px 18px 6px', fontSize:10, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, fontFamily:font, fontWeight:600 }}>Résolues</div>

        {urgences.filter(u => u.statut === 'resolue').map(u => {
          const Icon = u.icon
          return (
            <div key={u.id} onClick={() => setSelected(u.id)} style={{ background:'#2C2218', borderRadius:16, padding:16, margin:'0 14px 10px', cursor:'pointer', opacity:0.7 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:46, height:46, borderRadius:14, background:'#3E3028', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon size={20} color="#8C7E72" />
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font }}>{u.type}</span>
                    <span style={{ background:'#4A7C5922', color:'#4A7C59', fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, fontFamily:font }}>Résolue</span>
                  </div>
                  <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>{u.bien} · {u.heure}</div>
                </div>
                <CheckCircle size={18} color="#4A7C59" />
              </div>
            </div>
          )
        })}

        {urgences.length === 0 && (
          <div style={{ textAlign:'center' as const, padding:'48px 20px' }}>
            <div style={{ width:56, height:56, background:'#2C2218', borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
              <Shield size={26} color="#4A7C59" />
            </div>
            <div style={{ fontSize:15, fontWeight:600, color:'white', marginBottom:6, fontFamily:font }}>Aucune urgence</div>
            <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>Vos conciergeries gèrent tout</div>
          </div>
        )}
      </div>
    </div>
  )
}
