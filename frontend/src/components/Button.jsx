import UIButton from "./ui/Button";

function Button({ children, variant = "primary", type = "button", ...props }) {
  return (
    <UIButton variant={variant} type={type} {...props}>
      {children}
    </UIButton>
  );
}

export default Button;
