import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';

function renderLogin() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
}

describe('Login', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('affiche une erreur si email invalide', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('toi@exemple.com'), {
      target: { value: 'pas-un-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    await waitFor(() => {
      expect(screen.getByText('Adresse email invalide.')).toBeInTheDocument();
    });
  });

  it('affiche une erreur si mot de passe trop court', async () => {
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('toi@exemple.com'), {
      target: { value: 'test@exemple.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    await waitFor(() => {
      expect(screen.getByText('6 caractères minimum.')).toBeInTheDocument();
    });
  });
});