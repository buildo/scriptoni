// This script adds "is-desktop", "is-phone" or "is-tablet" class to the root document element

import * as cx from 'classnames';
import mobileDetect from '@buildo/bento/utils/mobileDetect';

const md = mobileDetect();

const deviceClassName = cx({
  'is-desktop': md.isDesktop,
  'is-tablet': md.isTablet,
  'is-phone': md.isPhone
});

// document.documentElement is not supported in every browser, fallback on document.body
const body = (document.documentElement || document.body);

body.className = cx(body.className, deviceClassName);
