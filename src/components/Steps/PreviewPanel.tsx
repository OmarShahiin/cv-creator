import { FC } from 'react';
import { Stack, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
interface PreviewPanelProps {
  decodedHtml: string;
}

const PreviewPanel: FC<PreviewPanelProps> = ({ decodedHtml }) => {
  const navigate = useNavigate();

  return (
    <Stack
      flex={1}
      sx={{
        backgroundColor: '#2B2A44',
        paddingInline: '16px',
        alignItems: 'center',
        position: 'fixed',
        width: '50%',
        right: 0,
        height: '100vh',
        overflow: 'scroll',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          width: '593px',
          height: '90px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            height: '32px',
            borderColor: '#34335C',
            color: '#FFF',
            fontSize: '12px',
            backgroundColor: '#34335C',
            ':hover': {
              backgroundColor: '#34335C',
            },
          }}
          startIcon={<GridViewOutlinedIcon />}
          variant="outlined"
        >
          change template
        </Button>
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            height: '32px',
            ':hover': {
              backgroundColor: '#0e41fc',
            },
          }}
          variant="contained"
          onClick={() => {
            navigate('/create/payment');
          }}
        >
          download
        </Button>
      </Box>

      <Box
        sx={{
          height: '827px',
          width: '593px',
          backgroundColor: '#ffffff',
          overflow: 'scroll',
          borderRadius: '8px',
        }}
        dangerouslySetInnerHTML={{ __html: decodedHtml }}
      />
    </Stack>
  );
};

export default PreviewPanel;
