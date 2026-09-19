export const getErrorMessage = (
  error,
  fallback = "Something went wrong"
) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    (Array.isArray(error?.response?.data?.errors)
      ? error.response.data.errors.join(", ")
      : error?.response?.data?.errors) ||
    error?.message ||
    fallback
  );
};