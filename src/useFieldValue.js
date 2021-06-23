const useFieldValue = (fieldValue, chunk) => {
  const content = chunk.content.find(
    (field) => field.custom_field_name == fieldValue
  );
  return content;
};
