export const phoneMask = (value?: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  if (value.length > 11) {
    value = value.slice(0, 11);
  }
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
};

export const cepMask = (value?: string) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  if (value.length > 8) {
    value = value.slice(0, 8);
  }
  value = value.replace(/(\d{5})(\d{3})/, "$1-$2");
  return value;
};

export function socialMediaMask(value: string) {
  if (!value) return "";

  if (value.startsWith("@")) {
    return value;
  }

  return `@${value}`;
}

export function unmaskPhone(value: string) {
  return value.replace(/\D/g, "");
}

export function unmaskSocialMedia(value: string) {
  return value.replace(/@/g, "");
}
