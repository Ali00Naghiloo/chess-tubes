import { useEffect, useState } from 'react';
// @mui
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  LinearProgress,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  styled,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
// icons
import { ChessNewsletter } from '@/assets/icons';
//
import { RULES } from '@/_mock/assets/rules';
import { enNumToPer } from '@/utils/persianUtils';
import { useDispatch, useSelector } from '@/redux/store';
import getRules from '@/modules/rules/redux/operators/getRules';

// ----------------------------------------------------------------------

export default function RulesAccordion() {
  //

  const [panel, setPanel] = useState('');

  const handleChangePanel =
    (panelName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setPanel(isExpanded ? panelName : '');
    };

  const dispatch = useDispatch();

  const rulesData = useSelector((s) => s.rules);

  useEffect(() => {
    dispatch(getRules());
  }, [dispatch]);

  return (
    <Box position="relative" sx={{ mt: 9 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
        <ChessNewsletter sx={{ width: 40, height: 40 }} />
        <Typography fontWeight={600} variant="h6">
          قوانین سایت چس تیوبز شامل ۱۲ ماده و هر ماده از چند تبصره به شرح ذیل تشکیل می گردد :
        </Typography>
      </Stack>

      {!rulesData.length && (
        <Container>
          <Stack justifyContent="center" sx={{ height: 300 }}>
            <LinearProgress />
          </Stack>
        </Container>
      )}

      {rulesData?.map((ac, index) => (
        <Accordion
          variant="outlined"
          key={ac?.title}
          expanded={panel === `panel${index}`}
          onChange={handleChangePanel(`panel${index}`)}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight={600}>
              {`ماده ${enNumToPer(index + 1)} : `}
              {ac?.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stepper
              orientation="vertical"
              sx={{
                '.MuiStepConnector-line': {
                  borderColor: (theme) => theme.palette.primary.main,
                  borderLeftStyle: 'dashed',
                },
              }}
            >
              <Step expanded active>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography fontWeight={500}>{ac?.content}</Typography>
                </StepLabel>
              </Step>
            </Stepper>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    display: 'flex',
    height: 22,
    alignItems: 'center',
    color: theme.palette.primary.main,
    '& .QontoStepIcon-completedIcon': {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

// ----------------------------------------------------------------------

function QontoStepIcon(props: StepIconProps) {
  const { active, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      <div className="QontoStepIcon-circle" />
    </QontoStepIconRoot>
  );
}
