import { useState } from 'react'
import { supabase } from './supabase'
import Dashboard from './Dashboard'

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
}

const BTN1: React.CSSProperties = {
  width: '100%',
  background: '#C4714A',
  color: 'white',
  border: 'none',
  borderRadius: 50,
  padding: '16px',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  marginBottom: 12,
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
}

export default function App() {
  const [page, setPage] = useState<Page>('accueil')
  const [profil, setProfil] = useState<Profil>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    setMessage('Compte cree avec succes')
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

  if (dashboard === 'conciergerie') return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FDFAF4', borderRadius: 24, padding: 48, textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🤝</div>
        <h1 style={{ fontFamily: 'Georgia', fontSize: 28, color: '#1A1410', marginBottom: 8 }}>Dashboard Conciergerie</h1>
        <p style={{ color: '#8C7E72', marginBottom: 32 }}>Bienvenue sur Conciergea</p>
        <button onClick={async () => { await supabase.auth.signOut(); setDashboard(null) }} style={{ background: '#4A7C59', color: 'white', border: 'none', borderRadius: 50, padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
          Se deconnecter
        </button>
      </div>
    </div>
  )

  if (page === 'accueil') return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🗝️</div>
        <h1 style={{ fontFamily: 'Georgia', fontSize: 48, color: 'white', marginBottom: 8 }}>Conciergea</h1>
        <p style={{ color: '#8C7E72', fontSize: 16, marginBottom: 48 }}>Digitalisez votre gestion locative</p>
        <p style={{ color: '#B8ACA2', marginBottom: 20, fontSize: 14 }}>Je suis...</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {[
            { id: 'proprietaire', emoji: '🏠', label: 'Proprietaire', sub: 'Je loue des biens' },
            { id: 'conciergerie', emoji: '🤝', label: 'Conciergerie', sub: 'Je gere des biens' },
          ].map(p => (
            <button key={p.id} onClick={() => setProfil(p.id as Profil)} style={{
              padding: '20px 16px', borderRadius: 16,
              border: profil === p.id ? '2px solid #C4714A' : '2px solid #3E3028',
              background: profil === p.id ? '#FBF0EA' : '#2C2218', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: profil === p.id ? '#C4714A' : 'white' }}>{p.label}</div>
              <div style={{ fontSize: 12, color: '#8C7E72', marginTop: 4 }}>{p.sub}</div>
            </button>
          ))}
        </div>
        <button onClick={() => { if (!profil) return setMessage('Choisissez un profil'); setMessage(''); setPage('inscription') }} style={BTN1}>
          Creer mon compte
        </button>
        <button onClick={() => { setMessage(''); setPage('connexion') }} style={BTN2}>
          Deja un compte
        </button>
        {message && <p style={{ color: '#C4714A', marginTop: 16, fontSize: 13 }}>{message}</p>}
      </div>
    </div>
  )

  if (page === 'inscription') return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#8C7E72', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>Retour</button>
        <h2 style={{ fontFamily: 'Georgia', fontSize: 32, color: 'white', marginBottom: 4 }}>Creer mon compte</h2>
        <p style={{ color: '#8C7E72', marginBottom: 32, fontSize: 14 }}>
          Profil : <strong style={{ color: '#C4714A' }}>{profil === 'proprietaire' ? 'Proprietaire' : 'Conciergerie'}</strong>
        </p>
        <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prenom" style={INPUT} />
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" style={INPUT} />
        <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Telephone" style={INPUT} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" style={INPUT} />
        <button onClick={inscrire} disabled={loading} style={BTN1}>{loading ? 'Creation...' : 'Creer mon compte'}</button>
        {message && <p style={{ color: '#4A7C59', marginTop: 16, fontSize: 13 }}>{message}</p>}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#1A1410', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <button onClick={() => setPage('accueil')} style={{ background: 'none', border: 'none', color: '#8C7E72', cursor: 'pointer', marginBottom: 24, fontSize: 14 }}>Retour</button>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🗝️</div>
          <h2 style={{ fontFamily: 'Georgia', fontSize: 32, color: 'white', marginBottom: 4 }}>Connexion</h2>
          <p style={{ color: '#8C7E72', fontSize: 14 }}>Bon retour sur Conciergea</p>
        </div>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" style={INPUT} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" type="password" style={INPUT} />
        <button onClick={connecter} disabled={loading} style={BTN1}>{loading ? 'Connexion...' : 'Se connecter'}</button>
        <button onClick={() => setPage('inscription')} style={BTN2}>Creer un compte</button>
        {message && <p style={{ color: '#C4714A', marginTop: 16, fontSize: 13, textAlign: 'center' }}>{message}</p>}
      </div>
    </div>
  )
}
