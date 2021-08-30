import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, PaletteType, colors } from '@material-ui/core';

import { getPhotos, IPhoto } from '../API';
import { Header, UI } from './components';
import { Photos } from './containers';

export type DirectionAnimation = 'left' | 'right';

export default function App() {
  const [ photos,        setPhotos ]        = useState<IPhoto[]>( [] );
  const [ totalItems,    setTotalItems ]    = useState( 0 );
  const [ currentPage,   setCurrentPage ]   = useState( 0 );
  const [ itemsPerPage,  setItemsPerPage ]  = useState( 10 );
  const [ appearance,    setAppearance ]    = useState<PaletteType>( 'light' );
  const [ directionAnim, setDirectionAnim ] = useState<DirectionAnimation>( 'right' );
  const theme = createTheme({
    palette: {
      type: appearance
    }
  });

  useEffect(() => {
    getPhotos( currentPage + 1, itemsPerPage)
      .then( response => {
        setPhotos( response?.results || [] );
        setTotalItems(  response?.total   || 0 );
    }).catch( error => {
      console.log(error);
    });
  }, [ currentPage, itemsPerPage ]);

  const handlePageChange = ( latestPage: number ) => {
    setDirectionAnim( currentPage < latestPage ? 'right' : 'left' );
    setCurrentPage( latestPage );
  };

  const handlePhotoClicked = ( id: string ) => {
    console.log(id);
  };

  const pagination = (
    <UI.Pagination
      appearance   = { appearance }
      totalItems   = { totalItems }
      currentPage  = { currentPage }
      itemsPerPage = { itemsPerPage }
      onPageChange = { handlePageChange }
      onItemsPerPageChange = { items => setItemsPerPage( items ) } />
  );

  const appStyle: React.CSSProperties = {
    backgroundColor: appearance === 'light'
      ? theme.palette.common.white
      : colors.grey[800],
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  return (
    <div style = { appStyle }>
      <ThemeProvider theme = { theme }>
        <Header
          appearance         = { appearance }
          onAppearanceChange = { mode => setAppearance( mode ) } />

        { pagination }

        <Photos
          directionAnim = { directionAnim }
          appearance    = { appearance }
          photos        = { photos }
          onPhotoClick  = { handlePhotoClicked } />

        { pagination }
      </ThemeProvider>
    </div>
  );
}
