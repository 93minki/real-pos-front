export const formatPhoneNumber = (value: string): string => {
  let cleaned = value.replace(/\D/g, "");

  if (cleaned.length > 8) {
    cleaned = cleaned.slice(0, 8);
  }

  if (cleaned.length > 4) {
    return cleaned.slice(0, 4) + "-" + cleaned.slice(4);
  }

  return cleaned;
};

export const addPhonePrefix = (phoneNumber: string): string => {
  return phoneNumber ? `010-${phoneNumber}` : "";
};
