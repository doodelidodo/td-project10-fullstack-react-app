import React, {useContext, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Context from "../Context";

export default function UserSignOut () {
  const context = useContext(Context.Context)
  useEffect( () => context.actions.signOut());

  return (
    <Redirect to="/" />
  );
}
