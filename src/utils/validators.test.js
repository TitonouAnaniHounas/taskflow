import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPassword } from './validators';

describe('isValidEmail', () => {
  it('accepte un email valide', () => {
    expect(isValidEmail('test@exemple.com')).toBe(true);
  });

  it('rejette un email sans @', () => {
    expect(isValidEmail('testexemple.com')).toBe(false);
  });

  it('rejette une chaîne vide', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('accepte 6 caractères ou plus', () => {
    expect(isValidPassword('123456')).toBe(true);
  });

  it('rejette moins de 6 caractères', () => {
    expect(isValidPassword('123')).toBe(false);
  });
});