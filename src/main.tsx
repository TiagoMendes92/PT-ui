import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Environment, Network, type FetchFunction } from "relay-runtime";
import { RelayEnvironmentProvider } from "react-relay";
import { AuthProvider } from "./components/app/AuthContent.context.tsx";
import App from "./components/app/App.tsx";
import ConnectionHandler from "relay-connection-handler-plus";
import RelayDefaultHandlerProvider from "relay-runtime/lib/handlers/RelayDefaultHandlerProvider";

import "./index.css";

const HTTP_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT;

const fetchGraphQL: FetchFunction = async (request, variables) => {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Check if there are any files in variables
  const hasFile = Object.values(variables || {}).some((v) => v instanceof File);

  if (hasFile) {
    // Handle multipart form data for file uploads
    const formData = new FormData();

    const map: Record<number, string[]> = {};
    let fileIndex = 0;
    const filesToAdd: Array<[string, File]> = [];

    Object.entries(variables || {}).forEach(([key, value]) => {
      if (value instanceof File) {
        map[fileIndex] = [`variables.${key}`];
        filesToAdd.push([fileIndex.toString(), value]);
        fileIndex++;
      }
    });

    // Add in correct order: operations first, then map, then files
    formData.append(
      "operations",
      JSON.stringify({ query: request.text, variables })
    );
    formData.append("map", JSON.stringify(map));

    // Add files last
    filesToAdd.forEach(([index, file]) => {
      formData.append(index, file);
    });

    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!resp.ok) {
      throw new Error("Response failed.");
    }
    return await resp.json();
  } else {
    // Handle regular JSON requests
    headers["Content-Type"] = "application/json";

    const resp = await fetch(HTTP_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({ query: request.text, variables }),
    });

    if (!resp.ok) {
      throw new Error("Response failed.");
    }
    return await resp.json();
  }
};

function handlerProvider(handle: string) {
  switch (handle) {
    case "connection":
      return ConnectionHandler;
    default:
      return RelayDefaultHandlerProvider(handle);
  }
}

const environment = new Environment({
  handlerProvider,
  network: Network.create(fetchGraphQL),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RelayEnvironmentProvider>
  </StrictMode>
);
