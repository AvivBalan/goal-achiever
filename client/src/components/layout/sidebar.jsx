import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const links = [
  {text: 'Homepage', path: '/'},
  {text: 'Goal List', path: '/goals'},
  {text: 'Create Goal', path: '/create'}
];

export default function Sidebar(props) {
  return (
    <Drawer
        anchor='left'
        open={props.isOpen}
        onClose={props.toggleDrawer(false)}
    >
        <Box
            sx={250}
            role="presentation"
            onClick={props.toggleDrawer(false)}
            onKeyDown={props.toggleDrawer(false)}
        >
        <List>
        {links.map((link) => (
          <Link key={`sidebar-link-${link.text}`} to={link.path} onClick={e => e.stopPropagation()}>
            <ListItem button>
              <ListItemText primary={link.text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
    </Drawer>
  );
}
