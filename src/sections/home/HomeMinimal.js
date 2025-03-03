import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Stack, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: '/logo/logo_single.svg',
    title: 'Student Information Management',
    description:
      'A system to store, manage, and update student records, including personal details, academic history, and enrollment information.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Staff Management',
    description:
      'A system to manage staff details, schedules, performance, and other HR-related activities, ensuring smooth operation of school administrative functions.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Parent Communication',
    description:
      'A module that enables effective communication between school staff and parents, including notifications, updates, and direct messaging.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Lesson Planning',
    description:
      'Tools to help teachers plan lessons and track student progress over time, facilitating tailored instruction and continuous assessment.',
  },
  {
    icon: '/logo/logo_single.svg',
    title: 'Attendance Tracking',
    description:
      'A feature that allows for the recording and monitoring of student attendance, ensuring accurate tracking of presence and absences.',
  },
];

const shadowIcon = (color) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 365,
    minHeight: 227,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(5, 5, 5),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'start',
            mb: { xs: 10, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
            Tre Boilerplate
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Stack direction={'row'} spacing={1}>
              <Typography variant="h2">Benefits of</Typography>
              <Typography
                variant="h2"
                sx={{
                  backgroundcolor: 'primary',
                  backgroundImage: `linear-gradient(45deg, #367BF5 , #132B56)`,
                  // backgroundImage: `linear-gradient(45deg, #1C252E , #D2D4D8)`,
                  backgroundSize: '100%',
                  backgroundRepeat: 'repeat',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
              Tre Boilerplate
              </Typography>
            </Stack>
          </m.div>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, lg: 5 },
            spacing: { xs: 2, lg: 2 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              {/* <CardStyle className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}> */}
              <CardStyle>
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 3,
                    // mx: 'auto',
                    width: 40,
                    height: 40,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main),
                    }),
                  }}
                />
                <Typography variant="h5" paragraph sx={{ textAlign: 'start' }}>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white', textAlign: 'start' }}>
                  {card.description}
                </Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
