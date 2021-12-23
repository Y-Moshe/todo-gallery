import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  Link
} from '@material-ui/core';
import {
  Close,
  Publish,
  Visibility,
  FavoriteBorder,
  CloudDownload,
  EventAvailable
} from '@material-ui/icons';
import { animated } from 'react-spring';

import { IPhoto, PStats } from '../../../types';
import { useSpringNumber } from '../../../hooks';

interface PhotoStatsDialogProps extends IPhoto, PStats {
  isOpen: boolean;
  onClose: () => void;
}

const tableHeaderData = [
  { tooltip: 'Publisher',  icon: <Publish /> },
  { tooltip: 'Views',      icon: <Visibility /> },
  { tooltip: 'Likes',      icon: <FavoriteBorder /> },
  { tooltip: 'Downloads',  icon: <CloudDownload /> },
  { tooltip: 'Created At', icon: <EventAvailable /> }
];

export function PhotoStatsDialog( props: PhotoStatsDialogProps ) {
  const viewsNum     = useSpringNumber( props?.views?.total );
  const likesNum     = useSpringNumber( props?.likes );
  const downloadsNum = useSpringNumber( props?.downloads?.total );
  const displayData = [
    <div>
      <img
        style = {{ marginRight: 10, borderRadius: '50%', verticalAlign: 'middle' }}
        src = { props?.user?.profile_image?.small }
        alt = { props?.user?.username } />
      <Link href = { 'https://unsplash.com/@' + props?.user?.username }>
        { props?.user?.username }
      </Link>
    </div>,
    <animated.span>{ viewsNum.to( val => val.toFixed( 0 )) }</animated.span>,
    <animated.span>{ likesNum.to( val => val.toFixed( 0 )) }</animated.span>,
    <animated.span>{ downloadsNum.to( val => val.toFixed( 0 )) }</animated.span>,
    new Date( props?.created_at ).toLocaleDateString('en-UK')
  ];

  return (
    <Dialog
      open    = { props.isOpen }
      onClose = { props.onClose }
      fullScreen>
        <DialogTitle>
          <Tooltip title = "Close">
            <IconButton
              edge = "start"
              color = "inherit"
              onClick = { props.onClose }>
              <Close />
            </IconButton>
          </Tooltip>
          { props?.description }
        </DialogTitle>
        <DialogContent>
          <div style = {{ display: 'flex', margin: 15 }}>
            <img
              style  = {{
                margin: 'auto',
                borderRadius: 15,
                maxHeight: '75vh',
                maxWidth: '100%'
              }}
              src    = { props?.urls?.full }
              alt    = { props.alt_description as string } />
          </div>
          <Divider />
          <TableContainer component={ Paper }>
            <Table>
              <TableHead>
                <TableRow>
                  {
                    tableHeaderData.map( data => (
                      <TableCell key = { data.tooltip } align = "center">
                        <Tooltip title = { data.tooltip }>
                          { data.icon }
                        </Tooltip>
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow >
                  {
                    displayData.map(( data, i ) => (
                      <TableCell key = { i } align = "center">
                        { data }
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant = "outlined"
            onClick = { props.onClose }
            fullWidth>
            Close
          </Button>
        </DialogActions>
    </Dialog>
  )
}
