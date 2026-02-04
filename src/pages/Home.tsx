import { Typography, Paper, List, ListItem, ListItemText, ListItemIcon, Box } from '@suid/material';
import LooksOneIcon from '@suid/icons-material/LooksOne';
import LooksTwoIcon from '@suid/icons-material/LooksTwo';
import Looks3Icon from '@suid/icons-material/Looks3';
import Looks4Icon from '@suid/icons-material/Looks4';

export default function Home() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="text.primary">
        Java Interview Q&A
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
        Welcome! Select a question from the navigation menu to get started.
      </Typography>
      
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
          Getting Started
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LooksOneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Browse through the topics in the left sidebar" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LooksTwoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Expand a space to see its topics" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Looks3Icon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Expand a topic to see its questions" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Looks4Icon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Click on a question to view the answer" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
