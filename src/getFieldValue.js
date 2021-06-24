export const getFieldValue = (fieldValue, chunk) => {
  if (chunk && chunk.content) {
    const obj = chunk.content.find(
      (field) => field.custom_field_name == fieldValue
    );
    return obj.content ? obj.content : "";
  } else return "";
};
