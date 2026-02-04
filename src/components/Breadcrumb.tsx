import { createResource, For, Show } from 'solid-js';
import { A, useLocation, useParams } from '@solidjs/router';
import { Breadcrumbs, Link, Typography } from '@suid/material';
import NavigateNextIcon from '@suid/icons-material/NavigateNext';
import type { SpacesIndex } from '../types/schema';

interface BreadcrumbSegment {
  label: string;
  path: string;
  isLast: boolean;
}

async function fetchSpacesIndex(): Promise<SpacesIndex> {
  const baseUrl = import.meta.env.BASE_URL;
  const response = await fetch(`${baseUrl}data/spaces-index.json`);
  if (!response.ok) {
    throw new Error('Failed to load spaces index');
  }
  return response.json();
}

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();
  const [spacesData] = createResource(fetchSpacesIndex);

  const breadcrumbs = (): BreadcrumbSegment[] => {
    const segments: BreadcrumbSegment[] = [];
    const data = spacesData();
    
    if (!data) return segments;

    const { spaceId, topicId, questionId } = params;

    // Find space
    const space = data.spaces.find(s => s.id === spaceId);
    if (!space) return segments;

    // Add space segment
    segments.push({
      label: space.name,
      path: `/spaces/${spaceId}`,
      isLast: !topicId
    });

    // Find and add topic segment if present
    if (topicId) {
      const topic = space.topics.find(t => t.id === topicId);
      if (topic) {
        segments.push({
          label: topic.name,
          path: `/spaces/${spaceId}/${topicId}`,
          isLast: !questionId
        });

        // Find and add question segment if present
        if (questionId) {
          const question = topic.questions.find(q => q.id === questionId);
          if (question) {
            segments.push({
              label: question.title,
              path: `/spaces/${spaceId}/${topicId}/${questionId}`,
              isLast: true
            });
          }
        }
      }
    }

    return segments;
  };

  return (
    <Show when={!spacesData.loading && breadcrumbs().length > 0}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <For each={breadcrumbs()}>
          {(segment) => (
            <Show
              when={!segment.isLast}
              fallback={
                <Typography color="text.primary" fontWeight={500}>
                  {segment.label}
                </Typography>
              }
            >
              <Link
                component={A}
                href={segment.path}
                underline="hover"
                color="inherit"
              >
                {segment.label}
              </Link>
            </Show>
          )}
        </For>
      </Breadcrumbs>
    </Show>
  );
}
