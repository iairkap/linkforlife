export const dateFormat = (date: string) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("he-IL", options);
};

export const countDownDays = (date: string) => {
  const weddingDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = weddingDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
