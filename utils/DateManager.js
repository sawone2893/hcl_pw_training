export function getMonthIndex(monthName) {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
 
  return months.indexOf(monthName.toLowerCase())+1;
}

export function getCurrentMonthIndex(){
  return new Date().getMonth() + 1;
}