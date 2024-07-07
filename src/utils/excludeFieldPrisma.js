export const excludeFieldPrisma = (user, keys) => {
  if (user?.id) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
  } else {
    return user?.map((item) => {
      return Object.fromEntries(Object.entries(item).filter(([key]) => !keys.includes(key)));
    });
  }
};
