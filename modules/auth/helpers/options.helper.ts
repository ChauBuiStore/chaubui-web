export interface GenderOption {
  value: string;
  label: string;
  id: string;
}

export function getGenderOptions(
  femaleLabel: string,
  maleLabel: string
): GenderOption[] {
  return [
    { value: "female", label: femaleLabel, id: "female" },
    { value: "male", label: maleLabel, id: "male" },
  ];
}

