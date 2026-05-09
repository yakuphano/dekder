export type Founder = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
};

export const founders: Founder[] = [
  {
    id: "1",
    firstName: "Örnek",
    lastName: "Yönetici",
    role: "Kurucu Başkan",
    bio: "Eleşkirt kökenli, sivil toplum ve kültürel miras alanlarında yıllardır gönüllü çalışmalar yürütmektedir.",
  },
  {
    id: "2",
    firstName: "Örnek",
    lastName: "Üye",
    role: "Kurucu Üye",
    bio: "Yerel tarih ve kültür projelerinde aktif; derneğin kuruluş sürecinde öncü rol üstlenmiştir.",
  },
  {
    id: "3",
    firstName: "Örnek",
    lastName: "Üye",
    role: "Kurucu Üye",
    bio: "Eğitim ve gençlik programlarında deneyimli; dayanışma ağının güçlenmesine katkı sağlamaktadır.",
  },
  {
    id: "4",
    firstName: "Örnek",
    lastName: "Üye",
    role: "Kurucu Üye",
    bio: "Sosyal yardım ve organizasyon süreçlerinde görev almakta; şeffaflık ve hesap verebilirliği ön planda tutmaktadır.",
  },
];
