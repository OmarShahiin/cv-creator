import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import More from '@/assets/more.svg';
type Skill = {
  id: number;
  label: string;
};

const skillsData: Skill[] = [
  { id: 1, label: 'Multitasking Skills' },
  { id: 2, label: 'Leadership Skills' },
  { id: 3, label: 'Creative Problem Solving Skills' },
  { id: 4, label: 'Customer Service Skills' },
  { id: 5, label: 'Strong Analytical Skills' },
  { id: 6, label: 'Design' },
];

const MultiSelectTags: React.FC = () => {
  // State to manage selected skills
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  // Handler for toggling selection
  const toggleSkill = (id: number): void => {
    setSelectedSkills((prev) => (prev.includes(id) ? prev.filter((skillId) => skillId !== id) : [...prev, id]));
  };

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: '#fff',
        borderRadius: '16px',
      }}
    >
      {/* Heading */}
      <Typography sx={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins', marginBottom: '16px' }}>
        Skills
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        {skillsData.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.label}
            onDelete={() => toggleSkill(skill.id)}
            onClick={() => toggleSkill(skill.id)}
            deleteIcon={
              selectedSkills.includes(skill.id) ? <DoneIcon fill="#FFF" /> : <Box component={'img'} src={More} />
            }
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
              color: selectedSkills.includes(skill.id) ? 'white' : 'text.primary',
              '&:hover': {
                backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
              },
              '& .MuiChip-deleteIcon': {
                color: '#FFF',
                '&:hover': {
                  backgroundColor: selectedSkills.includes(skill.id) ? 'primary.main' : 'grey.200',
                  color: '#FFF',
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MultiSelectTags;
