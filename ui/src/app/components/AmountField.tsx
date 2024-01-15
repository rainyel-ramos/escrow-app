import { useTsController } from "@ts-react/form";
import { Form } from "react-bootstrap";

export default function AmountField() {
  const {
    field: { onChange, value },
    error,
  } = useTsController<number>();

  return (
    <>
      <Form.Label>Amount</Form.Label>
      <Form.Control id='amount' type="number" 
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (isNaN(value)) onChange(undefined);
          else onChange(value);
        }}
        value={value ? value : ""} 
      />
      {error && error.errorMessage}
    </>
  );
}