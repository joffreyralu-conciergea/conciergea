import { useState } from 'react'
import { ArrowLeft, AlertTriangle, BookOpen, Bot, User, CheckCircle, Send } from 'lucide-react'

type Tab = 'action' | 'journal' | 'auto'
const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

const msgs = {
  action: [
    { id:1, type:'Litige', bien:'Studio Marais', nom:'Thomas Kirchner', msg:'Je souhaite un remboursement partiel pour le chauffage.', time:'14h32', unread:true, color:'#C46060' },
    { id:2, type:'Avis post-séjour', bien:'Villa Nice', nom:'Amélie Fontaine', msg:'Merci pour ce séjour ! Petite remarque sur la climatisation.', time:'10h15', unread:false, color:or },
  ],
  journal: [
    { id:1, de:'Voyageur', a:'Sofia', nom:'Thomas K.', msg:'À quelle heure puis-je arriver ?', time:'14h32', color:'#6B9EC4' },
    { id:2, de:'Sofia', a:'Voyageur', nom:'Sofia H.', msg:'Je vous accueille dès 14h !', time:'14h45', color:'#7A9E7E' },
    { id:3, de:'Carlos', a:'Vous', nom:'Carlos M.', msg:'Ménage terminé, photos envoyées.', time:'11h20', color:'#7A9E7E' },
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
    <div style={{ minHeight:'100vh', background:'#0A0A0B', display:'flex', flexDirection:'column' as const }}>
      <div style={{ background:'#16161A', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${border}` }}>
        <button onClick={() => setChat(null)} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B6570', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:18, color:'#F5F0E8', fontWeight:300 }}>{item.nom}</div>
          <div style={{ display:'flex', gap:8, marginTop:4, alignItems:'center' }}>
            <span style={{ background:`rgba(196,96,96,0.1)`, color:item.color, fontSize:10, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font }}>{item.type}</span>
            <span style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{item.bien}</span>
          </div>
        </div>
      </div>

      <div style={{ background:`rgba(196,96,96,0.06)`, padding:'9px 18px', fontSize:12, color:'#C46060', fontWeight:500, fontFamily:font, display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid rgba(196,96,96,0.15)' }}>
        <AlertTriangle size={13} /> Votre attention est requise
      </div>

      <div style={{ flex:1, padding:16 }}>
        <div style={{ display:'flex', gap:10, alignItems:'flex-end', marginBottom:14 }}>
          <div style={{ width:32, height:32, background:'#16161A', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
            <User size={15} color="#6B6570" />
          </div>
          <div>
            <div style={{ fontSize:10, color:'#6B6570', marginBottom:4, fontFamily:font }}>14h32</div>
            <div style={{ background:'#16161A', padding:'10px 14px', borderRadius:'16px 16px 16px 4px', fontSize:13, color:'#F5F0E8', fontFamily:font, lineHeight:1.6, border:`1px solid ${border}` }}>
              {item.msg}
            </div>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, alignItems:'flex-end', justifyContent:'flex-end', marginBottom:14 }}>
          <div>
            <div style={{ fontSize:10, color:'#6B6570', marginBottom:4, textAlign:'right' as const, fontFamily:font }}>15h10</div>
            <div style={{ background:or, padding:'10px 14px', borderRadius:'16px 16px 4px 16px', fontSize:13, color:'#0A0A0B', fontFamily:font, lineHeight:1.6 }}>
              Merci pour votre retour. Je reviens vers vous rapidement.
            </div>
          </div>
        </div>
      </div>

      <div style={{ background:'#16161A', borderTop:`1px solid ${border}`, padding:'12px 14px', display:'flex', gap:10, alignItems:'center' }}>
        <input value={reply} onChange={e => setReply(e.target.value)} placeholder="Répondre..."
          style={{ flex:1, background:'#0A0A0B', border:`1px solid ${border}`, borderRadius:12, padding:'11px 14px', color:'#F5F0E8', fontSize:13, outline:'none', fontFamily:font }} />
        <button onClick={() => setReply('')} style={{ width:40, height:40, background:or, border:'none', borderRadius:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Send size={15} color="#0A0A0B" />
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#0A0A0B' }}>
      <div style={{ background:'#16161A', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${border}` }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', color:'#6B6570', display:'flex', alignItems:'center' }}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:serif, fontSize:22, color:'#F5F0E8', fontWeight:300 }}>Messages</div>
          <div style={{ fontSize:10, color:'#6B6570', marginTop:2, fontFamily:font, letterSpacing:2, textTransform:'uppercase' as const }}>Géré par vos conciergeries</div>
        </div>
      </div>

      <div style={{ display:'flex', borderBottom:`1px solid ${border}`, background:'#16161A' }}>
        {[
          { id:'action', icon:<AlertTriangle size={12} />, label:'Action' },
          { id:'journal', icon:<BookOpen size={12} />, label:'Journal' },
          { id:'auto', icon:<Bot size={12} />, label:'Auto' },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id as Tab)} style={{
            flex:1, padding:'11px 6px', border:'none', background:'none',
            fontSize:11, fontWeight:500, cursor:'pointer', fontFamily:font,
            borderBottom: tab === t.id ? `2px solid ${or}` : '2px solid transparent',
            color: tab === t.id ? or : '#6B6570',
            display:'flex', alignItems:'center', justifyContent:'center', gap:5,
          }}>
            {t.icon} {t.label}
            {t.id === 'action' && tab !== 'action' && (
              <span style={{ background:'#C46060', color:'white', borderRadius:10, padding:'1px 6px', fontSize:9, fontWeight:700 }}>2</span>
            )}
          </button>
        ))}
      </div>

      {tab === 'action' && (
        <div>
          <div style={{ background:'rgba(201,169,110,0.04)', padding:'10px 18px', fontSize:11, color:or, fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:`1px solid ${border}` }}>
            <AlertTriangle size={12} /> Ces messages nécessitent votre décision directe
          </div>
          {msgs.action.map(m => (
            <button key={m.id} onClick={() => setChat(m.id)} style={{ width:'100%', background: m.unread ? 'rgba(196,96,96,0.04)' : '#0A0A0B', border:'none', borderBottom:`1px solid ${border}`, padding:'14px 18px', cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' as const }}>
              <div style={{ width:44, height:44, borderRadius:14, background:'rgba(196,96,96,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(196,96,96,0.2)' }}>
                <User size={18} color={m.color} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:6, marginBottom:4, alignItems:'center' }}>
                  <span style={{ background:'rgba(196,96,96,0.1)', color:m.color, fontSize:10, fontWeight:500, padding:'2px 8px', borderRadius:20, fontFamily:font }}>{m.type}</span>
                  <span style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{m.bien}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:500, color:'#F5F0E8', fontFamily:font, marginBottom:3 }}>{m.nom}</div>
                <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:6 }}>
                <span style={{ fontSize:11, color:'#6B6570', fontFamily:font }}>{m.time}</span>
                {m.unread && <div style={{ width:20, height:20, background:or, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'#0A0A0B', fontWeight:700 }}>1</div>}
              </div>
            </button>
          ))}
          <div style={{ textAlign:'center' as const, padding:'36px 20px' }}>
            <div style={{ width:48, height:48, background:'#16161A', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', border:`1px solid ${border}` }}>
              <CheckCircle size={20} color="#7A9E7E" />
            </div>
            <div style={{ fontSize:14, fontWeight:500, color:'#F5F0E8', marginBottom:4, fontFamily:font }}>C'est tout pour maintenant</div>
            <div style={{ fontSize:12, color:'#6B6570', fontFamily:font }}>Vos conciergeries gèrent le reste</div>
          </div>
        </div>
      )}

      {tab === 'journal' && (
        <div>
          <div style={{ background:'#16161A', padding:'10px 18px', fontSize:11, color:'#6B6570', fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:`1px solid ${border}` }}>
            <BookOpen size={12} /> Lecture seule — géré par vos conciergeries
          </div>
          {msgs.journal.map(m => (
            <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:`1px solid ${border}` }}>
              <div style={{ width:40, height:40, borderRadius:12, background:'rgba(201,169,110,0.06)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
                <User size={16} color={m.color} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:m.color, fontWeight:500, marginBottom:3, fontFamily:font, letterSpacing:1 }}>{m.de} → {m.a}</div>
                <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <span style={{ fontSize:11, color:'#6B6570', fontFamily:font, flexShrink:0 }}>{m.time}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'auto' && (
        <div>
          <div style={{ background:'rgba(201,169,110,0.04)', padding:'10px 18px', fontSize:11, color:or, fontFamily:font, display:'flex', alignItems:'center', gap:6, borderBottom:`1px solid ${border}` }}>
            <Bot size={12} /> 3 messages envoyés à votre place ce mois
          </div>
          {msgs.auto.map(m => (
            <div key={m.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:`1px solid ${border}` }}>
              <div style={{ width:40, height:40, borderRadius:12, background:'rgba(201,169,110,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:`1px solid ${border}` }}>
                <Bot size={16} color={or} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:or, fontWeight:500, marginBottom:3, fontFamily:font, letterSpacing:1 }}>{m.type} · {m.dest}</div>
                <div style={{ fontSize:12, color:'#6B6570', fontFamily:font, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const }}>{m.msg}</div>
              </div>
              <span style={{ fontSize:11, color:'#6B6570', fontFamily:font, flexShrink:0 }}>{m.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
