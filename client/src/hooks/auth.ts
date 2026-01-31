export const getOrUserId = (): string => {
  const STORAGE_KEY = "f2fit_user_id";
  let userId = localStorage.getItem(STORAGE_KEY);

  if (!userId) {
    userId = `user_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, userId);
  }

  return userId;
};
