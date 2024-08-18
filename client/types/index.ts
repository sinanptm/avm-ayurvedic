export interface SearchInputProps {
  placeHolder: string;
  name?: string;
  onChange?: () => void;
}

export type DoctorType = {
  _id: string;
  name: string;
  image: string;
};
