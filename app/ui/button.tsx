'use client'
import clsx from 'clsx';
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// export function Button({ children, className, ...rest }: ButtonProps) {
//   return (
//     <button
//       {...rest}
//       className={clsx(
//         'flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
//         className,
//       )}
//     >
//       {children}
//     </button>
//   );
// }

export function BuyButton({ price }: { price: number }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button color='primary' isDisabled>
          <Spinner color="white" />
          Please Wait
        </Button>
      ) : (
        <Button color="primary" type="submit">
          Buy Now ${price}
        </Button>
      )}
    </>
  );
}
