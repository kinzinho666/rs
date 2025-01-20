export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function calculateAge(date: Date): number {
  const diff = Date.now() - date.getTime();
  const ageDt = new Date(diff); 
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}