import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('affiche le texte du bouton', () => {
    render(<Button>Se connecter</Button>);
    expect(screen.getByText('Se connecter')).toBeInTheDocument();
  });

  it('affiche "Chargement..." quand loading est true', () => {
    render(<Button loading>Se connecter</Button>);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  it('appelle onClick au clic', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Cliquer</Button>);
    fireEvent.click(screen.getByText('Cliquer'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('est désactivé pendant le chargement', () => {
    render(<Button loading>Envoyer</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});