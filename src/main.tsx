import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Theme } from "@radix-ui/themes";
import { Login } from "./login.tsx";

import "@radix-ui/themes/styles.css";
import "./theme.config.css";
import { Library } from "./library.tsx";
import AuthGuard from "./auth-guard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme radius="large">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route path="/library" element={<Library />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
