'use client';
import React, { ReactNode } from 'react';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/MiniCalendar.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import theme from '../theme/theme';
import AppWrapper from 'contexts/appContext';
import MainLayout from './mainLayout';

export default function AppWrappers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AppWrapper>
          <MainLayout>{children}</MainLayout>
        </AppWrapper>
      </ChakraProvider>{' '}
    </CacheProvider>
  );
}
