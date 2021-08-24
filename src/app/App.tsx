import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  ThemeProvider,
  createTheme,
  PaletteType,
  makeStyles,
  createStyles,
  colors
} from '@material-ui/core';

import { getPhotos, IPhoto } from '../API';
import { Header } from './components';
import { Pagination } from './components/UI';
import { Photo } from './containers';

const useStyles = makeStyles(() => createStyles({
  galleryWrapper: {
    margin: 50,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}));

export default function App() {
  const [ photos,       setPhotos ]       = useState<IPhoto[]>( [] );
  const [ totalItems,   setTotalItems ]   = useState( 0 );
  const [ currentPage,  setCurrentPage ]  = useState( 0 );
  const [ itemsPerPage, setItemsPerPage ] = useState( 10 );
  const [ appearance,   setAppearance ]   = useState<PaletteType>( 'light' );
  const theme   = createTheme({
    palette: {
      type: appearance
    }
  });
  const classes = useStyles();

  useEffect(() => {
    getPhotos( currentPage + 1, itemsPerPage)
      .then( response => {
        setPhotos( response?.results || [] );
        setTotalItems(  response?.total   || 0 );
    }).catch( error => {
      console.log(error);
    });
  }, [ currentPage, itemsPerPage ]);

  const photoList = useMemo(() => {
    return photos.map( photo => (
      <Photo { ...photo }
        key = { photo.id } />
    ));
  }, [ photos ]);

  const pagination = (
    <Pagination
      appearance   = { appearance }
      totalItems   = { totalItems }
      currentPage  = { currentPage }
      itemsPerPage = { itemsPerPage }
      onPageChange = { latestPage => setCurrentPage( latestPage ) }
      onItemsPerPageChange = { items => setItemsPerPage( items ) } />
  );


  return (
    <div style = {{ backgroundColor: appearance === 'light'
        ? theme.palette.common.white
        : colors.grey[800] }}>
      <ThemeProvider theme = { theme }>
        <Header
          appearance         = { appearance }
          onAppearanceChange = { mode => setAppearance( mode ) } />

        <Container style = {{ paddingTop: 24, paddingBottom: 24 }}>
          { pagination }

          <div className = { classes.galleryWrapper }>{ photoList }</div>

          { pagination }
        </Container>
      </ThemeProvider>
    </div>
  );
}
