// Import LightGallery and necessary components
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import LightGallery from 'lightgallery/react';
// LightGallery plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Typography, GlobalStyles } from '@mui/material';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

// ----------------------------------------------------------------------

function LightboxModalStyles() {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        '& .lg-outer': {
          backgroundColor: alpha(theme.palette.grey[900], 0.96),
        },
        '& .lg-toolbar': {
          height: 'auto',
          padding: theme.spacing(2, 3),
          backgroundColor: 'transparent',
        },
        '& .lg-actions .lg-next, & .lg-actions .lg-prev': {
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: alpha(theme.palette.grey[700], 0.72),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[700], 0.9),
          },
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

LightboxModal.propTypes = {
  images: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default function LightboxModal({ images, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <LightboxModalStyles />

      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={images.map((image) => ({ src: image.src, thumb: image.thumb }))}
        onCloseAfter={onClose}
      />
    </>
  );
}
