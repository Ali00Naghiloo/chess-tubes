import { useEffect, useState } from 'react';
// @mui
import { Dialog, DialogTitle, Divider, IconButton, Step, StepLabel, Stepper } from '@mui/material';
import { Close } from '@mui/icons-material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// steps
import ChangePhoneStep1 from './changePhone/ChangePhoneStep1';
import ChangePhoneStep2 from './changePhone/ChangePhoneStep2';
import ChangePhoneStep3 from './changePhone/ChangePhoneStep3';

// ----------------------------------------------------------------------

const steps = [{ label: 'انتخاب شماره جدید' }, { label: 'تایید شماره همراه' }, { label: 'پایان' }];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ChangePhoneDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  const [activeStep, setActiveStep] = useState(0);

  useEffect(
    () => () => {
      setActiveStep(0);
    },
    [open]
  );

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      dir="rtl"
      fullScreen={isMobile}
    >
      <DialogTitle>تغییر شماره همراه</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <Divider sx={{ mb: 2 }} />

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((s) => (
          <Step key={s.label}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <ChangePhoneStep1 handleClose={handleClose} setActiveStep={setActiveStep} />
      )}
      {activeStep === 1 && (
        <ChangePhoneStep2 handleClose={handleClose} setActiveStep={setActiveStep} />
      )}
      {activeStep === 2 && <ChangePhoneStep3 handleClose={handleClose} />}
    </Dialog>
  );
}
