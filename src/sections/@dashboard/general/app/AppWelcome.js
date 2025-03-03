import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.contrastText,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h3">
          Welcome back,👋🏾
          <br /> {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {`Access your tools and insights to manage and oversee activities efficiently. Let's make today productive!.`}
        </Typography>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}
