import { useColorScheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="mode-light-dark-system">Mode</InputLabel>
      <Select
        labelId="mode-light-dark-system"
        id="mode-light-dark"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
        <MenuItem value="system"> 
            <Box sx = {{display: 'flex', alignItems: 'center', gap: 1}}>
              <SettingsBrightnessIcon fontSize='small'/> System
            </Box>
          </MenuItem>

          <MenuItem value="light">
            <Box sx = {{display: 'flex', alignItems: 'center', gap: 1}}>
              <LightModeIcon fontSize='small'/> Light
            </Box> 
          </MenuItem>

          <MenuItem value="dark"> 
            <Box sx = {{display: 'flex', alignItems: 'center', gap: 1}}>
              <DarkModeIcon fontSize='small'/> Dark
            </Box>
          </MenuItem>

      </Select>
    </FormControl>
  );
}

function App() {
  return (
    <Container  disableGutters maxWidth={false} sx={{height: '100vh',display:'flex', flexDirection: 'column', backgroundColor: 'primary.main'}}>
      <Box sx = {{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trello.appBarheight,
        display: 'flex',
        alignItems: 'center',
      }}>
        <ModeSelect />
      </Box>
      <Box sx = {{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boarBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx = {{
        backgroundColor: 'primary.main',
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems:'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App
