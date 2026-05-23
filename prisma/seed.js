/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.post.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.galleryImage.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        title: "Genel Kurul Toplantısı Duyurusu",
        content:
          "DEKDER 2026 yılı olağan genel kurul toplantısı, ilçe kültür merkezinde 15 Haziran saat 14:00'te yapılacaktır. Tüm üyelerimiz davetlidir.",
        imageUrl: null,
      },
      {
        title: "Kış Yardım Kampanyası Başladı",
        content:
          "Eleşkirt ve çevresinde ihtiyaç sahibi ailelere ulaştırmak üzere gıda ve kıyafet yardımı kabul edilmektedir. Bağış ve gönüllülük için iletişim formunu kullanabilirsiniz.",
        imageUrl: null,
      },
      {
        title: "Geleneksel Halk Oyunları Gösterisi",
        content:
          "Derneğimiz gençlik kolunun hazırladığı halk oyunları ekibi, ulusal bayram programında sahne alacaktır. Etkinlik detayları duyurular sayfasından paylaşılacaktır.",
        imageUrl: null,
      },
    ],
  });

  await prisma.donation.createMany({
    data: [
      { donorName: "Ahmet", donorSurname: "Yılmaz", amount: 1000, isAnonymous: false },
      { donorName: "Ayşe", donorSurname: "Demir", amount: 500, isAnonymous: false },
      { donorName: "Mehmet", donorSurname: "Kaya", amount: 2500, isAnonymous: true },
      { donorName: "Fatma", donorSurname: "Şahin", amount: 750, isAnonymous: false },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
