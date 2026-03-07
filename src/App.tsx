import { AppProviders } from './app/AppProviders'
import { AppRouter } from './routes/AppRouter'

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

export default App
