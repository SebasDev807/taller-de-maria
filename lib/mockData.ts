export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageAlt: string;
  badge?: string;
  isFeatured?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Rosario de Madera de Olivo",
    price: 45.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsG8enFdWek_DbBBaFoD6-uWHqFynVVSTT4IAqW0mRe1S8bjG-pPAIwHX6Xv7l2lehwIUpg3tfGLIRmR8duE2nJm3oW8sSAOEDRgIuQ5RO3UULx30MpH-bVzGV3BGtDaBCv9lCMPfEyP2ey6WN-Dd-DhdRtkb9J7fP5xYMMbemFJ_gZmtBvbvcNca2frz-ddwI9XRaZbbRtRNtyPzE2ZRb992TvO7matTag4zmHyP_IMqRKBhi_RfDLMSLFr8iwUjCsLDVIc7DPY8",
    imageAlt: "Rosario Artesanal",
    badge: "Hecho a mano",
    isFeatured: true
  },
  {
    id: "prod-002",
    name: "Virgen de la Paz en Porcelana",
    price: 85.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAlfN5GpyQkGXG2aKcl1SF-PEdgdubATGdH17h2nVkrND7jhNAlgWGo6j7yP1_vUt6amDsR1-6M2PvkBZuozD04Yz0-pitMWqnqwhubg2pWWdo2GbX5X_pcd0cz820n11WciTjgtrTMxVyUKJfnBMJs88PFBI7uEzbemDCbNaDV5-4Pm58VTZqwnEMij2Qte2VSqSdSZyLkJh50knZe9Y-hdFjexRxH_ncqUxAlJKcILVjkmnA-YJz_MOQ7oR7CZt_TQSFLp0J0iJM",
    imageAlt: "Figura de la Virgen",
    isFeatured: true
  },
  {
    id: "prod-003",
    name: "Crucifijo Minimalista",
    price: 60.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBu-7U-pQyjJVwi3TKGx9Gjt77T7_R-UAoPUZ0ucg-BEhtlO0GZtdRHypqHR2r1sK2SE54tMIT1XTyC-brmeJF7wPWAzXwkYXQfgCwxTfCjS58BUXMgvZICwvJldJfQAslyG5EUsTSLCvtTDpvqjPAldR0CzUoJIfKUMFcca-9H-O1sL1ndtsDCBYx4GlVZPhp8wjuPX1r9m1jbWLXXPUR5b9W9jzsQ9qKJy6Yl9sNxYci6iErAHJ43PsCwdslS9r18LJQd4UZNCzM",
    imageAlt: "Crucifijo de Pared",
    isFeatured: true
  }
];

export interface DailyContent {
  id: string;
  type: "evangelio" | "oracion";
  title: string;
  text: string;
  icon: string;
  link?: string;
}

export const mockDailyContent: DailyContent[] = [
  {
    id: "dc-001",
    type: "evangelio",
    title: '"Yo soy el camino, la verdad y la vida."',
    text: "En aquel tiempo, Jesús dijo a sus discípulos: «No se inquieten. Crean en Dios y crean también en mí. En la casa de mi Padre hay muchas habitaciones; si no fuera así, se lo habría dicho, porque voy a prepararles un lugar...»",
    icon: "menu_book",
    link: "#"
  },
  {
    id: "dc-002",
    type: "oracion",
    title: '"Señor, concédeme la serenidad para aceptar las cosas que no puedo cambiar, valor para cambiar aquellas que puedo, y sabiduría para reconocer la diferencia."',
    text: "",
    icon: "folded_hands"
  }
];
