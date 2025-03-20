import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

const EmailList = ({ threads, onThreadSelect, selectedThreadId }) => {
  return (
    <Paper sx={{ height: '100%', overflow: 'auto' }}>
      <List>
        {threads.map((thread) => (
          <ListItem
            key={thread.id}
            button
            selected={selectedThreadId === thread.id}
            onClick={() => onThreadSelect(thread.id)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <EmailIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={thread.subject}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {thread.message_count} mensagens
                  </Typography>
                  {' • '}
                  {new Date(thread.last_message_at).toLocaleString()}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default EmailList; 