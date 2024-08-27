const dayList = {
  "0": "일",
  "1": "월",
  "2": "화",
  "3": "수",
  "4": "목",
  "5": "금",
  "6": "토",
};

export const parseDay = (day: string) => {
  return dayList[day as keyof typeof dayList];
};
