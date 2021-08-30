import { useMemo } from 'react';
import { useTrail, a } from 'react-spring';
import { PaletteType } from '@material-ui/core';

import { IPhoto } from '../../../API';
import { Photo } from '../../containers';
import { DirectionAnimation } from '../../App';

const galleryWrapperStyle: React.CSSProperties = {
  flexGrow: 1,
  margin: 50,
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

interface PhotosProps {
  appearance: PaletteType;
  photos: IPhoto[];
  directionAnim: DirectionAnimation;
  onPhotoClick: ( id: string ) => void;
}

export function Photos( props: PhotosProps ) {
  const trail = useTrail( props.photos.length, {
    from: {
      transform: props.directionAnim === 'right'
        ? 'translateX(150px)'
        : 'translateX(-150px)'
    },
    to: {
      transform: 'translateX(0)'
    },
    config: {
      mass: 5,
      tension: 300
    },
    reset: true
  });

  const photoList = useMemo(() => { 
    return props.photos.map( photo => (
      <Photo key = { photo.id } { ...photo }
        onClick  = { props.onPhotoClick }/>
    ));
  }, [ props.photos, props.onPhotoClick ])

  return (
    <div style = { galleryWrapperStyle }>
      {
        trail.map(( animStyle, i ) => (
          <a.div
            style = { animStyle }
            key = { props.photos[i].id }>
            { photoList[i] }
          </a.div>
        ))
      }
    </div>
  )
}
