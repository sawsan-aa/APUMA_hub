import React from 'react';
import { useApp } from '../context/AppContext';
import { DawahWorkspace } from './workspace/DawahWorkspace';
import { DesignWorkspace } from './workspace/DesignWorkspace';
import { ReviewBoard } from './workspace/ReviewBoard';

/** Routes a staff member to their role-specific workspace. */
export const Workspace: React.FC = () => {
  const { currentUser } = useApp();
  const role = currentUser?.role || 'guest';

  if (role === 'dawah') return <DawahWorkspace />;
  if (role === 'design') return <DesignWorkspace />;
  // executive | admin
  return <ReviewBoard />;
};
