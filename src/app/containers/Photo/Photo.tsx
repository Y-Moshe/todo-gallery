import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { animated, useSpring } from 'react-spring';

import { IPhoto } from '../../../API';

const PHOTO_WIDTH  = 256;
const PHOTO_HEIGHT = 256;

interface PhotoProps extends IPhoto {}

export default function Photo( props: PhotoProps ) {
  const animStyle = useSpring({
    config: {duration: 500},
    from: { opacity: 0 },
    to: { opacity: 1 }
  });

  const [ isLoading, setIsLoading ] = useState( true );
  const handleLoaded = () => {
    setIsLoading( false )
  };

  return (
    <div>
      {
        isLoading &&
        <animated.div style = { animStyle }>
          <Blurhash
            hash   = { props.blur_hash as string }
            width  = { PHOTO_WIDTH }
            height = { PHOTO_HEIGHT } />
        </animated.div>
      }
      <img
        hidden = { isLoading }
        src    = { props.urls.small }
        alt    = { props.alt_description as string }
        onLoad = { handleLoaded }
        height = { PHOTO_HEIGHT } />
    </div>
  )
}
