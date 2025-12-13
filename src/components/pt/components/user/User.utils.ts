export const getAge = (birthday: string) => {
  const birthdayDate = new Date(Number(birthday));
  const today = new Date();
  let age = today.getFullYear() - birthdayDate.getFullYear();

  const hasBirthdayPassedThisYear =
    today.getMonth() > birthdayDate.getMonth() ||
    (today.getMonth() === birthdayDate.getMonth() &&
      today.getDate() >= birthdayDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
};
