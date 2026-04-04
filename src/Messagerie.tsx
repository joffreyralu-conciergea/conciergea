import { useState } from 'react'
import {
  ArrowLeft, AlertTriangle, BookOpen, Bot, User,
  CheckCircle, Send
} from 'lucide-react'

type Tab = 'action' | 'journal' | 'auto'

const font = 'Inter, sans-serif'
const serif = 'Playfair Display, Georgia, serif'

const msgs = {
  action: [
    { id:1, type:'Litige', bien:'Studio Marais', nom:'Thomas Kirchner', msg:'Je souhaite un remboursement partiel pour le chauffage.', time:'14h32', unread:true, color:'#B83C3C' },
    { id:2, type:'Avis post-séjour', bien:'Villa Nice', nom:'Amélie Fontaine', msg:'Merci pour ce séjour ! Petite remarque sur la climatisation.', time:'10h15', unread:false, color:'#C9A84C' },
  ],
  journal: [
    { id:1, de:'Voyageur', a:'Sofia', nom:'Thomas K.', msg:'À quelle heure puis-je arriver ?', time:'14h32', color:'#3A5C7A' },
    { id:2, de:'Sofia', a:'Voyageur', nom:'Sofia H.', msg:'Je vous accueille dès 14h !', time:'14h45', color:'#4A7C59' },
    { id:3, de:'Carlos', a:'Vous', nom:'Carlos M.', msg:'Ménage terminé, photos envoyées.', time:'11h20', color:'#4A7C59' },
  ],
  auto: [
    { id:1, type:'Message de bienvenue', dest:'Thomas K.', msg:'Bonjour Thomas, bienvenue au Studio Marais ! Sofia vous attend à 14h...', time:'09h00' },
    { id:2, type:'Code accès', dest:'Thomas K.', msg:'Rappel : Code immeuble 1234B, appartement 3e étage...', time:'Hier 20h' },
    { id:3, type:"Demande d'avis", dest:'Amélie F.', msg:"Nous espérons que votre séjour à la Villa Nice s'est bien passé...", time:'Hier 11h' },
  ]
}

