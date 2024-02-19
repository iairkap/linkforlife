/* tengo que cambiar el formato de la fecha 

      ejemplo: updatedAt: '2024-02-18T01:45:35.239Z',
    
      Necesito que como resultado final se me renderice : hace 2 horas o hace 15 minutos, o hace 5 dias, o hace 4 meses dependiendo de la fecha que se le pase, por prop le va a llegar updatedAt, que es la fecha que se va a renderizar en el componente DashboardLastConfirmed.tsx
*/

export const timeToMinutes = (updatedAt: string, extraction: string) => {
  const date = new Date(updatedAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (minutes < 60) {
    if (minutes === 1) {
      return `hace ${minutes} minuto`;
    }
    return `hace ${minutes} minutos`;
  }
  if (hours < 24) {
    if (hours === 1) {
      return `hace ${hours} hora`;
    }
    return `hace ${hours} horas`;
  }
  if (days < 30) {
    if (days === 1) {
      return `hace ${days} dia`;
    }
    return `hace ${days} dias`;
  }
  if (months < 12) {
    if (months === 1) {
      return `hace ${months} mes`;
    }
    return `hace ${months} meses`;
  }
  if (years === 1) {
    return `hace ${years} año`;
  }
  return `hace ${years} años`;
};
