import { apiSlice } from "@/app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      sendOtp: builder.mutation<void, { email: string }>({
        query: (body) => ({
          url: '/api/auth/send-otp/',
          method: 'POST',
          body,
        }),
      }),
      validateOtp: builder.mutation<void, { email: string; otp: string }>({
        query: (body) => ({
          url: '/api/auth/validate-otp/',
          method: 'POST',
          body,
        }),
      }),
    }),
  });
  
  // Export hooks for the two mutations
  export const { useSendOtpMutation, useValidateOtpMutation } = authApiSlice;
  