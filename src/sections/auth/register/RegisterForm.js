import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  MenuItem,
  Typography,
  Link
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import Iconify from "../../../components/Iconify";
import {
  FormProvider,
  RHFSelect,
  RHFTextField
} from "../../../components/hook-form";
import { useSnackbar } from "notistack";
import { BACKEND_URL } from "@/config";
import NextLink from "next/link";
import { PATH_AUTH } from "@/routes/paths";

// ----------------------------------------------------------------------
const category = ["User", "Teacher", "Parent", "Student"];

export default function RegisterForm() {
  // const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter(); // Initialize router

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required("First name required"),
    last_name: Yup.string().required("Last name required"),
    // category: Yup.string().required("Catgory name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    password_confirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
  });

  const defaultValues = {
    first_name: "",
    last_name: "",
    // category: '',
    email: "",
    password: "",
    password_confirm: ""
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = methods;

  const onSubmit = async (data) => {
    try {
      // Prepare the payload
      const payload = {
        name: `${data.first_name} ${data.last_name}`, // Combine first and last name
        email: data.email,
        password: data.password
      };

      // Send request to API
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/auth/register`,
        payload
      );

      // Show success message
      enqueueSnackbar(response.data.message, { variant: "success" });

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error);
      enqueueSnackbar(error.response?.data?.message || "Registration failed!", {
        variant: "error"
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField
            name="first_name"
            label="First name"
            error={!!errors.first_name}
            helperText={errors.first_name?.message}
          />
          <RHFTextField
            name="last_name"
            label="Last name"
            error={!!errors.last_name}
            helperText={errors.last_name?.message}
          />
        </Stack>

        <RHFTextField
          name="email"
          label="Email address"
          placeholder="mc@school.com"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <RHFTextField
          name="password_confirm"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.password_confirm}
          helperText={errors.password_confirm?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <NextLink
            href={PATH_AUTH.login}
            passhref="true"
            underline="none"
            style={{ textDecoration: "none" }}
          >
            <Link
              variant="subtitle2"
              underline="none"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </NextLink>
        </Typography>
      </Stack>
    </FormProvider>
  );
}
