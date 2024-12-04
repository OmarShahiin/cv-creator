import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import More from '@/assets/more.svg';

type Skill = {
  id: number;
  label: string;
};

interface MultiSelectTagsProps {
  initialSelectedSkills?: number[]; // Pre-selected skill IDs
  skillsData: Skill[]; // Available skills
  onUpdate?: (selectedSkills: number[]) => void; // Callback for updates
}

const MultiSelectTags: React.FC<MultiSelectTagsProps> = ({ initialSelectedSkills = [], skillsData, onUpdate }) => {
  const [selectedSkills, setSelectedSkills] = useState<number[]>(initialSelectedSkills);

  // Notify parent of changes
  useEffect(() => {
    if (onUpdate) {
      onUpdate(selectedSkills);
    }
  }, [selectedSkills, onUpdate]);

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
      <Typography
        sx={{
          fontSize: '18px',
          textAlign: 'left',

          fontWeight: '600',
          fontFamily: 'Poppins',
          marginBottom: '16px',
        }}
      >
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          onClick={() => {}}
          color="primary"
          sx={{
            marginTop: '16px',
            alignSelf: 'flex-start',

            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
        >
          + Add More
        </Button>
      </Box>
    </Box>
  );
};

export default MultiSelectTags;
