import { useParams } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import { Card, CardContent, Typography, Box, CircularProgress, Alert, AlertTitle, Paper } from '@suid/material';
import ArticleIcon from '@suid/icons-material/Article';
import ErrorOutlineIcon from '@suid/icons-material/ErrorOutline';
import type { QuestionContent } from '../types/schema';
import QuestionNavigation from '../components/QuestionNavigation';
import { loadQuestion } from '../services/dataService';

export default function QuestionDetail() {
  const params = useParams();

  const [questionContent] = createResource(
    () => ({ spaceId: params.spaceId, topicId: params.topicId, questionId: params.questionId }),
    async ({ spaceId, topicId, questionId }) => {
      if (!spaceId || !topicId || !questionId) {
        return null;
      }
      return loadQuestion(`spaces/${spaceId}/${topicId}/${questionId}.json`);
    }
  );

  return (
    <Show
      when={!params.questionId}
      fallback={
        <Show
          when={!questionContent.loading}
          fallback={
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10 }}>
              <CircularProgress size={60} />
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Loading question...
              </Typography>
            </Box>
          }
        >
          <Show
            when={!questionContent.error}
            fallback={
              <Alert severity="error" icon={<ErrorOutlineIcon />}>
                <AlertTitle>Failed to Load Question</AlertTitle>
                {questionContent.error?.message || 'An error occurred while loading the question content.'}
              </Alert>
            }
          >
            <Show when={questionContent()}>
              {(content) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Card elevation={2}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {content().title}
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card elevation={2}>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                        Answer
                      </Typography>
                      <Typography 
                        variant="body1" 
                        component="div" 
                        sx={{ 
                          lineHeight: 1.8,
                          whiteSpace: 'pre-wrap',
                          color: 'text.primary'
                        }}
                      >
                        {content().answers.senior}
                      </Typography>
                    </CardContent>
                  </Card>

                  <QuestionNavigation />
                </Box>
              )}
            </Show>
          </Show>
        </Show>
      }
    >
      <Paper elevation={2} sx={{ p: 6, textAlign: 'center', bgcolor: 'primary.50' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <ArticleIcon sx={{ fontSize: 64, color: 'primary.light' }} />
          <Box>
            <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
              No Question Selected
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Select a question from the navigation menu to view its content.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Show>
  );
}
