import { useParams, useNavigate } from '@solidjs/router';
import { createResource, Show, For } from 'solid-js';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, AlertTitle, Paper, Button, Chip, Stack, CardActionArea } from '@suid/material';
import WarningAmberIcon from '@suid/icons-material/WarningAmber';
import ErrorOutlineIcon from '@suid/icons-material/ErrorOutline';
import type { SpacesIndex } from '../types/schema';
import ArticleIcon from '@suid/icons-material/Article';
import { loadSpacesIndex } from '../services/dataService';

export default function SpaceView() {
  const params = useParams();
  const navigate = useNavigate();

  const [spacesIndex] = createResource(loadSpacesIndex);

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
          <Typography variant="body1" color="text.secondary">Loading space...</Typography>
        </Box>
      }
    >
      <Show
        when={!spacesIndex.error}
        fallback={
          <Alert severity="error" icon={<ErrorOutlineIcon />}>
            <AlertTitle>Failed to Load Space</AlertTitle>
            {spacesIndex.error?.message || 'An error occurred while loading the space.'}
          </Alert>
        }
      >
        <Show
          when={currentSpace()}
          fallback={
            <Alert severity="warning" icon={<WarningAmberIcon />}>
              <AlertTitle>Space Not Found</AlertTitle>
              The space '{params.spaceId}' does not exist.
            </Alert>
          }
        >
          {(space) => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                  {space().name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {space().description}
                </Typography>
              </Paper>

              <Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                  Topics
                </Typography>
                <Stack spacing={2}>
                  <For each={space().topics}>
                    {(topic) => (
                      <Card variant="outlined">
                         <CardContent>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {topic.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {topic.description}
                            </Typography>
                            
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Questions ({topic.questions.length}):
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <For each={topic.questions}>
                                  {(question) => (
                                    <Chip 
                                      label={question.title} 
                                      onClick={() => navigate(`/spaces/${space().id}/${topic.id}/${question.id}`)}
                                      icon={<ArticleIcon />}
                                      variant="outlined"
                                      clickable
                                    />
                                  )}
                                </For>
                              </Box>
                            </Box>
                         </CardContent>
                      </Card>
                    )}
                  </For>
                </Stack>
              </Box>
            </Box>
          )}
        </Show>
      </Show>
    </Show>
  );
}
