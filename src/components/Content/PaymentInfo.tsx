import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Lock from '@/assets/lock.svg';
import { colors } from '@/themes/colors';

const PaymentInfo: React.FC = () => {
  return (
    <Box sx={{ minWidth: '563px', margin: 'auto', p: 3, boxShadow: 3, borderRadius: 2, height: '425px' }}>
      {/* Title */}
      <Typography
        fontWeight="400"
        textAlign="center"
        sx={{
          color: colors.Text,
          fontFamily: 'Poppins',
          fontSize: '16px',
        }}
      >
        Total Amount
      </Typography>

      {/* Tabs for Payment Methods */}

      {/* Card Input Form */}

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography fontWeight="bold" color="primary" textAlign="center" fontSize={'36px'}>
          140.09 SAR
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Box component="img" src={Lock} alt={'secure'} />
          <Typography color="#04B500" fontSize={10}>
            Secure Payment
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{
            color: colors.Text,
            fontWeight: '600',
            fontFamily: 'Poppins',
            fontSize: '14px',
          }}
          gutterBottom
        >
          Order Summary
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <BlackText text="1 X Resume" />
          <BlackText text="120.09 SAR" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <BlackText text="VAT 15%" />
          <BlackText text="20 SAR" />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between" fontWeight="bold">
          <BlackText text="VAT 15%" />
          <BlackText text="140.09 SAR" color={colors.Main} />
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentInfo;
const BlackText = ({ text, color = colors.Black }: { color?: string; text: string }) => {
  return (
    <Typography
      sx={{
        color: color,
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'Poppins',
      }}
    >
      {text}
    </Typography>
  );
};
