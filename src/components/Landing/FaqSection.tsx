import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does SmartCV Builder work?',
    answer:
      '        Find answers to common questions about the CV building process and features of SmartCV Builder.    ',
  },
  { question: 'Is my data secure?', answer: 'Yes, your data is securely stored and protected.' },
  { question: 'Can I customize my CV?', answer: 'Yes, you can customize various aspects of your CV.' },
  { question: 'How can I sign up?', answer: 'You can sign up on our website.' },
  { question: 'Is there a cost?', answer: 'Our service is free with premium options available.' },
];
const FaqSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [icons, setIcons] = useState<any>([]);
  const handleExpanded = (bool: Boolean, index: number) => {
    const temp: any = [...icons];
    temp[index] = bool ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />;
    setIcons(temp);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: isMobile ? '95%' : '100%',
        // background: '#fff',
        maxWidth: 'lg',
        // padding: 0,
      }}
    >
      <Typography
        sx={{
          marginTop: '42px',
          fontSize: isMobile ? '26px' : '38px',
          fontWeight: '600',
        }}
      >
        FAQs
      </Typography>
      <Typography
        sx={{
          marginTop: '12px',
          color: '#838291',
          fontSize: isMobile ? '14px' : '18px',
          fontWeight: '400',
          fontFamily: 'Roboto',
          textAlign: isMobile ? 'center' : 'start',
        }}
      >
        Find answers to common questions about the CV building process and features of SmartCV Builder.
      </Typography>
      <Box
        sx={{
          // paddingBlock: '20px',
          paddingInline: isMobile ? '5px' : '30px',
          backgroundColor: '#FFF',
          borderRadius: '16px',
          marginTop: '41px',
          width: '100%',
        }}
      >
        {faqs.map((faq, index) => (
          <Accordion
            slotProps={{
              heading: {},
            }}
            onChange={(_, b) => {
              handleExpanded(b, index);
            }}
            sx={{
              backgroundColor: '#FFF',
              '&.Mui-expanded': {
                margin: '0 !important',
              },
            }}
            key={index}
            elevation={0}
          >
            <AccordionSummary
              expandIcon={icons[index] ? icons[index] : <AddOutlinedIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                '&.Mui-expanded': {
                  borderTopWidth: '1px !important',
                  borderTopColor: '#000 !important',
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: '500',
                  color: '#2B2A44',
                  paddingBlock: '24px',
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: isMobile ? '14px' : '18px',
                  color: '#838291',
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FaqSection;
