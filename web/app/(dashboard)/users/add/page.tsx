"use client"

import React from 'react';
import AddUserForm from './_components/add-user-form';
import { useAppContext } from '@/contexts/app-context';
import dynamic from 'next/dynamic';
import withAuth from '@/utils/withAuth';

const AddUserPage = () => {

  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <></>
  }


  return (
    <AddUserForm />
  );
};

export default dynamic(() => Promise.resolve((AddUserPage)), { ssr: false });