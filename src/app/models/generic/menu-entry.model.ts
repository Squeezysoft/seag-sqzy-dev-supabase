export interface MenuEntry<T> {
  id: number;
  icon: string;
  isSvg?: boolean;
  text: string;
  value: T;
}
