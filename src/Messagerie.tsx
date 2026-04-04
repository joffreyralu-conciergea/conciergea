import { useState } from 'react'

type Tab = 'action' | 'journal' | 'auto'

const msgs = {
  action: [
    { id:1, type:'Litige', bien:'Studio Marais', nom:'Thomas Kirchner', msg:'Je souhaite un remboursement partiel pour le chauffage.', time:'14h32', unread:true, color:'#B83C3C' },
    { id:2, type:'Avis post-sejour', bien:'Villa Nice', nom:'Amelie Fontaine', msg:'Merci pour ce sejour ! Petite remarque sur la climatisation.', time:'10h15', unread:false, color:'#C9A84C' },
  ],
  journal: [
    { id:1, de:'Voyageur', a:'Sofia', nom:'Thomas K.', msg:'A quelle heure puis-je arriver ?', time:'14h32', color:'#3A5C7A' },
    { id:2, de:'Sofia', a:'Voyageur', nom:'Sofia H.', msg:'Je vous accueille des 14h !', time:'14h45', color:'#4A7C59' },
    { id:3, de:'Carlos', a:'Vous', nom:'Carlos M.', msg:'Menage termine, photos envoyees.', time:'11h20', color:'#4A7C59' },
  ],
  auto: [
    { id:1, type:'Message de bienvenue', dest:'Thomas K.', msg:'Bonjour Thomas, bienvenue au Studio Marais ! Sofia vous attend a 14h...', time:'09h00' },
    { id:2, type:'Code dacces', dest:'Thomas K.', msg:'Rappel : Code immeuble 1234B, appartement 3e etage...', time:'Hier 20h' },
    { id:3, type:'Demande davis', dest:'Amelie F.', msg:'Nous esperons que votre sejour a la Villa Nice sest bien passe...', time:'Hier 11h' },
  ]
}

