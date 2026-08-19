import { describe, it, expect } from 'vitest';
import { getMonthMatrix, isSameDay } from './dateHelpers';

describe('getMonthMatrix', () => {
  it('retourne un multiple de 7 cases', () => {
    const cells = getMonthMatrix(2026, 7); // août 2026
    expect(cells.length % 7).toBe(0);
  });

  it('contient le bon nombre de jours pour août (31 jours)', () => {
    const cells = getMonthMatrix(2026, 7);
    const realDays = cells.filter((c) => c !== null);
    expect(realDays.length).toBe(31);
  });
});

describe('isSameDay', () => {
  it('reconnaît deux dates identiques', () => {
    const a = new Date(2026, 7, 19);
    const b = new Date(2026, 7, 19, 15, 30); // même jour, heure différente
    expect(isSameDay(a, b)).toBe(true);
  });

  it('distingue deux jours différents', () => {
    const a = new Date(2026, 7, 19);
    const b = new Date(2026, 7, 20);
    expect(isSameDay(a, b)).toBe(false);
  });
});