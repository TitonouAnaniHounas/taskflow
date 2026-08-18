export function getMonthMatrix(year, month) {
  // month: 0-indexé (0 = janvier)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Lundi = premier jour de semaine
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const cells = [];

  // Cases vides avant le 1er du mois
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  // Jours du mois
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  // Compléter jusqu'à un multiple de 7
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export function formatMonthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

export const weekDayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];