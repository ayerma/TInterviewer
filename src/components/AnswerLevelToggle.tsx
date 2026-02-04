import { createSignal, type Accessor } from 'solid-js';
import { ToggleButtonGroup, ToggleButton } from '@suid/material';

export type AnswerLevel = 'junior' | 'middle' | 'senior' | 'tricky';

interface AnswerLevelToggleProps {
  selectedLevel: Accessor<AnswerLevel>;
  onLevelChange: (level: AnswerLevel) => void;
}

export default function AnswerLevelToggle(props: AnswerLevelToggleProps) {
  const handleLevelChange = (_event: any, newLevel: AnswerLevel | null) => {
    if (newLevel !== null) {
      props.onLevelChange(newLevel);
    }
  };

  return (
    <ToggleButtonGroup
      value={props.selectedLevel()}
      exclusive
      onChange={handleLevelChange}
      aria-label="answer complexity level"
      sx={{ mb: 3 }}
    >
      <ToggleButton value="junior" aria-label="junior level">
        Junior
      </ToggleButton>
      <ToggleButton value="middle" aria-label="middle level">
        Middle
      </ToggleButton>
      <ToggleButton value="senior" aria-label="senior level">
        Senior
      </ToggleButton>
      <ToggleButton value="tricky" aria-label="tricky level">
        Tricky
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
