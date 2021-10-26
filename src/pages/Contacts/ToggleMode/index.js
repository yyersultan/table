import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export const ToggleMode = ({mode,setMode,GRID,TABLE}) => {
    const handleModeChange = (_,nextView) => {
        setMode(nextView);
        localStorage.setItem('mode',nextView);
    }
    return (
        <ToggleButtonGroup
            orientation='horizontal'
            value={mode}
            exclusive
            onChange={handleModeChange}
        >
            <ToggleButton value={GRID} aria-label={GRID}>
                <ViewListIcon />
            </ToggleButton>
            <ToggleButton value={TABLE} aria-label={TABLE}>
                <ViewModuleIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}