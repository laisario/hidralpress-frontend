import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'
import Router from './routes';
import { UserMediaProvider } from '@vardius/react-user-media';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <UserMediaProvider constraints={{ audio: true, video: true }}> */}
        <Router />
      {/* </UserMediaProvider> */}
    </QueryClientProvider>
  )
}

export default App;
