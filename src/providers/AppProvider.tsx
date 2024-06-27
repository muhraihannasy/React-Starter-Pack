import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import router from "../routes";
import Environment from "../config/env";

const queryClient = new QueryClient();

function AppProvider() {
   return ( 
    <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />

       { Environment.mode == "dev" &&  <ReactQueryDevtools /> }
    </QueryClientProvider>
   )
}

export default AppProvider;