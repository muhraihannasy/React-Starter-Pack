function formatDate(date: string) {
  const customDate = new Date(date);

  const month_list: any = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'Mei',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Des'
  };

  const year = customDate.getFullYear();
  const month = customDate.getMonth() + 1;
  const day = customDate.getDate();
  const hours = customDate.getHours();
  const minutes = customDate.getMinutes();

  const formattedDate = `${day.toString().padStart(2, '0')} ${
    month_list[month - 1]
  } ${year} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
}

export default formatDate;
