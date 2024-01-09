import { useTsController } from "@ts-react/form";
import { Form } from "react-bootstrap";

export default function AmountField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<string>();

  return (
    <>
      <Form.Label>Amount</Form.Label>
      <Form.Control id='address' type="text" 
        onChange={(e) => onChange(e.target.value)}
        value={value ? value : ""} 
      />
      {error && error.errorMessage}
    </>
  );
}