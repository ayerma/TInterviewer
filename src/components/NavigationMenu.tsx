import { createSignal, createResource, For, Show } from 'solid-js';
import { A, useLocation, useNavigate } from '@solidjs/router';
import { List, ListItem, ListItemButton, ListItemText, CircularProgress, Box } from '@suid/material';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';
import ChevronRightIcon from '@suid/icons-material/ChevronRight';
import type { SpacesIndex, Space, Topic, Question } from '../types/schema';
import { loadSpacesIndex } from '../services/dataService';

interface ExpandedState {
  [key: string]: boolean;
}

interface NavigationMenuProps {
  onNavigate?: () => void;
}

export default function NavigationMenu(props: NavigationMenuProps) {
  const [expanded, setExpanded] = createSignal<ExpandedState>({});
  const [spacesData] = createResource(loadSpacesIndex);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleExpandClick = (e: MouseEvent, key: string) => {
    e.stopPropagation();
    toggleExpand(key);
  };

  const handleSpaceClick = (spaceId: string) => {
    navigate(`/spaces/${spaceId}`);
    if (props.onNavigate) props.onNavigate();
  };

  const handleTopicClick = (spaceId: string, topicId: string) => {
    navigate(`/spaces/${spaceId}/${topicId}`);
    if (props.onNavigate) props.onNavigate();
  };

  return (
    <Box sx={{ p: 1 }}>
      <Show 
        when={!spacesData.loading} 
        fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        }
      >
        <Show when={spacesData()}>
          {(data) => (
            <List component="nav" disablePadding>
              <For each={data().spaces}>
                {(space: Space) => {
                  const spaceKey = `space-${space.id}`;
                  const isSpaceExpanded = () => expanded()[spaceKey] || false;

                  return (
                    <>
                      {/* Space header */}
                      <ListItemButton 
                        onClick={() => handleSpaceClick(space.id)} 
                        sx={{ pl: 2 }}
                        selected={location.pathname === `/spaces/${space.id}`}
                      >
                        <Box 
                          component="span" 
                          onClick={(e) => handleExpandClick(e, spaceKey)}
                          sx={{ display: 'flex', alignItems: 'center', mr: 1, cursor: 'pointer', p: 0.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '50%' } }}
                        >
                           {isSpaceExpanded() ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                        </Box>
                        <ListItemText 
                          primary={space.name} 
                          primaryTypographyProps={{ fontWeight: 600 }}
                        />
                      </ListItemButton>

                      {/* Topics list */}
                      <Show when={isSpaceExpanded()}>
                        <List component="div" disablePadding sx={{ 
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease-in-out'
                        }}>
                          <For each={space.topics}>
                            {(topic: Topic) => {
                              const topicKey = `topic-${space.id}-${topic.id}`;
                              const isTopicExpanded = () => expanded()[topicKey] || false;

                              return (
                                <>
                                  {/* Topic header */}
                                  <ListItemButton 
                                    onClick={() => handleTopicClick(space.id, topic.id)} 
                                    sx={{ pl: 4 }}
                                    selected={location.pathname === `/spaces/${space.id}/${topic.id}`}
                                  >
                                    <Box 
                                      component="span" 
                                      onClick={(e) => handleExpandClick(e, topicKey)}
                                      sx={{ display: 'flex', alignItems: 'center', mr: 1, cursor: 'pointer', p: 0.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', borderRadius: '50%' } }}
                                    >
                                      {isTopicExpanded() ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                                    </Box>
                                    <ListItemText 
                                      primary={topic.name}
                                      primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                                    />
                                  </ListItemButton>

                                  {/* Questions list */}
                                  <Show when={isTopicExpanded()}>
                                    <List component="div" disablePadding sx={{ 
                                      overflow: 'hidden',
                                      transition: 'max-height 0.3s ease-in-out'
                                    }}>
                                      <For each={topic.questions}>
                                        {(question: Question) => {
                                          const questionPath = `/spaces/${space.id}/${topic.id}/${question.id}`;
                                          const active = location.pathname === questionPath;

                                          return (
                                            <ListItem disablePadding>
                                              <ListItemButton
                                                component={A}
                                                href={questionPath}
                                                selected={active}
                                                onClick={props.onNavigate}
                                                sx={{ pl: 8 }}
                                              >
                                                <ListItemText 
                                                  primary={question.title}
                                                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                          );
                                        }}
                                      </For>
                                    </List>
                                  </Show>
                                </>
                              );
                            }}
                          </For>
                        </List>
                      </Show>
                    </>
                  );
                }}
              </For>
            </List>
          )}
        </Show>
      </Show>
    </Box>
  );
}
