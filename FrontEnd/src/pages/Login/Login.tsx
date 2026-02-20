import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface CustomAlertProps {
  message: string;
  type: 'success' | 'warning' | 'error';
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, onClose }) => {
  const icons = {
    success: '✓',
    warning: '⚠',
    error: '✕'
  };

  return (
    <div className="custom-alert-overlay" onClick={onClose}>
      <div className="custom-alert-box" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-icon ${type}`}>
          {icons[type]}
        </div>
        <p className="custom-alert-message">{message}</p>
        <button className="custom-alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    password: ''
  });

  const showAlert = (message: string, type: 'success' | 'warning' | 'error') => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarCPF = (cpf: string): boolean => {
    const cpfNumeros = cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpfNumeros)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfNumeros.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfNumeros.charAt(10))) return false;

    return true;
  };

  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      setFormData({ ...formData, cpf: value });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      setFormData({ ...formData, phone: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      showAlert("Por favor, preencha o campo de e-mail.", "warning");
      return;
    }

    if (!validarEmail(formData.email)) {
      showAlert("E-mail inválido! Certifique-se de incluir '@' e um domínio válido.", "warning");
      return;
    }

    if (!formData.password) {
      showAlert("Por favor, digite uma senha.", "warning");
      return;
    }

    if (formData.password.length < 6) {
      showAlert("A senha deve ter pelo menos 6 caracteres.", "warning");
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        showAlert("Por favor, preencha seu nome completo.", "warning");
        return;
      }

      if (!formData.cpf) {
        showAlert("Por favor, preencha o CPF.", "warning");
        return;
      }

      if (!validarCPF(formData.cpf)) {
        showAlert("CPF inválido! Verifique os números digitados.", "warning");
        return;
      }
    }

    const endpoint = isLogin ? '/usuarios/login' : '/usuarios';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        if (isLogin) {
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));
          showAlert("Bem-vindo de volta!", "success");
          setTimeout(() => {
            navigate('/');
            window.location.reload();
          }, 1500);
        } else {
          // Cadastro realizado — aguardando verificação de email
          showAlert("Cadastro realizado! Verifique seu e-mail para ativar a conta.", "success");
          setTimeout(() => {
            setIsLogin(true);
            setFormData({ name: '', email: '', cpf: '', phone: '', password: '' });
          }, 2500);
        }
      } else {
        const errorData = await response.json();

        if (response.status === 403) {
          showAlert("Conta não verificada. Verifique seu e-mail antes de entrar.", "warning");
        } else if (response.status === 409) {
          if (errorData.message?.includes('CPF')) {
            showAlert("Este CPF já está cadastrado no sistema.", "error");
          } else if (errorData.message?.includes('e-mail')) {
            showAlert("Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.", "error");
          } else {
            showAlert("Dados já cadastrados no sistema.", "error");
          }
        } else if (response.status === 401) {
          showAlert("E-mail ou senha incorretos. Tente novamente.", "error");
        } else {
          showAlert("Erro ao processar sua solicitação. Tente novamente.", "error");
        }
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      showAlert("Não foi possível conectar ao servidor. Verifique sua conexão.", "error");
    }
  };

  return (
    <>
      {alert && <CustomAlert message={alert.message} type={alert.type} onClose={closeAlert} />}

      <div className="login-container">
        <div className="login-box">
          <button className="fechar-login" onClick={() => navigate('/')}>×</button>

          <div className="login-tabs">
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>ENTRAR</button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>CADASTRAR</button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <h2>{isLogin ? 'Identificação' : 'Crie sua conta'}</h2>

            <div className="input-group">
              <label>E-mail</label>
              <input
                name="email"
                type="text"
                placeholder="Seu e-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <>
                <div className="input-group">
                  <label>Nome Completo</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Como no RG"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <label>CPF</label>
                  <input
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleCpfChange}
                    maxLength={14}
                  />
                </div>
                <div className="input-group">
                  <label>Telefone (Opcional)</label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={15}
                  />
                </div>
              </>
            )}

            <div className="input-group">
              <label>Senha</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-auth">
              {isLogin ? 'LOGAR' : 'CRIAR CONTA'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;