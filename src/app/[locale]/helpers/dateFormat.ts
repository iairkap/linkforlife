export const dateFormat = (date: Date) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("he-IL", options);
};

export const countDownDays = (date: Date) => {
  const weddingDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = weddingDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
