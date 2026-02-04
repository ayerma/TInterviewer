import { createSignal, createResource, For, Show } from 'solid-js';
import { useNavigate, useLocation } from '@solidjs/router';
import { Button, Menu, MenuItem, ListItemText, CircularProgress, Box } from '@suid/material';
import ArrowDropDownIcon from '@suid/icons-material/ArrowDropDown';
import CheckIcon from '@suid/icons-material/Check';
import type { SpacesIndex, Space } from '../types/schema';
import { loadSpacesIndex } from '../services/dataService';

export default function SpaceSelector() {
  const [anchorEl, setAnchorEl] = createSignal<null | HTMLElement>(null);
  const [spacesData] = createResource(loadSpacesIndex);
  const navigate = useNavigate();
  const location = useLocation();

  const open = () => Boolean(anchorEl());

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getCurrentSpace = (): Space | undefined => {
    const data = spacesData();
    if (!data) return undefined;

    const pathParts = location.pathname.split('/').filter(Boolean);
    // Path is usually spaces/:spaceId/:topicId/:questionId
    const spaceId = pathParts[0] === 'spaces' ? pathParts[1] : (pathParts[0] || 'java');
    
    return data.spaces.find((s) => s.id === spaceId) || data.spaces[0];
  };

  const handleSpaceSelect = (space: Space) => {
    handleClose();
    navigate(`/spaces/${space.id}`);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        aria-label="Select space"
        aria-expanded={open()}
        aria-haspopup="true"
      >
        <Show when={getCurrentSpace()} fallback="Select Space">
          {(space) => space().name}
        </Show>
      </Button>

      <Menu
        anchorEl={anchorEl()}
        open={open()}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { minWidth: 280 }
        }}
      >
        <Show 
          when={!spacesData.loading} 
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          }
        >
          <Show when={spacesData()}>
            {(data) => (
              <For each={data().spaces}>
                {(space: Space) => {
                  const currentSpace = getCurrentSpace();
                  const isSelected = currentSpace?.id === space.id;

                  return (
                    <MenuItem 
                      onClick={() => handleSpaceSelect(space)}
                      selected={isSelected}
                    >
                      <ListItemText
                        primary={space.name}
                        secondary={space.description}
                        primaryTypographyProps={{ fontWeight: isSelected ? 600 : 400 }}
                      />
                      <Show when={isSelected}>
                        <CheckIcon color="primary" sx={{ ml: 2 }} />
                      </Show>
                    </MenuItem>
                  );
                }}
              </For>
            )}
          </Show>
        </Show>
      </Menu>
    </Box>
  );
}
