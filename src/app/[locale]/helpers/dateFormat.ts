export const dateFormat = (date: Date, extraction: string | undefined) => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  let locale;
  switch (extraction) {
    case "he":
      locale = "he-IL";
      break;
    case "es":
      locale = "es-ES";
      break;
    case "en":
    default:
      locale = "en-US";
      break;
  }

  return dateObj.toLocaleDateString(locale, options);
};

export const countDownDays = (date: Date) => {
  const weddingDate = new Date(date);
  const currentDate = new Date();
  const timeDiff = weddingDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};
