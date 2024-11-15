import { useEffect, useState } from 'react';
// @mui
import { Dialog, DialogTitle, Divider, IconButton, Step, StepLabel, Stepper } from '@mui/material';
import { Close } from '@mui/icons-material';
// hooks
import useResponsive from '@/hooks/useResponsive';
// steps
import ChangeEmailStep1 from './changeEmail/ChangeEmailStep1';
import ChangeEmailStep2 from './changeEmail/ChangeEmailStep2';
import ChangeEmailStep3 from './changeEmail/ChangeEmailStep3';

// ----------------------------------------------------------------------

const steps = [{ label: 'انتخاب ایمیل جدید' }, { label: 'تایید ایمیل' }, { label: 'پایان' }];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  handleClose: VoidFunction;
};

export default function ChangeEmailDialog({ handleClose, open }: Props) {
  //

  const isMobile = useResponsive('down', 'sm');

  const [emailActiveStep, setEmailActiveStep] = useState(1);

  useEffect(
    () => () => {
      setEmailActiveStep(0);
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
      <DialogTitle>تغییر ایمیل</DialogTitle>

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

      <Stepper activeStep={emailActiveStep} alternativeLabel>
        {steps.map((s) => (
          <Step key={s.label}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {emailActiveStep === 0 && (
        <ChangeEmailStep1
          handleClose={handleClose}
          setActiveStep={setEmailActiveStep}
          activeSteps={emailActiveStep}
        />
      )}
      {emailActiveStep === 1 && (
        <ChangeEmailStep2 setActiveStep={setEmailActiveStep} activeSteps={emailActiveStep} />
      )}
      {emailActiveStep === 2 && <ChangeEmailStep3 handleClose={handleClose} />}
    </Dialog>
  );
}
