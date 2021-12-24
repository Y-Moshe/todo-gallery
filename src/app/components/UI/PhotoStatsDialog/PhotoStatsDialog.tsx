import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Tooltip,
  Link,
  CircularProgress,
  Fade,
  Grow
} from '@material-ui/core';
import {
  Close,
  Publish,
  Visibility,
  FavoriteBorder,
  CloudDownload,
  EventAvailable
} from '@material-ui/icons';
import { a } from 'react-spring';

import { IPhoto, PStats } from '../../../types';
import { useSpringNumber } from '../../../hooks';
import { useEffect, useState } from 'react';

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
  const [ isPhotoLoaded, setPhotoLoad ] = useState( false );

  useEffect(() => {
    setPhotoLoad( false );
  }, [ props?.urls?.full ]);

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
        { props?.user?.username || '' }
      </Link>
    </div>,
    <a.span>{ viewsNum.to( val => val.toFixed( 0 )) }</a.span>,
    <a.span>{ likesNum.to( val => val.toFixed( 0 )) }</a.span>,
    <a.span>{ downloadsNum.to( val => val.toFixed( 0 )) }</a.span>,
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
              style   = {{ marginRight: 5 }}
              edge    = "start"
              color   = "inherit"
              onClick = { props.onClose }>
              <Close />
            </IconButton>
          </Tooltip>
          { props?.description || '' }
        </DialogTitle>

        <DialogContent style = {{ height: '100vh' }}>
          <div style = {{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Fade in = { !isPhotoLoaded } unmountOnExit>
              <CircularProgress />
            </Fade>
            <Grow in = { isPhotoLoaded }>
              <img
                style = {{ maxWidth: '100%', maxHeight: '75vh' }}
                hidden = { !isPhotoLoaded }
                onLoad = { () => setPhotoLoad( true ) }
                src    = { props?.urls?.full }
                alt    = { props.alt_description as string }
              />
            </Grow>
          </div>
        </DialogContent>

        <DialogActions>
          <TableContainer component = { Paper }>
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
        </DialogActions>
    </Dialog>
  )
}
