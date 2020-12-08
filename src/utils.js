//Maps dates to integers
export function mapDate(date) {
  var dateList = date.slice(0,10).split('-');
  return dateList[0] * 365 + dateList[1] * 30 + dateList[2];
}

export const isNumber = (rule, value) => {
  if(isNaN(value)) return Promise.reject();
  else return Promise.resolve();
}