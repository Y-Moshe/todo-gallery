import { useMemo } from 'react';
import { useTrail, a } from 'react-spring';
import { PaletteType, makeStyles, createStyles } from '@material-ui/core';

import { Photo } from '../../components';
import { DirectionAnimation, IPhoto } from '../../types';

const useStyles = makeStyles(() => createStyles({
  galleryContainer: {
    flexGrow: 1,
    margin: 25,
    display: 'grid',
    gap: 24,
    justifyContent: 'center',
    gridTemplateColumns: '256px',
    '@media (min-width: 620px)': {
      gridTemplateColumns: '256px 256px'
    },
    '@media (min-width: 900px)': {
      gridTemplateColumns: '256px 256px 256px'
    }
  }
}));

interface PhotosProps {
  itemsPerPage: number;
  appearance: PaletteType;
  photos: IPhoto[];
  directionAnim: DirectionAnimation;
  onPhotoClick: ( photo: IPhoto ) => void;
}

export function Photos( props: PhotosProps ) {
  const classes = useStyles();
  const trail = useTrail( props.photos.length, {
    from: {
      transform: props.directionAnim === 'right'
        ? 'translateY(-100px)'
        : 'translateY(100px)'
    },
    to: {
      transform: 'translateY(0)'
    },
    config: {
      mass: 5,
      tension: 300
    },
    reset: true
  });

  const photoList = useMemo(() => {
    return props.photos.map(( photo, i ) => (
      <a.div key = { photo.id } style = { trail[i] }>
        <Photo { ...photo }
          onClick  = { props.onPhotoClick }/>
      </a.div>
    ));
  }, [ props.photos, props.onPhotoClick, trail ]);
  const itemsPerColumn = props.itemsPerPage / 3;

  return (
    <div className = { classes.galleryContainer }>
      <div>{ photoList.slice(0, itemsPerColumn).map( item => item ) }</div>
      <div>{ photoList.slice(itemsPerColumn, itemsPerColumn*2).map( item => item ) }</div>
      <div>{ photoList.slice(itemsPerColumn*2, itemsPerColumn*3).map( item => item ) }</div>
    </div>
  )
}
