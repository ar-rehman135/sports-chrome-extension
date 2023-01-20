import React, { FC } from 'react';
import { AvatarProps } from '@mui/material/Avatar';

import AvatarStyled from './Avatar.styles';

/**
 * Reused from mui Avatar component
 * @param props
 * @constructor
 */
const Avatar: FC<AvatarProps> = (props) => {
  return <AvatarStyled {...props} />;
};

export default Avatar;
