import { useState } from 'react'
import { supabase } from './supabase'
import Dashboard from './Dashboard'
import DashboardConciergerie from './DashboardConciergerie'
import { Home, Handshake, Key, ArrowRight, Eye, EyeOff } from 'lucide-react'

type Page = 'accueil' | 'inscription' | 'connexion'
type Profil = 'proprietaire' | 'conciergerie' | null

const INPUT: React.CSSProperties = {
  width: '100%',
  background: '#2C2218',
  border: '1px solid #3E3028',
  borderRadius: 12,
  padding: '14px 16px',
  color: 'white',
  fontSize: 14,
  marginBottom: 12,
  boxSizing: 'border-box',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}

const BTN1: React.CSSProperties = {
  width: '100%',
  background: '#C4714A',
  color: 'white',
  border: 'none',
  borderRadius: 50,
  padding: '16px',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  marginBottom: 12,
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
}

const BTN2: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  color: '#8C7E72',
  border: '1px solid #3E3028',
  borderRadius: 50,
  padding: '14px',
  fontSize: 14,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
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
      email,
      password,
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
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>

        <div style={{ width: 72, height: 72, background: '#C4714A', borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Key size={32} color="white" />
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 52, color: 'white', marginBottom: 20, fontWeight: 700, lineHeight: 1.1 }}>
          Concier<em style={{ color: '#D4876A' }}>gea</em>
        </h1>

        <p style={{ color: '#6B6059', fontSize: 11, marginBottom: 48, fontFamily: 'Inter, sans-serif', letterSpacing: 3, textTransform: 'uppercase' as const, fontWeight: 500 }}>
          Digitalisez votre gestion locative
        </p>

        <p style={{ color: '#B8ACA2', marginBottom: 16, fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' as const }}>
          Je suis
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { id: 'proprietaire', icon: <Home size={26} />, label: 'Propriétaire', sub: 'Je loue des biens' },
            { id: 'conciergerie', icon: <Handshake size={26} />, label: 'Conciergerie', sub: 'Je gère des biens' },
          ].map(p => (
            <button key={p.id} onClick={() => setProfil(p.id as Profil)} style={{
              padding: '22px 16px',
              borderRadius: 18,
              border: profil === p.id ? '2px solid #C4714A' : '2px solid #3E3028',
              background: profil === p.id ? '#FBF0EA' : '#2C2218',
              cursor: 'pointer',
            }}>
              <div style={{ color: profil === p.id ? '#C4714A' : '#6B6059', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: profil === p.id ? '#C4714A' : 'white', fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: '#6B6059', fontFamily: 'Inter, sans-serif' }}>{p.sub}</div>
            </button>
          ))}
        </div>

        <button onClick={() => { if (!profil) return setMessage('Choisissez un profil'); setMessage(''); setPage('inscription') }} style={BTN1}>
          Créer mon compte <ArrowRight size={16} />
        </button>
        <button onClick={() => { setMessage(''); setPage('connexion') }} style={BTN2}>
          J'ai déjà un compte
        </button>
        {message && <p style={{ color: '#C4714A', marginTop: 16, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{message}</p>}
      </div>
    </div>
  )

  if (page === 'inscription') return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#8C7E72', cursor: 'pointer', marginBottom: 28, fontSize: 14, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Retour
        </button>
        <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 34, color: 'white', marginBottom: 6, fontWeight: 700 }}>Créer mon compte</h2>
        <p style={{ color: '#8C7E72', marginBottom: 32, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          Profil : <strong style={{ color: '#C4714A' }}>{profil === 'proprietaire' ? 'Propriétaire' : 'Conciergerie'}</strong>
        </p>
        <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" style={INPUT} />
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" style={INPUT} />
        <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Téléphone" style={INPUT} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type={showPassword ? 'text' : 'password'}
            style={{ ...INPUT, marginBottom: 0, paddingRight: 48 }} />
          <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8C7E72' }}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button onClick={inscrire} disabled={loading} style={{ ...BTN1, marginTop: 8, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Création...' : <><span>Créer mon compte</span><ArrowRight size={16} /></>}
        </button>
        {message && <p style={{ color: '#4A7C59', marginTop: 16, fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{message}</p>}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#8C7E72', cursor: 'pointer', marginBottom: 28, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
          ← Retour
        </button>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 60, height: 60, background: '#C4714A', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <Key size={28} color="white" />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: 34, color: 'white', marginBottom: 8, fontWeight: 700 }}>Connexion</h2>
          <p style={{ color: '#6B6059', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Bon retour sur Conciergea</p>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type={showPassword ? 'text' : 'password'}
            style={{ ...INPUT, marginBottom: 0, paddingRight: 48 }} />
          <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8C7E72' }}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <button onClick={connecter} disabled={loading} style={{ ...BTN1, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Connexion...' : <><span>Se connecter</span><ArrowRight size={16} /></>}
        </button>
        <button onClick={() => setPage('inscription')} style={BTN2}>Créer un compte</button>
        {message && <p style={{ color: '#C4714A', marginTop: 16, fontSize: 13, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>{message}</p>}
      </div>
    </div>
  )
}
