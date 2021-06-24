export const getFieldValue = (fieldValue, chunk) => {
  console.log("          ", chunk);
  const obj = chunk.content.find(
    (field) => field.custom_field_name == fieldValue
  );
  return obj.content;
};
