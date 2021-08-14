import { Outlet } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { AppNavbar } from 'components/AppNavbar';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

const LayoutContent = styled('div')(({ theme }) => ({
  height: '95%',
  overflow: 'auto',
  width: '100%',
}));

export const AppLayout = () => {
  return (
    <div>
      <LayoutRoot>
        <AppNavbar />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </LayoutRoot>
    </div>
  );
};
