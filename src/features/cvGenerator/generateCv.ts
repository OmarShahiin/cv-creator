import { apiSlice } from "@/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      generateCV: builder.mutation<void, { full_name: string ,job_description: string,template_id:number}>({
        query: (body) => ({
          url: '/api/resume-builder/',
          method: 'POST',
          body,
        }),
      }),
    }),
  });
  
  // Export hooks for the two mutations
  export const { useGenerateCVMutation } = authApiSlice;
  