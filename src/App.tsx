import { useState } from 'react'
import { supabase } from './supabase'
import Dashboard from './Dashboard'
import DashboardConciergerie from './DashboardConciergerie'
import { Home, Handshake, ArrowRight, Eye, EyeOff } from 'lucide-react'

type Page = 'accueil' | 'inscription' | 'connexion'
type Profil = 'proprietaire' | 'conciergerie' | null

const font = 'DM Sans, sans-serif'
const serif = 'Cormorant Garamond, Georgia, serif'
const or = '#C9A96E'
const border = 'rgba(201,169,110,0.15)'

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#16161A',
  border: '1px solid rgba(201,169,110,0.15)',
  borderRadius: 14,
  padding: '14px 16px',
  color: '#F5F0E8',
  fontSize: 14,
  marginBottom: 12,
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: font,
}

const BTN1: React.CSSProperties = {
  width: '100%',
  background: '#C9A96E',
  color: '#0A0A0B',
  border: 'none',
  borderRadius: 50,
  padding: '16px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: 12,
  fontFamily: font,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}

const BTN2: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  color: '#6B6570',
  border: '1px solid rgba(201,169,110,0.15)',
  borderRadius: 50,
  padding: '14px',
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: font,
}

export default function App() {
  const [page, setPage] = useState<Page>('accueil')
  const [profil, setProfil] = useState<Profil>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dashboard, setDashboard] = useState<Profil>(null)

  async function inscrire() {
    if (!profil) return setMessage('Choisissez un profil')
    if (!prenom || !nom || !email || !password) return setMessage('Remplissez tous les champs')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { role: profil, prenom, nom, telephone } }
    })
    setLoading(false)
    if (error) return setMessage(error.message)
    setMessage('Compte créé avec succès')
    setPage('connexion')
  }

  async function connecter() {
    if (!email || !password) return setMessage('Remplissez email et mot de passe')
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) return setMessage(error.message)
    const role = data.user?.user_metadata?.role
    setDashboard(role)
  }

  if (dashboard === 'proprietaire') return <Dashboard />
  if (dashboard === 'conciergerie') return <DashboardConciergerie />

  if (page === 'accueil') return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -60%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center', position: 'relative' }}>

        <h1 style={{ fontFamily: serif, fontSize: 108, color: '#F5F0E8', marginBottom: 0, fontWeight: 600, lineHeight: 0.9, letterSpacing: -2 }}>
          Ke<em style={{ color: or, fontStyle: 'italic' }}>ïa</em>
        </h1>

        <p style={{ color: '#6B6570', fontSize: 11, marginBottom: 48, fontFamily: font, letterSpacing: 3, textTransform: 'uppercase' as const, fontWeight: 400, marginTop: 16 }}>
          L'excellence en gestion locative
        </p>

        <p style={{ color: '#6B6570', marginBottom: 16, fontSize: 11, fontFamily: font, fontWeight: 500, letterSpacing: 3, textTransform: 'uppercase' as const }}>
          Je suis
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { id: 'proprietaire', icon: <Home size={24} />, label: 'Propriétaire', sub: 'Je loue des biens' },
            { id: 'conciergerie', icon: <Handshake size={24} />, label: 'Conciergerie', sub: 'Je gère des biens' },
          ].map(p => (
            <button key={p.id} onClick={() => setProfil(p.id as Profil)} style={{
              padding: '24px 16px',
              borderRadius: 20,
              border: profil === p.id ? `1px solid ${or}` : `1px solid ${border}`,
              background: profil === p.id ? 'rgba(201,169,110,0.08)' : '#16161A',
              cursor: 'pointer',
            }}>
              <div style={{ color: profil === p.id ? or : '#6B6570', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: profil === p.id ? '#F5F0E8' : '#6B6570', fontFamily: font, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 11, color: '#6B6570', fontFamily: font }}>{p.sub}</div>
            </button>
          ))}
        </div>

        <button onClick={() => { if (!profil) return setMessage('Choisissez un profil'); setMessage(''); setPage('inscription') }} style={BTN1}>
          Créer mon compte <ArrowRight size={16} />
        </button>
        <button onClick={() => { setMessage(''); setPage('connexion') }} style={BTN2}>
          J'ai déjà un compte
        </button>
        {message && <p style={{ color: or, marginTop: 16, fontSize: 13, fontFamily: font }}>{message}</p>}
      </div>
    </div>
  )

  if (page === 'inscription') return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#6B6570', cursor: 'pointer', marginBottom: 28, fontSize: 14, fontFamily: font, display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Retour
        </button>
        <h2 style={{ fontFamily: serif, fontSize: 48, color: '#F5F0E8', marginBottom: 6, fontWeight: 600, letterSpacing: -1 }}>Créer mon compte</h2>
        <p style={{ color: '#6B6570', marginBottom: 32, fontSize: 14, fontFamily: font }}>
          Profil : <strong style={{ color: or }}>{profil === 'proprietaire' ? 'Propriétaire' : 'Conciergerie'}</strong>
        </p>
        <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" style={INPUT} />
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" style={INPUT} />
        <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Téléphone" style={INPUT} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type={showPassword ? 'text' : 'password'}
            style={{ ...INPUT, marginBottom: 0, paddingRight: 48 }} />
          <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B6570' }}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button onClick={inscrire} disabled={loading} style={{ ...BTN1, marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Création...' : <><span>Créer mon compte</span><ArrowRight size={16} /></>}
        </button>
        {message && <p style={{ color: '#7A9E7E', marginTop: 16, fontSize: 13, fontFamily: font }}>{message}</p>}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#6B6570', cursor: 'pointer', marginBottom: 28, fontSize: 14, fontFamily: font }}>
          ← Retour
        </button>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: serif, fontSize: 80, color: '#F5F0E8', marginBottom: 8, fontWeight: 600, letterSpacing: -2 }}>
            Ke<em style={{ color: or, fontStyle: 'italic' }}>ïa</em>
          </h2>
          <p style={{ color: '#6B6570', fontSize: 11, fontFamily: font, letterSpacing: 3, textTransform: 'uppercase' as const }}>Bon retour</p>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type={showPassword ? 'text' : 'password'}
            style={{ ...INPUT, marginBottom: 0, paddingRight: 48 }} />
          <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B6570' }}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button onClick={connecter} disabled={loading} style={{ ...BTN1, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Connexion...' : <><span>Se connecter</span><ArrowRight size={16} /></>}
        </button>
        <button onClick={() => setPage('inscription')} style={BTN2}>Créer un compte</button>
        {message && <p style={{ color: or, marginTop: 16, fontSize: 13, textAlign: 'center', fontFamily: font }}>{message}</p>}
      </div>
    </div>
  )
}
