import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, colors } from '@material-ui/core';

import { Header, Pagination, Photos, PhotoStatsDialog } from './components';
import { DirectionAnimation, FullPhotoInfo, IPhoto, PaletteType, PStats } from './types';
import { getPhotos, getPhotoStats } from '../API';

export default function App() {
  const [ photos,        setPhotos ]        = useState<IPhoto[]>( [] );
  const [ totalItems,    setTotalItems ]    = useState( 0 );
  const [ currentPage,   setCurrentPage ]   = useState( 0 );
  const [ itemsPerPage,  setItemsPerPage ]  = useState( 9 );
  const [ appearance,    setAppearance ]    = useState<PaletteType>( 'light' );
  const [ directionAnim, setDirectionAnim ] = useState<DirectionAnimation>( 'right' );
  const [ fullPhotoInfo, setFullPhotoInfo ] = useState<FullPhotoInfo>();
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
    }).catch( error => console.log( error ));
  }, [ currentPage, itemsPerPage ]);

  const handlePageChange = ( latestPage: number ) => {
    setDirectionAnim( currentPage < latestPage ? 'right' : 'left' );
    setCurrentPage( latestPage );
  };

  const handlePhotoClicked = ( photo: IPhoto ) => {
    getPhotoStats( photo.id )
      .then( response => {
        setFullPhotoInfo({ ...response as PStats, ...photo });
    }).catch( error => console.log( error ));
  };

  const pagination = (
    <Pagination
      appearance   = { appearance }
      totalItems   = { totalItems }
      currentPage  = { currentPage }
      itemsPerPage = { itemsPerPage }
      onPageChange = { handlePageChange }
      onItemsPerPageChange = { items => setItemsPerPage( items ) }
    />
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
          onAppearanceChange = { mode => setAppearance( mode ) }
        />

        { pagination }

        <Photos
          itemsPerPage  = { itemsPerPage }
          directionAnim = { directionAnim }
          appearance    = { appearance }
          photos        = { photos }
          onPhotoClick  = { handlePhotoClicked }
        />

        { pagination }

        <PhotoStatsDialog
          { ...fullPhotoInfo as FullPhotoInfo }
          isOpen  = { fullPhotoInfo !== undefined }
          onClose = { () => setFullPhotoInfo( undefined ) }
        />
      </ThemeProvider>
    </div>
  );
}
