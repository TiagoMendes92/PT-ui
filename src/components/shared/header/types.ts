export type HeaderLink = {
  section: string;
  links: HeaderSubLink[];
};
export type HeaderSubLink = {
  label: string;
  path: string;
};

export type HeaderProps = {
  links: HeaderLink[];
};
