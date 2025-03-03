import PropTypes from "prop-types";
import { forwardRef } from "react";
import NextLink from "next/link";
// @mui
import { Box } from "@mui/material";
import Image from "next/image";

// ----------------------------------------------------------------------

const LogoImage = forwardRef(({ disabledLink = false, sx }, ref) => {
  const logoImg = (
    <Box ref={ref} sx={{ width: 50, height: 30, cursor: "pointer", ...sx }}>
      <NextLink href="/" passhref="true">
        {/* <a> */}
        <Image
          src="/logo/logo.png" // replace with your image path
          alt="Home"
          width={50} // specify width
          height={30} // specify height
          priority // ensures the image is loaded quickly
        />
        {/* </a> */}
      </NextLink>
    </Box>
  );

  if (disabledLink) {
    return <>{logoImg}</>;
  }

  return <NextLink href="/">{logoImg}</NextLink>;
});

LogoImage.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object
};

export default LogoImage;
