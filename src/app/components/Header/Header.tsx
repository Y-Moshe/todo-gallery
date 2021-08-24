import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  PaletteType,
  colors
} from '@material-ui/core';
import { Brightness2, Brightness7 } from '@material-ui/icons';
import { useSpring, a } from 'react-spring';

import { version } from '../../../../package.json';

interface HeaderProps {
  appearance: PaletteType;
  onAppearanceChange: ( mode: PaletteType ) => void;
}

export function Header( props: HeaderProps ) {
  const widthAnim = useSpring({
    from: {
      opacity: 0,
      width: '25%'
    },
    to: {
      opacity: 1,
      width: '100%'
    }
  });

  return (
    <a.div style = { widthAnim }>
      <AppBar
        position = "static"
        style    = {{
          backgroundColor: props.appearance === 'light' ? colors.grey[700] : colors.grey[900]
        }}>
        <Toolbar>
          <Typography variant = "h6">
            Todo-Gallery v{ version }
          </Typography>
          <span style = {{ flexGrow: 1 }}></span>
          <Switch
            color       = "default"
            icon        = { <Brightness7 htmlColor = "orange" /> }
            checkedIcon = { <Brightness2 htmlColor = "white" /> }
            checked     = { props.appearance === 'light' ? false : true }
            onChange    = { ( e, isChecked ) => props.onAppearanceChange( isChecked ? 'dark' : 'light' ) } />
        </Toolbar>
      </AppBar>
    </a.div>
  )
}
