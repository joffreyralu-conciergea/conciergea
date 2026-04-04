import { useState } from 'react'

type Conciergerie = {
  id: number
  nom: string
  zone: string
  distance: string
  note: number
  missions: number
  services: string[]
  prix: number
  dispo: boolean
  top: boolean
  score?: number
}

const data: Conciergerie[] = [
  { id:1, nom:'Sofia Hernandez', zone:'Paris 3e-11e', distance:'0.4 km', note:4.97, missions:47, services:['Check-in','Menage','Linge','Urgences'], prix:25, dispo:true, top:true, score:94 },
  { id:2, nom:'Carlos Moreno', zone:'Paris 10e-20e', distance:'1.2 km', note:4.91, missions:31, services:['Menage','Linge'], prix:20, dispo:false, top:false },
  { id:3, nom:'Marie Dupont', zone:'Paris 1e-6e', distance:'2.1 km', note:4.88, missions:22, services:['Check-in','Menage','Urgences'], prix:28, dispo:true, top:false },
  { id:4, nom:'Lucas Martin', zone:'Paris 15e-20e', distance:'3.4 km', note:4.85, missions:18, services:['Check-in','Menage','Linge'], prix:22, dispo:true, top:false },
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

  const S = {
    page: { minHeight:'100vh', background:'#1A1410' } as const,
    header: { background:'#2C2218', padding:'14px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid #3E3028' } as const,
    back: { background:'none', border:'none', color:'#8C7E72', cursor:'pointer', fontSize:20 } as const,
    htitle: { fontFamily:'Georgia', fontSize:18, color:'white', margin:0 } as const,
    hsub: { fontSize:11, color:'#8C7E72', marginTop:2 } as const,
    filtres: { display:'flex', gap:8, padding:'12px 16px', overflowX:'auto' as const, background:'#1A1410' },
    fc: (on:boolean) => ({ padding:'6px 14px', borderRadius:20, fontSize:11, fontWeight:700 as const, border:'none', cursor:'pointer', background: on ? '#C4714A' : '#2C2218', color: on ? 'white' : '#8C7E72', whiteSpace:'nowrap' as const }),
    card: (sel:boolean) => ({ background:'#2C2218', borderRadius:16, padding:16, margin:'0 14px 12px', border: sel ? '2px solid #C4714A' : '2px solid transparent', cursor:'pointer', transition:'all .2s' }),
    ia: { background:'linear-gradient(135deg,#1A1410,#2C2218)', borderRadius:16, padding:16, margin:'14px 14px 0', border:'1px solid #3E3028' } as const,
    tag: (c:string) => ({ background:c+'22', color:c, fontSize:10, fontWeight:700 as const, padding:'3px 9px', borderRadius:20, display:'inline-block' }),
    service: { background:'#3E3028', color:'#8C7E72', fontSize:10, padding:'3px 9px', borderRadius:20, display:'inline-block', margin:'2px' } as const,
    btn: (c:string) => ({ background:c, color:'white', border:'none', borderRadius:50, padding:'9px 18px', fontSize:12, fontWeight:700 as const, cursor:'pointer' }),
    modal: { position:'fixed' as const, inset:0, background:'rgba(0,0,0,.7)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:100 },
    modalBox: { background:'#2C2218', borderRadius:'24px 24px 0 0', padding:24, width:'100%', maxWidth:480 } as const,
  }

  if (confirme !== null) {
    const c = data.find(d => d.id === confirme)!
    return (
      <div style={{ minHeight:'100vh', background:'#1A1410', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ textAlign:'center', maxWidth:340 }}>
          <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
          <h2 style={{ fontFamily:'Georgia', fontSize:26, color:'white', marginBottom:8 }}>{c.nom}</h2>
          <p style={{ color:'#8C7E72', fontSize:14, marginBottom:24 }}>est maintenant assignee a votre bien. Elle recevra les missions automatiquement.</p>
          <div style={{ background:'#2C2218', borderRadius:14, padding:16, marginBottom:24 }}>
            <div style={{ fontSize:11, color:'#8C7E72', marginBottom:4 }}>Commission Conciergea</div>
            <div style={{ fontFamily:'Georgia', fontSize:24, color:'#C4714A' }}>12%</div>
            <div style={{ fontSize:11, color:'#8C7E72', marginTop:4 }}>sur chaque mission</div>
          </div>
          <button onClick={onBack} style={{ ...S.btn('#C4714A'), width:'100%', padding:'14px' }}>
            Retour au dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <button onClick={onBack} style={S.back}>←</button>
        <div style={{ flex:1 }}>
          <div style={S.htitle}>Conciergeries</div>
          <div style={S.hsub}>8 disponibles pres de vos biens</div>
        </div>
        <span style={{ background:'#4A7C59', color:'white', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>8 dispo</span>
      </div>

      <div style={S.ia}>
        <div style={{ fontSize:9, color:'#8C7E72', letterSpacing:2, textTransform:'uppercase' as const, marginBottom:8 }}>🤖 Recommandation IA</div>
        {ia && (
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ textAlign:'center' as const }}>
              <div style={{ fontFamily:'Georgia', fontSize:32, color:'#C4714A', lineHeight:1 }}>{ia.score}%</div>
              <div style={{ fontSize:9, color:'#8C7E72', marginTop:2 }}>Compatibilite</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:'white' }}>{ia.nom}</div>
              <div style={{ fontSize:11, color:'#8C7E72', marginTop:4, lineHeight:1.6 }}>
                → 3 biens similaires dans le 4e<br/>
                → Note 4.97 · Reactive sous 30 min
              </div>
            </div>
            <button onClick={() => setSelected(ia.id)} style={S.btn('#C4714A')}>Voir</button>
          </div>
        )}
      </div>

      <div style={S.filtres}>
        {(['proximite','note','prix'] as const).map(f => (
          <button key={f} onClick={() => setFiltre(f)} style={S.fc(filtre===f)}>
            {f === 'proximite' ? 'Proximite' : f === 'note' ? 'Note ⭐' : 'Prix'}
          </button>
        ))}
      </div>

      <div style={{ padding:'4px 0' }}>
        {sorted.map(c => (
          <div key={c.id} onClick={() => setSelected(c.id)} style={S.card(selected===c.id)}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <div style={{ width:46, height:46, borderRadius:14, background:'#3E3028', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>👤</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'white' }}>{c.nom}</div>
                <div style={{ fontSize:11, color:'#8C7E72', marginTop:2 }}>📍 {c.zone} · 📏 {c.distance}</div>
              </div>
              <div style={{ textAlign:'right' as const }}>
                <div style={{ display:'flex', alignItems:'center', gap:3, justifyContent:'flex-end' }}>
                  <span style={{ color:'#F0B429', fontSize:12 }}>⭐</span>
                  <span style={{ fontSize:14, fontWeight:800, color:'white' }}>{c.note}</span>
                </div>
                {c.top && <span style={S.tag('#C9A84C')}>Top</span>}
              </div>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap' as const, gap:4, marginBottom:10 }}>
              {c.services.map(sv => <span key={sv} style={S.service}>{sv}</span>)}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:10, borderTop:'1px solid #3E3028' }}>
              <div>
                <span style={{ fontFamily:'Georgia', fontSize:20, color:'white' }}>{c.prix}€</span>
                <span style={{ fontSize:11, color:'#8C7E72' }}> / mission</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:11, fontWeight:700, color: c.dispo ? '#4A7C59' : '#8C7E72' }}>
                  {c.dispo ? '✓ Dispo' : 'Dispo demain'}
                </span>
                <button onClick={e => { e.stopPropagation(); setConfirme(c.id) }} style={S.btn(c.dispo ? '#C4714A' : '#3E3028')}>
                  Choisir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <div style={S.modal} onClick={() => setSelected(null)}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            {(() => {
              const c = data.find(d => d.id === selected)!
              return (
                <>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
                    <h3 style={{ fontFamily:'Georgia', fontSize:20, color:'white', margin:0 }}>{c.nom}</h3>
                    <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', color:'#8C7E72', cursor:'pointer', fontSize:18 }}>✕</button>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:16 }}>
                    {[{v:`${c.note}⭐`,l:'Note'},{v:`${c.missions}`,l:'Missions'},{v:`${c.prix}€`,l:'Par mission'}].map((s,i) => (
                      <div key={i} style={{ background:'#3E3028', borderRadius:12, padding:'12px', textAlign:'center' as const }}>
                        <div style={{ fontFamily:'Georgia', fontSize:20, color:'#C4714A' }}>{s.v}</div>
                        <div style={{ fontSize:10, color:'#8C7E72', marginTop:4 }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginBottom:16 }}>
                    <div style={{ fontSize:11, color:'#8C7E72', marginBottom:8 }}>Services</div>
                    <div style={{ display:'flex', flexWrap:'wrap' as const, gap:6 }}>
                      {c.services.map(sv => <span key={sv} style={{ background:'#3E3028', color:'white', fontSize:12, padding:'5px 12px', borderRadius:20 }}>{sv}</span>)}
                    </div>
                  </div>
                  <button onClick={() => { setSelected(null); setConfirme(c.id) }} style={{ ...S.btn('#C4714A'), width:'100%', padding:'14px', fontSize:14 }}>
                    Choisir {c.nom}
                  </button>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
