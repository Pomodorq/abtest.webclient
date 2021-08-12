import { Outlet } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { AppNavbar } from 'components/AppNavbar';
import { Container } from '@material-ui/core';

const LayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  overflow: 'hidden',
  width: '100%',
}));

export const AppLayout = () => {
  return (
    <div>
      <LayoutRoot>
        <AppNavbar />
        <Container>
          <Outlet />
        </Container>
      </LayoutRoot>
    </div>
  );
};
