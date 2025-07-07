import * as React from 'react';

import { usePrintStore } from '@/store/usePrintStore';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Confetti from '../confetti';

type CompletedDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleStartNew: () => void;
};

export default function CompletedDialog({ open, handleClose, handleStartNew }: CompletedDialogProps) {
    const { reactToPrintFn, setScale } = usePrintStore();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDownload = () => {
        setScale(1);
        setTimeout(() => {
            reactToPrintFn?.();
        }, 150);

        handleClose();
    };

    return (
        <React.Fragment>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
                <Box className='flex flex-col items-center py-8'>
                    <DialogTitle id='responsive-dialog-title'>{'Congratulations 🥳'}</DialogTitle>
                    <DialogContent className='mb-12 text-center'>
                        <DialogContentText>
                            You&apos;ve successfully completed your resume. Now, you can download it for free or start a
                            new one. Take your career to the next level with a well-crafted resume! 🚀
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='absolute bottom-4'>
                        <Button onClick={handleStartNew}>Start new</Button>
                        <Button autoFocus variant='contained' color='primary' onClick={() => handleDownload?.()}>
                            Download
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            {open && <Confetti duration={50000} />}
        </React.Fragment>
    );
}
