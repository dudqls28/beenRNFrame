// src/themes/theme.ts

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
  textSecondary: string;
  headerBackground: string;
  footerBackground: string;
  accent: string;
  error: string;
  success: string;
  cardBackground: string;
  buttonText: string;
  border: string;
  divider: string;
  inactive: string;
}

export interface ThemeSizes {
  headerHeight: number;
  footerHeight: number;
  padding: {
    small: number;
    medium: number;
    large: number;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
    header: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  iconSize: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface ThemeFonts {
  regular: string;
  medium: string;
  bold: string;
}

export interface Theme {
  colors: ThemeColors;
  sizes: ThemeSizes;
  fonts: ThemeFonts;
}

// 기본 테마
export const defaultTheme: Theme = {
  colors: {
    primary: '#FF5A5F', 
    secondary: '#00A699', 
    background: '#FFFFFF',
    surface: '#F7F7F7',
    text: '#484848', 
    textLight: '#FFFFFF',
    textSecondary: '#767676', 
    headerBackground: '#FFFFFF',
    footerBackground: '#FFFFFF',
    accent: '#008489', 
    error: '#FF5A5F',
    success: '#00A699',
    cardBackground: '#FFFFFF',
    buttonText: '#FFFFFF',
    border: '#DDDDDD', 
    divider: '#EBEBEB',
    inactive: '#B0B0B0',
  },
  sizes: {
    headerHeight: 64,
    footerHeight: 60,
    padding: {
      small: 8,
      medium: 16,
      large: 24
    },
    fontSize: {
      small: 12,
      medium: 14,
      large: 16,
      xlarge: 18, 
      header: 22
    },
    borderRadius: {
      small: 4,
      medium: 8,
      large: 16
    },
    iconSize: {
      small: 16,
      medium: 24,
      large: 32
    }
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System'
  }
};

// 검은색 테마
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#1A1A1A',
    surface: '#2A2A2A',
    text: '#F0F0F0',
    headerBackground: '#1A1A1A',
    footerBackground: '#1A1A1A',
    cardBackground: '#2A2A2A',
    border: '#444444',
    divider: '#333333',
  }
};

// 그린 테마
export const greenTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#27AE60', 
    secondary: '#F39C12', 
    accent: '#2ECC71', 
    headerBackground: '#27AE60',
    footerBackground: '#27AE60',
    error: '#E74C3C',
    success: '#2ECC71', 
  }
};

// 퍼플 테마
export const purpleTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#9B59B6', 
    secondary: '#3498DB', 
    accent: '#8E44AD', 
    headerBackground: '#9B59B6',
    footerBackground: '#9B59B6',
    error: '#E74C3C', 
    success: '#2ECC71', 
  }
};

// 현재 사용할 테마
export const theme: Theme = defaultTheme;