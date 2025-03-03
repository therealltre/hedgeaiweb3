import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useRouter } from "next/router";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function NewPasswordForm() {
  const router = useRouter(); // <-- Initialize the router
  const [loading, setLoading] = useState(false);

  console.log("router.query.token >>", router.query.token);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const resetToken = router.query.token;
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetToken, newPassword: data.password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to reset password");
      }

      const result = await response.json();
      console.log(result.message);
      router.push("/auth/reset-password/success");
    } catch (error) {
      console.error("Error resetting password:", error.message);
      // Optionally display an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Set a new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          sx={{ my: 2 }}
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          sx={{ my: 2 }}
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </Box>
  );
}
