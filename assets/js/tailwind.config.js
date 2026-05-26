tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface": "#131314", "surface-dim": "#131314", "surface-bright": "#3a393a",
        "surface-container-lowest": "#0e0e0f", "surface-container-low": "#1c1b1c",
        "surface-container": "#201f20", "surface-container-high": "#2a2a2b",
        "surface-container-highest": "#353436", "surface-variant": "#353436",
        "on-surface": "#e5e2e3", "on-surface-variant": "#b9caca",
        "inverse-surface": "#e5e2e3", "inverse-on-surface": "#313031",
        "outline": "#849495", "outline-variant": "#3a494a", "surface-tint": "#00dce5",
        "primary": "#e9feff", "on-primary": "#003739",
        "primary-container": "#00f5ff", "on-primary-container": "#006c71",
        "inverse-primary": "#00696e", "primary-fixed": "#63f7ff", "primary-fixed-dim": "#00dce5",
        "on-primary-fixed": "#002021", "on-primary-fixed-variant": "#004f53",
        "secondary": "#b3c5ff", "on-secondary": "#002b75",
        "secondary-container": "#0266ff", "on-secondary-container": "#f9f7ff",
        "secondary-fixed": "#dae1ff", "secondary-fixed-dim": "#b3c5ff",
        "on-secondary-fixed": "#001849", "on-secondary-fixed-variant": "#003fa4",
        "tertiary": "#fafaf9", "on-tertiary": "#2f3131",
        "tertiary-container": "#dedddd", "on-tertiary-container": "#606161",
        "tertiary-fixed": "#e3e2e2", "tertiary-fixed-dim": "#c7c6c6",
        "on-tertiary-fixed": "#1a1c1c", "on-tertiary-fixed-variant": "#464747",
        "error": "#ffb4ab", "on-error": "#690005",
        "error-container": "#93000a", "on-error-container": "#ffdad6",
        "background": "#131314", "on-background": "#e5e2e3"
      },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
      spacing: { "container-max": "1440px", "gutter": "24px", "margin-desktop": "64px", "margin-mobile": "20px", "base": "8px" },
      fontFamily: { "label-md": ["JetBrains Mono"], "headline-md": ["Sora"], "headline-sm": ["Sora"], "headline-lg-mobile": ["Sora"], "headline-lg": ["Sora"], "body-lg": ["Inter"], "body-md": ["Inter"], "label-sm": ["JetBrains Mono"] },
      fontSize: {
        "label-md": ["14px", {"lineHeight":"1.4","fontWeight":"500"}],
        "headline-md": ["32px", {"lineHeight":"1.2","fontWeight":"600"}],
        "headline-sm": ["24px", {"lineHeight":"1.3","fontWeight":"600"}],
        "headline-lg-mobile": ["32px", {"lineHeight":"1.2","letterSpacing":"-0.02em","fontWeight":"700"}],
        "headline-lg": ["48px", {"lineHeight":"1.1","letterSpacing":"-0.02em","fontWeight":"700"}],
        "body-lg": ["18px", {"lineHeight":"1.6","fontWeight":"400"}],
        "body-md": ["16px", {"lineHeight":"1.6","fontWeight":"400"}],
        "label-sm": ["12px", {"lineHeight":"1.4","fontWeight":"400"}]
      }
    }
  }
};
