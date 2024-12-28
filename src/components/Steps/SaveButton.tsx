import { FC } from 'react';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

interface SaveButtonProps {
  isMobile: boolean;
  isSaving: boolean;
  onClick: () => void;
}

const SaveButton: FC<SaveButtonProps> = ({ isMobile, isSaving, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: isMobile ? 80 : 20,
        right: 'calc(50% - 12px)',
        zIndex: 1000,
        textTransform: 'none',
        borderRadius: '50%',
        padding: '16px',
        width: '56px',
        height: '56px',
        minWidth: 'unset',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSaving ? 'gray' : 'rgba(43, 200, 68, 1)',
        '&:hover': {
          backgroundColor: isSaving ? 'gray' : 'rgba(43, 42, 68, 0.9)',
        },
      }}
      onClick={onClick}
      disabled={isSaving}
    >
      {isSaving ? '...' : <DescriptionIcon sx={{ color: 'white' }} />}
    </Button>
  );
};

export default SaveButton;
