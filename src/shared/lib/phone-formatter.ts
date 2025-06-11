export const formatPhoneNumber = (value: string): string => {
  // 숫자만 추출
  let cleaned = value.replace(/\D/g, "");

  // 최대 8자리로 제한 (1234-5678)
  if (cleaned.length > 8) {
    cleaned = cleaned.slice(0, 8);
  }

  // 4자리 이상이면 하이픈 추가
  if (cleaned.length > 4) {
    return cleaned.slice(0, 4) + "-" + cleaned.slice(4);
  }

  return cleaned;
};

export const addPhonePrefix = (phoneNumber: string): string => {
  return phoneNumber ? `010-${phoneNumber}` : "";
};
