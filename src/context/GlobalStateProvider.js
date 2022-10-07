import AuthenProvider from './AuthenProvider';
import FilterProvider from './FilterProvider';
import RecoverProvider from './RecoverProvider';

export default function GlobalStateProvider({ children }) {
  return (
    <AuthenProvider>
      <FilterProvider>
        <RecoverProvider>{children}</RecoverProvider>
      </FilterProvider>
    </AuthenProvider>
  );
}
