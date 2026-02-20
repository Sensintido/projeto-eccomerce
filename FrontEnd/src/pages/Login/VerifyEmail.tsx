import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './VerifyEmail.css';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

type Status = 'loading' | 'success' | 'error';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      return;
    }

    fetch(`${API_URL}/api/auth/verificar-email?token=${token}`)
      .then(res => {
        if (res.ok) setStatus('success');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="verify-container">
      <div className="verify-box">
        {status === 'loading' && (
          <>
            <div className="verify-spinner" />
            <p>Verificando seu e-mail...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="verify-icon success">✓</div>
            <h2>E-mail verificado!</h2>
            <p>Sua conta foi ativada com sucesso. Agora você pode fazer login.</p>
            <button onClick={() => navigate('/login')}>IR PARA O LOGIN</button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="verify-icon error">✕</div>
            <h2>Link inválido ou expirado</h2>
            <p>O link de verificação não é mais válido. Tente se cadastrar novamente.</p>
            <button onClick={() => navigate('/login')}>VOLTAR</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;