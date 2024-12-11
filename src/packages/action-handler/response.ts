export const response = <T>(value: T, message?: string) => ({
  status: 200,
  message: message ?? "success",
  value,
});

export const emptyResponse = (message?: string) => ({
  status: 204,
  message: message ?? "success",
});
