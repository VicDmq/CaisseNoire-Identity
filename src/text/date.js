export const formatDate = (custom_date: CustomDate) => {
  const date: Date = new Date(custom_date);

  return Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(date);
};
