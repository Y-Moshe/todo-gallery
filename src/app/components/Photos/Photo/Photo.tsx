import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { useSpring, a } from 'react-spring';
import { FavoriteBorder } from '@material-ui/icons';
import { makeStyles, createStyles, Link } from '@material-ui/core';

import { IPhoto } from '../../../types';

function generateRandomHeight() {
  const min = 200;
  const max = 320;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const useStyles = makeStyles(({ palette }) => createStyles({
  photoStyle: {
    position: 'relative',
    boxShadow: `0 0 5px ${ palette.type === 'light'
      ? palette.grey[500]
      : palette.grey[900] }`,
    borderRadius: 15,
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  titleStyle: {
    position: 'absolute',
    top: 10,
    margin: '0 5px',
    padding: 0,
    fontSize: '0.8rem',
    textAlign: 'center',
    zIndex: 10
  },
  likesWrapperStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 10
  },
  userNameStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    margin: '0 5px',
    fontSize: '0.8rem',
    zIndex: 10
  },
  slider: {
    width: '100%',
    height: '100%',
    zIndex: 5,
    position: 'absolute',
    borderRadius: 15,
    background: 'linear-gradient(rgba(0, 0, 0, 0.8), transparent 80%, rgba(0, 0, 0, 0.8) 15%)'
  }
}));

interface PhotoProps extends IPhoto {
  onClick: ( photo: IPhoto ) => void;
}

export function Photo( props: PhotoProps ) {
  const [ isLoading, setIsLoading ] = useState( true );
  const classes    = useStyles();

  const bounceAnim = useSpring({
    from: { transform: 'scale(0.85)' },
    to:   { transform: 'scale(1)' },
    reset: true
  });

  const [ slideAnim, slideAnimCtrl ] = useSpring(() => ({
    from: { transform: 'scale(0)' },
    config: {
      mass: 2,
      tension: 200
    }
  }));
  
  const handleShadowSlide = ( animateTo: 'DOWN' | 'UP' ) => {
    switch ( animateTo ) {
      case 'DOWN':
        slideAnimCtrl.update({
          from: { transform: 'scale(0.5)' },
          to: { transform: 'scale(1)' },
          config: { mass: 3, tension: 280 }
        }).start();
        break;
      case 'UP':
        slideAnimCtrl.update({
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0)' },
          config: { mass: 1 }
        }).start();
        break;
    }
  };

  return (
    <div onClick = { () => props.onClick( props ) }>
      {
        isLoading &&
        <Blurhash
          className = { classes.photoStyle }
          hash   = { props.blur_hash as string }
          width  = { 256 }
          height = { generateRandomHeight() } />
      }
      <a.div
        style = { bounceAnim }
        className    = { classes.photoStyle }
        onMouseEnter = { () => handleShadowSlide( 'DOWN' ) }
        onMouseLeave = { () => handleShadowSlide( 'UP' ) }>
        <a.div className = { classes.slider } style = { slideAnim }></a.div>
        <img
          style  = {{ borderRadius: 15 }}
          hidden = { isLoading }
          src    = { props.urls.small }
          alt    = { props.alt_description as string }
          onLoad = { () => setTimeout(() => setIsLoading( false ), 1000)  }
        />
        {
          !isLoading &&
          <>
            <p className = { classes.titleStyle }>{ props.description }</p>
            <div className = { classes.likesWrapperStyle }>
              <FavoriteBorder htmlColor = "#f73378" style = {{ verticalAlign: 'bottom' }} />
              { props.likes }
            </div>
            <p className = { classes.userNameStyle }>By <Link href = { 'https://unsplash.com/@' + props.user.username }>
              { props.user.username }</Link></p>
          </>
        }
      </a.div>
    </div>
  )
}
