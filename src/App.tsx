import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Signup from "./views/Signup";
import Login from "./views/Login";
import CreateAccount from "./views/CreateAccount";
import { ContextMain } from "./context/store";
import Verification from "./views/Verification";
import Secure from "./views/Secure";
import { ROUTES } from "./const/routeNames";
import Dashboard from "./views/Dashboard";
import Unlock from "./views/Unlock";
import Contacts from "./views/Contacts";
import Settings from "./views/Settings";

import { InitAxiosInterceptor } from "./utils/interceptor";
import "./styles.scss";
import DetailContacts from "./views/DetailContact";
import CreateContacts from "./views/CreateContact";
import EditContact from "./views/EditContact";
import Notifications from "./views/Notifications";
import DetailCollectible from "./views/DetailCollectible";
import CreateNTFs from "./views/CreateNTFs";
import ExperiencesDashboard from "./views/ExperiencesDashboard";
import DetailApp from "./views/DetailApp";
import SendToContact from "./views/SendToContact";
import Security from "./views/Security";
import ContactTransactionList from "./views/ContactTransactionList";
import ContactActions from "./views/ContactActions";

const App = () => {
  const navigate = useNavigate();
  const [state] = React.useContext(ContextMain);

  InitAxiosInterceptor(React.useContext(ContextMain));

  useEffect(() => {
    InitAxiosInterceptor([state]);
  }, [state]);

  useEffect(() => {
    if (state.activePage) {
      navigate(state.activePage);
    } else {
      navigate(ROUTES.SIGNUP.url);
    }
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient} contextSharing>
        <Routes>
          <Route path={ROUTES.LOGIN.url} element={<Login />} />
          <Route path={ROUTES.SIGNUP.url} element={<Signup />} />
          <Route path={ROUTES.CREATE_ACCT.url} element={<CreateAccount />} />
          <Route path={ROUTES.VERIFICATION.url} element={<Verification />} />
          <Route path={ROUTES.SECURE.url} element={<Secure />} />
          {/* <Route path={ROUTES. SEED_PHRASE.url} element={<SeedPhrasePage />} /> */}
          <Route path={ROUTES.DASHBOARD.url} element={<Dashboard />} />
          <Route path={ROUTES.UNLOCK.url} element={<Unlock />} />
          <Route path={ROUTES.CONTACTS.url} element={<Contacts />} />
          <Route
            path={ROUTES.DETAIL_CONTACT.url}
            element={<DetailContacts />}
          />
          <Route
            path={ROUTES.CREATE_CONTACT.url}
            element={<CreateContacts />}
          />

          <Route
            path={ROUTES.CONTACT_TRANSACTIONS.url}
            element={<ContactTransactionList />}
          />
          <Route path={ROUTES.EDIT_CONTACT.url} element={<EditContact />} />
          <Route path={ROUTES.NOTIFICATION.url} element={<Notifications />} />
          <Route path={ROUTES.SETTINGS.url} element={<Settings />} />
          <Route
            path={ROUTES.DETAIL_COLLECTIBLE.url}
            element={<DetailCollectible />}
          />
          <Route path={ROUTES.CREATE_NFT.url} element={<CreateNTFs />} />
          <Route path={ROUTES.DETAIL_APP.url} element={<DetailApp />} />
          <Route
            path={ROUTES.SEND_TO_CONTACT.url}
            element={<SendToContact />}
          />
          <Route
            path={ROUTES.CONTACT_ACTIONS.url}
            element={<ContactActions />}
          />
          <Route
            path={ROUTES.EXPERIENCES_DASHBOARD.url}
            element={<ExperiencesDashboard />}
          />
          <Route path={ROUTES.SECURITY.url} element={<Security />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};

export default App;
