/* eslint-disable react/display-name */

// ----------------------------------------------------------------------

import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Tooltip, ListItemText, Link } from '@mui/material';
//
import Iconify from '@/components/iconify';
import { NavItemProps } from '../types';
import { StyledItem, StyledIcon } from './styles';

// ----------------------------------------------------------------------

const NavItem = forwardRef<HTMLDivElement, NavItemProps>(
  ({ item, depth, open, active, isExternalLink, ...other }, ref) => {
    const { title, path, icon, info, children, disabled, caption } = item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        dir="ltr"
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        {...other}
      >
        {icon && <StyledIcon>{icon}</StyledIcon>}

        <ListItemText
          primary={title}
          primaryTypographyProps={{
            noWrap: true,
            component: 'span',
            variant: active ? 'subtitle1' : 'subtitle2',
          }}
        />

        {info && (
          <Box component="span" sx={{ mr: 1, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow>
            <Box component="span" sx={{ mr: 0.5, lineHeight: 0 }}>
              <Iconify icon="eva:info-outline" width={16} />
            </Box>
          </Tooltip>
        )}

        {!!children && (
          <Iconify
            icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
            width={16}
            sx={{ mr: 0.5, flexShrink: 0 }}
          />
        )}
      </StyledItem>
    );

    const renderItem = () => {
      // ExternalLink
      if (isExternalLink)
        return (
          <Link href={path} target="_blank" rel="noopener" underline="none">
            {renderContent}
          </Link>
        );

      // Default
      return (
        <Link component={NextLink} href={path} underline="none">
          {renderContent}
        </Link>
      );
    };

    return <> {renderItem()} </>;
  }
);

export default NavItem;
