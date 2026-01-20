export function getFullMonthIndex(monthName) {
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  return months.indexOf(monthName.toLowerCase()) + 1;
}

export function getShortMonthIndex(monthName) {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sept",
    "oct",
    "nov",
    "dec",
  ];

  return months.indexOf(monthName.toLowerCase()) + 1;
}

export function getCurrentMonthIndex() {
  return new Date().getMonth() + 1;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
