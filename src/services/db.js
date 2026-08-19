const DB_KEY = "taskflow_db";
const SESSION_KEY = "taskflow_session";

function readDB() {
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeDB(dbObject) {
  localStorage.setItem(DB_KEY, JSON.stringify(dbObject));
}

function getUser(email) {
  const database = readDB();
  return database[email] || null;
}

function createUser({ email, password, firstName, lastName }) {
  const database = readDB();
  if (database[email]) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  const newUser = {
    email,
    password,
    firstName,
    lastName,
    role: "Frontend Developer",
    bio: "",
    memberSince: new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
    tasks: [],
    projects: [],
    preferences: {
      notifications: { taskReminders: true, projectUpdates: true, teamActivity: false },
      language: "Français",
      timezone: "GMT+0 (Abidjan)",
      dateFormat: "JJ/MM/AAAA",
    },
  };

  database[email] = newUser;
  writeDB(database);
  return newUser;
}

function updateUser(email, changes) {
  const database = readDB();
  if (!database[email]) return null;
  database[email] = { ...database[email], ...changes };
  writeDB(database);
  return database[email];
}

function setSession(email) {
  localStorage.setItem(SESSION_KEY, email);
}

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export const db = { getUser, createUser, updateUser, setSession, getSession, clearSession };