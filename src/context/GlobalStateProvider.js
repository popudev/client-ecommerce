import AuthenProvider from './AuthenProvider';
import CheckOutProvider from './CheckOutProvider';
import FilterProvider from './FilterProvider';
import RecoverProvider from './RecoverProvider';

export default function GlobalStateProvider({ children }) {
  return (
    <AuthenProvider>
      <FilterProvider>
        <RecoverProvider>
          <CheckOutProvider>{children}</CheckOutProvider>
        </RecoverProvider>
      </FilterProvider>
    </AuthenProvider>
  );
}
