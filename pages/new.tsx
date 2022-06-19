import RecentlyAdded from '../components/Pages/RecentlyAdded';
import React, { useEffect, useState } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { cp } from 'fs/promises';


export default function () {
  return (
    <>
      <RecentlyAdded />
    </>
  )


}