export default function Messagerie({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('action')
  const [chat, setChat] = useState<number|null>(null)
  const [reply, setReply] = useState('')

  const item = chat !== null ? msgs.action.find(m => m.id === chat) : null

  if (chat !== null && item) return (
    <div style={{ minHeight:'100vh', background:'#1A1410', display:'flex', flexDirection:'column' as const }}>
      <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
        <button onClick={() => setChat(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#8C7E72', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:16, color:'white', fontWeight:700 }}>{item.nom}</div>
          <div style={{ display:'flex', gap:8, marginTop:4, alignItems:'center' }}>
            <span style={{ background:item.color+'22', color:item.color, fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, fontFamily:font }}>{item.type}</span>
            <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{item.bien}</span>
          </div>
        </div>
      </div>

      <div style={{ background:item.color+'18', padding:'9px 18px', fontSize:12, color:item.color, fontWeight:600, fontFamily:font, display:'flex', alignItems:'center', gap:8 }}>
        <AlertTriangle size={14} /> Votre attention est requise
      </div>

      <div style={{ flex:1, padding:16 }}>
        <div style={{ display:'flex', gap:10, alignItems:'flex-end', marginBottom:14 }}>
          <div style={{ width:32, height:32, background:'#2C2218', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <User size={16} color="#8C7E72" />
          </div>
          <div>
            <div style={{ fontSize:10, color:'#8C7E72', marginBottom:4, fontFamily:font }}>14h32</div>
            <div style={{ background:'#2C2218', padding:'10px 14px', borderRadius:'16px 16px 16px 4px', fontSize:13, color:'white', fontFamily:font, lineHeight:1.6 }}>
              {item.msg}
            </div>
          </div>
        </div>

        <div style={{ background:'#2C2218', borderRadius:14, padding:'12px 14px', marginBottom:14, display:'flex', gap:10, alignItems:'flex-start' }}>
          <div style={{ width:28, height:28, background:'#4A7C5922', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <User size={14} color="#4A7C59" />
          </div>
          <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, lineHeight:1.6 }}>
            <strong style={{ color:'white' }}>Conciergerie</strong> — Incident confirmé et pris en charge.
          </div>
        </div>

        <div style={{ display:'flex', gap:10, alignItems:'flex-end', justifyContent:'flex-end', marginBottom:14 }}>
          <div>
            <div style={{ fontSize:10, color:'#8C7E72', marginBottom:4, textAlign:'right' as const, fontFamily:font }}>15h10</div>
            <div style={{ background:'#C4714A', padding:'10px 14px', borderRadius:'16px 16px 4px 16px', fontSize:13, color:'white', fontFamily:font, lineHeight:1.6 }}>
              Merci pour votre retour. Je reviens vers vous rapidement.
            </div>
          </div>
        </div>
      </div>

      <div style={{ background:'#2C2218', borderTop:'1px solid #3E3028', padding:'12px 14px', display:'flex', gap:10, alignItems:'center' }}>
        <input value={reply} onChange={e => setReply(e.target.value)}
          placeholder="Répondre..."
          style={{ flex:1, background:'#3E3028', border:'none', borderRadius:12, padding:'11px 14px', color:'white', fontSize:13, outline:'none', fontFamily:font }} />
        <button onClick={() => setReply('')} style={{ width:40, height:40, background:'#C4714A', border:'none', borderRadius:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Send size={16} color="white" />
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#1A1410' }}>
      <div style={{ background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:'#8C7E72', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:18, color:'white', fontWeight:700 }}>Messages</div>
          <div style={{ fontSize:11, color:'#8C7E72', marginTop:2, fontFamily:font }}>Supervision — géré par vos conciergeries</div>
        </div>
      </div>

      <div style={{ display:'flex', borderBottom:'1px solid #3E3028', background:'#2C2218' }}>
        {[
          { id:'action', icon:<AlertTriangle size={13} />, label:'Action' },
          { id:'journal', icon:<BookOpen size={13} />, label:'Journal' },
          { id:'auto', icon:<Bot size={13} />, label:'Auto' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as Tab)} style={{
            flex:1, padding:'11px 6px', border:'none', background:'none',
            fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:font,
            borderBottom: tab === t.id ? '2px solid #C4714A' : '2px solid transparent',
            color: tab === t.id ? '#C4714A' : '#8C7E72',
            display:'flex', alignItems:'center', justifyContent:'center', gap:5,
          }}>
            {t.icon} {t.label}
            {t.id === 'action' && tab !== 'action' && (
              <span style={{ background:'#B83C3C', color:'white', borderRadius:10, padding:'1px 6px', fontSize:9, fontWeight:700 }}>2</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'action' && (
        <div>
          <div style={{ background:'#FBF0EA', padding:'10px 18px', fontSize:12, color:'#8C4E2E', fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:'1px solid #E8DECE' }}>
            <AlertTriangle size={13} /> Ces messages nécessitent votre décision directe
          </div>
          {msgs.action.map(m => (
            <button key={m.id} onClick={() => setChat(m.id)} style={{ width:'100%', background: m.unread ? m.color+'0D' : '#1A1410', border:'none', borderBottom:'1px solid #3E3028', padding:'14px 18px', cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' as const }}>
              <div style={{ width:44, height:44, borderRadius:14, background:m.color+'22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <User size={20} color={m.color} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:6, marginBottom:4, alignItems:'center' }}>
                  <span style={{ background:m.color+'22', color:m.color, fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:20, fontFamily:font }}>{m.type}</span>
                  <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{m.bien}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:'white', fontFamily:font, marginBottom:3 }}>{m.nom}</div>
                <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:6 }}>
                <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font }}>{m.time}</span>
                {m.unread && <div style={{ width:20, height:20, background:'#C4714A', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'white', fontWeight:700 }}>1</div>}
              </div>
            </button>
          ))}
          <div style={{ textAlign:'center' as const, padding:'36px 20px' }}>
            <div style={{ width:48, height:48, background:'#2C2218', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
              <CheckCircle size={22} color="#4A7C59" />
            </div>
            <div style={{ fontSize:14, fontWeight:600, color:'white', marginBottom:4, fontFamily:font }}>C'est tout pour maintenant</div>
            <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font }}>Vos conciergeries gèrent le reste</div>
          </div>
        </div>
      )}

      {tab === 'journal' && (
        <div>
          <div style={{ background:'#2C2218', padding:'10px 18px', fontSize:12, color:'#8C7E72', fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:'1px solid #3E3028' }}>
            <BookOpen size={13} /> Lecture seule — géré par vos conciergeries
          </div>
          {msgs.journal.map(m => (
            <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:'1px solid #3E3028' }}>
              <div style={{ width:40, height:40, borderRadius:12, background:m.color+'22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <User size={18} color={m.color} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11, color:m.color, fontWeight:600, marginBottom:3, fontFamily:font }}>{m.de} → {m.a}</div>
                <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font, flexShrink:0 }}>{m.time}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'auto' && (
        <div>
          <div style={{ background:'#FBF0EA', padding:'10px 18px', fontSize:12, color:'#8C4E2E', fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:'1px solid #E8DECE' }}>
            <Bot size={13} /> 3 messages envoyés à votre place ce mois
          </div>
          {msgs.auto.map(m => (
            <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:'1px solid #3E3028' }}>
              <div style={{ width:40, height:40, borderRadius:12, background:'#C4714A22', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Bot size={18} color="#C4714A" />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:11, color:'#C4714A', fontWeight:600, marginBottom:3, fontFamily:font }}>{m.type} · {m.dest}</div>
                <div style={{ fontSize:12, color:'#8C7E72', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <span style={{ fontSize:11, color:'#8C7E72', fontFamily:font, flexShrink:0 }}>{m.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
