export function getStorage(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch {
    return fallbackValue;
  }
}

export function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

export function findUserById(users, userId) {
  return users.find((user) => user.id === userId);
}

export function calculateProjectProgress(project) {
  if (!project?.tasks?.length) return 0;
  const completed = project.tasks.filter((task) => task.status === 'Done').length;
  return Math.round((completed / project.tasks.length) * 100);
}

export function statusToBadgeVariant(status = '') {
  const value = status.toLowerCase();
  if (value.includes('approved') || value.includes('completed') || value.includes('done')) return 'success';
  if (value.includes('review') || value.includes('progress') || value.includes('active')) return 'info';
  if (value.includes('pending') || value.includes('not')) return 'warning';
  if (value.includes('required') || value.includes('rejected')) return 'danger';
  return 'default';
}
