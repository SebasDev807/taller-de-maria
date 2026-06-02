export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  imageAlt?: string;
  badge?: string;
  isFeatured?: boolean;
  shortDescription?: string;
  icon?: string;
}

export const mockProducts: Product[] = [
  {
    id: "prod-cat-001",
    name: "Olive Wood Rosary of Peace",
    price: 45.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR1PaO6QbfYC3VW4WIf23YgRp2crUfQTlXhWt8Z2SjG8utD-kGrDfRfrj2cG5_kY-megwdVjcGNhJwBkdkDXY8ZbgIGOkuj82j5Gj7WYwB9RjB4KU8osELc2vhww5jL9-8Pd9r98HerQADMh0-Q-_LbyLIHxglgrgXVoFHWFTALa41ccR-1b5qzc4c91-6obREGC04lyL-5eQauhv7bcoCnhSgmSaRMSd3sjUVm_f-yJkMOYQiXh7T2ylu2jxJuCs5reRoTDaJaoA",
    imageAlt: "A beautifully crafted olive wood rosary resting on an antique open bible.",
    badge: "Handcrafted",
    isFeatured: true,
    shortDescription: "Hand-carved from genuine Bethlehem olive wood, this exquisite rosary features smooth, tactile beads and a detailed silver-toned crucifix. Designed for daily prayer and lasting devotion."
  },
  {
    id: "prod-cat-002",
    name: "Our Lady of Grace Figure",
    price: 85.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBccRAm38pKomH7axgeTzIg7J1URZqww3RoMD_OTc6rSxEvbs_fokDf1KyqjgdZ7izWfi4qJEf9TV54mgZvslFOFnOcjf8SPUQRQRDmzoWpSJdVuoPhdHBqF8VlEx-InYN7Tz-Jdr_5khTLNcOvF9iD_ozwoUK6LHQYDKg6_72y7uN29CQC8Ahgjqd1gIaMjXIvBxd3az4pmLxXd0nOKd4LWTS1l3mOZOLSW0DZ86Ms2eQk8sRhpvCbZ68AOPwKsvvShe77HNjevpk",
    imageAlt: "A minimalist, elegantly carved stone statue of the Virgin Mary against a stark, pure white background.",
    shortDescription: "Resin carving, 12 inches"
  },
  {
    id: "prod-cat-003",
    name: "Classic Wall Crucifix",
    price: 55.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE4twuWvmyf42fhH0fi8INJ65Ds8nrgqTjFcNvQlcEeirz5K6f5iM3cVO3EAtzuKGg_hc__jvyf0bbZ0DxznN3aN9lusxunOsith4ZHiranD-w1GmiNHtk4Q2PEBPkfK68TD2ClX0fX1rbeSLlSM_9VmReyx2pPieh8113p56XSs_T_NZpD61Er6MNHMUIRRrjhKI2apLMEW5RmZ2IUEvNBhG0EhRbSTdtDA8jhhsupAoIAsusgOTJ69WouooRG2dD1e4xm8saca0",
    imageAlt: "A traditional wooden crucifix mounted on a plain, subtly textured plaster wall.",
    shortDescription: "Walnut finish wood, 14 inches"
  },
  {
    id: "prod-cat-004",
    name: "Sacred Heart Framed Print",
    price: 38.00,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuARrollTKs2jbqd7wB34sTmBWnp284AppHXE45vq0kwPsE5VGm6pfXU0KEps1KitRSo-3fDyw-Byc0BXxo2Dt4d-txrIe82qeLbC3Cccy_xEce_MN2GcCp91Bc3mT9vcYC3Eqr_Z0ht_cOAXckQCx3gV0T4b-xYHyLPZjtQVtYIGf1xLf2waADIAjrJXDU0mlcn4OEe_bGISBELoW6Q3dL-yCD8F-auZCUUtGYyuqStbfpDKSzZbYF3pxrLAFFZiiwCULZ47wuBAOQ",
    imageAlt: "A delicate, framed image of the Sacred Heart of Jesus resting on a pristine white marble surface next to a lit votive candle.",
    badge: "Bestseller",
    shortDescription: "Gold leaf frame, 8x10 inches"
  },
  {
    id: "prod-cat-005",
    name: "Leather Bound Devotional",
    price: 60.00,
    icon: "import_contacts",
    shortDescription: "Hand-stitched genuine leather"
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
