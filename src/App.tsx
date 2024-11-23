import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner';
import { ControlLayout } from './layouts/ControlLayout';
import AuthButton from './components/auth/AuthButton';
import Widget from './components/widget';

const App = () => {
   
  return <QueryClientProvider client={queryClient}>
      <ControlLayout>
        <AuthButton/>
        <Widget/>
      </ControlLayout>
      <Toaster />
    </QueryClientProvider>
};

export default App;










