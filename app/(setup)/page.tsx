import React from 'react';
import { redirect } from 'next/navigation';
import { initialProfile } from '../../lib/initial-profile';
import { db } from "../../lib/db";
import { InitialModal } from '@/components/modals/initial-modal';

const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {  
    return redirect('/sign-in'); // Redirect to 
  }

  // Find the server based on the profileId
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });


  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    <InitialModal />
  );
};

export default SetupPage;
