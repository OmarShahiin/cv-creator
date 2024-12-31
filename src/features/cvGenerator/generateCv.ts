import { apiSlice } from '@/app/api/apiSlice';

export const generateCvSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateCV: builder.mutation<void, { full_name: string; job_description: string; template_id: number }>({
      query: (body) => ({
        url: '/api/resume-builder/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for the two mutations
export const { useGenerateCVMutation } = generateCvSlice;

const updateCvSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateCv: builder.mutation<void, { data: any; id: number }>({
      query: (body) => ({
        url: `/api/resume-builder/${body.id}/`,
        method: 'PATCH',
        body: body.data,
      }),
    }),
  }),
});

// Export hooks for the two mutations
export const { useUpdateCvMutation } = updateCvSlice;
