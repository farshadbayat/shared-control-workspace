import { MatBadgePosition, MatBadgeSize } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';

export interface Badge {
    badge?: string | number | undefined | null;
    badgeOverlap?: boolean;
    badgeSize?: MatBadgeSize;
    badgePosition?: MatBadgePosition;
    badgeColor?: ThemePalette;
    badgeHidden?: boolean;
    badgeDisabled?: boolean;
}
