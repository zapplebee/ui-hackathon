type ValueStringObject = { value: string };

export function addStringToSetArray(
  newValue: string,
  existingValues: ValueStringObject[]
): ValueStringObject[] {
  if (newValue === "") {
    return existingValues;
  }

  const set = [
    ...new Set([
      ...(existingValues.length > 0
        ? existingValues.map(({ value }) => value)
        : []),
      newValue,
    ]),
  ];

  return set.map((value) => ({ value }));
}
