/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SITE_URL: string;
  readonly VITE_WHATSAPP_NUMBER: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_META_PIXEL_ID: string;
  readonly VITE_CONTACT_EMAIL: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_CONTACT_ADDRESS: string;
  readonly VITE_CONTACT_MAP_EMBED_URL: string;
  readonly VITE_VIEW_WHATSAPP_NUMBER: string;
  readonly VITE_SOCIAL_INSTAGRAM: string;
  readonly VITE_SOCIAL_LINKEDIN: string;
  readonly VITE_SOCIAL_YOUTUBE: string;
  readonly VITE_SOCIAL_FACEBOOK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const src: string;
  export default src;
}
