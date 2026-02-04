import { useParams, useNavigate } from '@solidjs/router';
import { createResource, Show, For } from 'solid-js';
import { Paper, Typography, Box, CircularProgress, Alert, AlertTitle, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@suid/material';
import WarningAmberIcon from '@suid/icons-material/WarningAmber';
import ErrorOutlineIcon from '@suid/icons-material/ErrorOutline';
import HelpOutlineIcon from '@suid/icons-material/HelpOutline';
import type { SpacesIndex } from '../types/schema';
import { loadSpacesIndex } from '../services/dataService';

export default function TopicView() {
  const params = useParams();
  const navigate = useNavigate();

  const [spacesIndex] = createResource(loadSpacesIndex);

  const currentTopic = () => {
    const index = spacesIndex();
    if (!index || !params.spaceId || !params.topicId) return null;
    const space = index.spaces.find(s => s.id === params.spaceId);
    if (!space) return null;
    return space.topics.find(t => t.id === params.topicId);
  };

  const currentSpace = () => {
    const index = spacesIndex();
    if (!index || !params.spaceId) return null;
    return index.spaces.find(s => s.id === params.spaceId);
  };

  return (
    <Show
      when={!spacesIndex.loading}
      fallback={
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
          <CircularProgress size={60} />
          <Typography variant="body1" color="text.secondary">Loading topic...</Typography>
        </Box>
      }
    >
      <Show
        when={!spacesIndex.error}
        fallback={
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            <AlertTitle>Failed to Load Topic</AlertTitle>
            {spacesIndex.error?.message || 'An error occurred while loading the topic.'}
          </Alert>
        }
      >
        <Show
          when={currentTopic() && currentSpace()}
          fallback={
            <Alert severity="warning" icon={<WarningAmberIcon />}>
              <AlertTitle>Topic Not Found</AlertTitle>
              The topic '{params.topicId}' does not exist in space '{params.spaceId}'.
            </Alert>
          }
        >
          {() => {
            const topic = currentTopic()!;
            const space = currentSpace()!;
            return (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper sx={{ p: 4 }}>
                  <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                    {topic.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {topic.description}
                  </Typography>
                </Paper>

                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                    Questions ({topic.questions.length})
                  </Typography>
                  <Paper variant="outlined">
                    <List disablePadding>
                      <For each={topic.questions}>
                        {(question, i) => (
                          <ListItem disablePadding divider={i() < topic.questions.length - 1}>
                            <ListItemButton
                              onClick={() => navigate(`/spaces/${space.id}/${topic.id}/${question.id}`)}
                              sx={{ py: 2 }}
                            >
                              <ListItemIcon>
                                <HelpOutlineIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={question.title} 
                                primaryTypographyProps={{ fontWeight: 500, variant: 'subtitle1' }}
                              />
                            </ListItemButton>
                          </ListItem>
                        )}
                      </For>
                    </List>
                  </Paper>
                </Box>
              </Box>
            );
          }}
        </Show>
      </Show>
    </Show>
  );
}
