import PropTypes from "prop-types";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
// import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const isMountedRef = useIsMountedRef();
  // const router = useRouter(); // <-- Initialize the router

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "eben.tre@outlook.com" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Call the backend endpoint for password reset request
      const res = await fetch(
        "http://localhost:5000/api/v1/auth/request-password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (!res.ok) {
        // Extract error message from the response
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      enqueueSnackbar("Reset Password Sent");
      const responseData = await res.json();

      // Optionally log or process the response
      console.info(responseData.message);

      // Only update state if the component is still mounted
      if (isMountedRef.current) {
        onSent();
        onGetEmail(data.email);
      }

      // Optionally, if you need to redirect the user, you can do:
      // router.push(`/auth/reset-password/${resetToken}`);
    } catch (error) {
      console.error("Reset password error:", error);
      // You might want to display an error notification here
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