export default function Messagerie({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('action')
  const [chat, setChat] = useState<number|null>(null)
  const [reply, setReply] = useState('')

  const S = {
    page: { minHeight:'100vh', background:'#1A1410' } as const,
    header: { background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' } as const,
    back: { background:'none', border:'none', color:'#8C7E72', cursor:'pointer', fontSize:20, lineHeight:1 } as const,
    htitle: { fontFamily:'Georgia', fontSize:18, color:'white', margin:0, flex:1 } as const,
    hsub: { fontSize:11, color:'#8C7E72', marginTop:2 } as const,
    tabs: { display:'flex', borderBottom:'1px solid #3E3028', background:'#2C2218' } as const,
    tab: (active:boolean) => ({ flex:1, padding:'11px 6px', border:'none', background:'none', fontSize:11, fontWeight:700 as const, cursor:'pointer', borderBottom: active ? '2px solid #C4714A' : '2px solid transparent', color: active ? '#C4714A' : '#8C7E72' }),
    info: { background:'#FBF0EA', padding:'9px 16px', fontSize:11, color:'#8C4E2E' } as const,
    infoG: { background:'#2C2218', padding:'9px 16px', fontSize:11, color:'#8C7E72', borderBottom:'1px solid #3E3028' } as const,
    infoT: { background:'#FBF0EA', padding:'9px 16px', fontSize:11, color:'#8C4E2E', borderBottom:'1px solid #E8DECE' } as const,
    conv: (bg:string) => ({ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderBottom:'1px solid #3E3028', cursor:'pointer', background:bg }),
    av: (c:string) => ({ width:40, height:40, borderRadius:'50%' as const, background:c+'22', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 as const }),
    name: { fontSize:13, fontWeight:700 as const, color:'white' } as const,
    sub: { fontSize:10, color:'#C4714A', fontWeight:600 as const } as const,
    preview: { fontSize:11, color:'#8C7E72', marginTop:2, whiteSpace:'nowrap' as const, overflow:'hidden' as const, textOverflow:'ellipsis' as const } as const,
    time: { fontSize:10, color:'#8C7E72' } as const,
    badge: { width:18, height:18, background:'#C4714A', borderRadius:'50%' as const, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, color:'white', fontWeight:800 as const } as const,
    empty: { textAlign:'center' as const, padding:'40px 20px' },
    bw: (me:boolean) => ({ display:'flex', gap:8, alignItems:'flex-end', marginBottom:12, flexDirection: me ? 'row-reverse' as const : 'row' as const }),
    bub: (me:boolean) => ({ maxWidth:'74%', padding:'9px 12px', borderRadius:16, fontSize:12, lineHeight:1.55, background: me ? '#C4714A' : '#2C2218', color:'white', borderBottomRightRadius: me ? 4 : 16, borderBottomLeftRadius: me ? 16 : 4 }),
    bt: (me:boolean) => ({ fontSize:9, color:'#8C7E72', marginBottom:3, textAlign: me ? 'right' as const : 'left' as const }),
  }

  if (chat !== null) {
    const item = msgs.action.find(m => m.id === chat)
    if (!item) return null
    return (
      <div style={S.page}>
        <div style={S.header}>
          <button onClick={() => setChat(null)} style={S.back}>←</button>
          <div style={{ flex:1 }}>
            <div style={S.htitle}>{item.nom}</div>
            <div style={{ display:'flex', gap:6, marginTop:4 }}>
              <span style={{ background:item.color+'22', color:item.color, fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:20 }}>{item.type}</span>
              <span style={{ fontSize:10, color:'#8C7E72' }}>{item.bien}</span>
            </div>
          </div>
        </div>
        <div style={{ background:item.color+'15', padding:'7px 16px', fontSize:11, color:item.color, fontWeight:600 }}>
          ⚠ Votre attention requise · Conciergerie informee
        </div>
        <div style={{ padding:14, overflowY:'auto' as const, flex:1 }}>
          <div style={S.bw(false)}>
            <div style={{ width:26, height:26, background:'#2C2218', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, flexShrink:0 }}>👤</div>
            <div>
              <div style={S.bt(false)}>14h32</div>
              <div style={S.bub(false)}>{item.msg}</div>
            </div>
          </div>
          <div style={{ background:'#2C2218', borderRadius:12, padding:'10px 12px', margin:'8px 0', display:'flex', gap:8 }}>
            <span style={{ fontSize:14 }}>👩</span>
            <div style={{ fontSize:11, color:'#8C7E72', lineHeight:1.5 }}><strong style={{ color:'white' }}>Conciergerie</strong> — Incident confirme et pris en charge.</div>
          </div>
          <div style={S.bw(true)}>
            <div>
              <div style={S.bt(true)}>15h10</div>
              <div style={S.bub(true)}>Merci pour votre retour. Je reviens vers vous rapidement.</div>
            </div>
          </div>
        </div>
        <div style={{ background:'#2C2218', borderTop:'1px solid #3E3028', padding:'10px 12px', display:'flex', gap:8, alignItems:'center' }}>
          <input value={reply} onChange={e => setReply(e.target.value)} placeholder={`Repondre a ${item.nom}...`}
            style={{ flex:1, background:'#3E3028', border:'none', borderRadius:12, padding:'10px 12px', color:'white', fontSize:12, outline:'none' }} />
          <button onClick={() => setReply('')} style={{ width:38, height:38, background:'#C4714A', border:'none', borderRadius:11, cursor:'pointer', fontSize:14, color:'white' }}>➤</button>
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button onClick={onBack} style={S.back}>←</button>
        <div style={{ flex:1 }}>
          <div style={S.htitle}>Messages</div>
          <div style={S.hsub}>Supervision — gere par vos conciergeries</div>
        </div>
      </div>

      <div style={S.tabs}>
        <button onClick={() => setTab('action')} style={S.tab(tab==='action')}>
          ⚠ Action {tab==='action' || <span style={{ background:'#C4714A', color:'white', borderRadius:10, padding:'1px 5px', fontSize:9, marginLeft:4 }}>2</span>}
        </button>
        <button onClick={() => setTab('journal')} style={S.tab(tab==='journal')}>📋 Journal</button>
        <button onClick={() => setTab('auto')} style={S.tab(tab==='auto')}>🤖 Auto</button>
      </div>

      {tab === 'action' && (
        <div>
          <div style={S.infoT}>💡 Ces messages necessitent votre decision directe</div>
          {msgs.action.map(m => (
            <div key={m.id} onClick={() => setChat(m.id)} style={S.conv(m.unread ? m.color+'11' : '#1A1410')}>
              <div style={S.av(m.color)}>👤</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', gap:5, marginBottom:2 }}>
                  <span style={{ background:m.color+'22', color:m.color, fontSize:9, fontWeight:700, padding:'2px 7px', borderRadius:20 }}>{m.type}</span>
                  <span style={{ fontSize:10, color:'#8C7E72' }}>{m.bien}</span>
                </div>
                <div style={S.name}>{m.nom}</div>
                <div style={S.preview}>{m.msg}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column' as const, alignItems:'flex-end', gap:4 }}>
                <div style={S.time}>{m.time}</div>
                {m.unread && <div style={S.badge}>1</div>}
              </div>
            </div>
          ))}
          <div style={{ ...S.empty }}>
            <div style={{ fontSize:28, marginBottom:8 }}>✅</div>
            <div style={{ fontSize:13, fontWeight:700, color:'white', marginBottom:4 }}>C est tout pour maintenant</div>
            <div style={{ fontSize:11, color:'#8C7E72' }}>Vos conciergeries gerent le reste</div>
          </div>
        </div>
      )}

      {tab === 'journal' && (
        <div>
          <div style={S.infoG}>👁 Lecture seule — gere par vos conciergeries</div>
          {msgs.journal.map(m => (
            <div key={m.id} style={S.conv('#1A1410')}>
              <div style={S.av(m.color)}>👤</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:m.color, fontWeight:600, marginBottom:1 }}>{m.de} → {m.a}</div>
                <div style={S.preview}>{m.msg}</div>
              </div>
              <div style={S.time}>{m.time}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'auto' && (
        <div>
          <div style={{ background:'#FBF0EA', padding:'9px 16px', fontSize:11, color:'#8C4E2E', borderBottom:'1px solid #E8DECE' }}>
            🤖 3 messages envoyes a votre place ce mois
          </div>
          {msgs.auto.map(m => (
            <div key={m.id} style={S.conv('#1A1410')}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:'#FBF0EA', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>🤖</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:10, color:'#C4714A', fontWeight:600, marginBottom:1 }}>{m.type} · {m.dest}</div>
                <div style={S.preview}>{m.msg}</div>
              </div>
              <div style={S.time}>{m.time}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
