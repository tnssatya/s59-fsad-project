export function required(value, label) {
  if (!value || String(value).trim() === "") {
    return `${label} is required.`;
  }
  return "";
}

export function emailValid(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    return "Enter a valid email address.";
  }
  return "";
}

export function minLength(value, size, label) {
  if (String(value || "").length < size) {
    return `${label} must be at least ${size} characters.`;
  }
  return "";
}
