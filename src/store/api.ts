import { createAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

interface PayloadType {
  url: string;
  method?: string;
  data?: any;
  onStart?: string;
  onSuccess?: string;
  onError?: string;
}

export const apiCallBegan = createAction<PayloadType>('api/callBegan');
export const apiCallSuccess =
  createAction<AxiosResponse<any>>('api/callSuccess');
export const apiCallFailed = createAction<AxiosResponse<any>>('api/callFailed');
