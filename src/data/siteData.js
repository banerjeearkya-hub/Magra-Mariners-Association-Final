import heroBgImg from '../assets/hero_bg.jpg';
import presidentImg from '../assets/president.jpg';
import secretaryImg from '../assets/secretary.jpg';
import brochureThumb from '../assets/brochure/page_1_img_1.jpg';


export const siteData = {
  associationName: "Magra Mariners Association",
  associationAbbr: "MMA",
  founded: 2014,
  
  hero: {
    title: "MAGRA MARINERS ASSOCIATION",
    subtitle: "United by Passion. Driven by Mariners.",
    bgImage: heroBgImg,
    ctaText: "Join Association",
    ctaLink: "https://docs.google.com/forms/d/e/1FAIpQLSfXPSrKrwspz8O48yFohvD2SqNnFkUHTdCs3mIlhVU8pu0cYQ/viewform?usp=sharing&ouid=100073082722532687211",
    secondaryText: "Learn More",
    secondaryLink: "#about"
  },

  about: {
    title: "About Our Association",
    subtitle: "A Legacy of Passion and Loyalty",
    description: [
      "Magra Mariners Association (MMA) is the premier official supporters group based in Magra, Hooghly, dedicated to the legendary Mohun Bagan Athletic Club. Founded in 2014, we began as a tight-knit circle of local football enthusiasts and have since evolved into a proud and thriving community of hundreds of Mariners.",
      "Our mission is to unite football fans in the region, keep the spirit of Mohun Bagan alive, and support the club through thick and thin. We organize grand match screenings, group travel to the stadium for home matches, annual football tournaments, and social welfare programs. MMA stands as a beacon of sportsmanship, unity, and local pride.",
      "As a recognized supporters association, we also work towards promoting grassroots football among local youth, encouraging active sports participation, and organizing charity events that give back to our community in Magra."
    ]
  },

  committee: {
    title: "Executive Committee",
    subtitle: "Leading the Mariners with Pride",
    members: [
      {
        id: "president",
        name: "Prasenjit Chakrabarty",
        position: "President",
        image: presidentImg,
        bio: "Veteran supporter and local coordinator. Leading the association from the front, overseeing all club relations and governance.",
        socials: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          email: "associationmagramariners@gmail.com"
        }
      },
      {
        id: "secretary",
        name: "Dr. Kunal Batyabal",
        position: "Secretary",
        image: secretaryImg,
        bio: "Distinguished academic and passionate football administrator. Managing operations, events, and community outreach.",
        socials: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          email: "associationmagramariners@gmail.com"
        }
      },
      {
        id: "vice_president",
        name: "Tarashankar Ghosh",
        position: "Vice President",
        image: presidentImg,
        bio: "Dedicated administrator overseeing organizational strategy and supporter coordination.",
        socials: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          email: "associationmagramariners@gmail.com"
        }
      },
      {
        id: "assistant_secretary",
        name: "Ayan Mukherjee",
        position: "Assistant Secretary",
        image: secretaryImg,
        bio: "Active coordinator assisting in daily administrative operations and supporter outreach.",
        socials: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          linkedin: "https://linkedin.com",
          email: "associationmagramariners@gmail.com"
        }
      }
    ],
    executiveMembers: [
      { name: "Arijit Ghosh", position: "Cashier" },
      { name: "Indrajit Sinha", position: "Convenor" },
      { name: "Arnab Mukherjee", position: "Social Media Head & Assistant Cashier" },
      { name: "Kartick Bhattacharjee", position: "Executive Member" },
      { name: "Biplob Ghosh", position: "Executive Member" },
      { name: "Aditya Pandey", position: "Assistant Cashier" },
      { name: "Arup Kundu", position: "Executive Member" },
      { name: "Bablu Pal", position: "Executive Member" },
      { name: "Soumya Batyabal", position: "Executive Member" },
      { name: "Raja Nath", position: "Executive Member" },
      { name: "Sayak Mitra", position: "Executive Member" },
      { name: "Shubham Neogi", position: "Executive Member" },
      { name: "Subhajit Das", position: "Executive Member" }
    ]
  },

  gallery: {
    title: "Official Photo Gallery",
    subtitle: "Capturing the green and maroon spirit in action",
    brochureUrl: "/Magra-Mariners-Association-Final/MMA_Brochure.pdf",
    images: Object.entries(import.meta.glob('../assets/gallery/*.jpg', { eager: true, import: 'default' }))
      .map(([path, assetUrl], idx) => {
        const fileName = path.split('/').pop();
        let title = 'Association Memory';
        let category = 'match-day';
        let description = 'Captured moment from Magra Mariners Association activities.';

        if (fileName.startsWith('brochure_page_')) {
          const pageNum = fileName.replace('brochure_page_', '').replace('.jpg', '');
          title = `Official Brochure - Page ${pageNum}`;
          category = 'social-welfare';
          description = `Official Association Brochure document page ${pageNum}.`;
        } else if (fileName.startsWith('page_')) {
          title = `Brochure Feature Photo (${fileName.replace('.jpg', '')})`;
          category = 'match-day';
          description = 'Extracted memory photo from the official Magra Mariners Association brochure.';
        } else {
          const num = parseInt(fileName.replace('gallery_img_', '').replace('.jpg', ''), 10) || (idx + 1);
          title = `Association Memory #${num}`;
          if ([9, 10, 16, 20, 24, 28, 35, 42, 50, 65, 80, 95].includes(num)) {
            category = 'blood-donation';
          } else if ([5, 12, 18, 25, 30, 40, 55, 70, 85, 100].includes(num)) {
            category = 'social-welfare';
          }
        }

        return {
          id: `g_img_${idx}_${fileName.replace(/[^a-zA-Z0-9]/g, '_')}`,
          fileName,
          imageUrl: assetUrl,
          category,
          title,
          description
        };
      })
  },

  events: {
    title: "Events & Timeline",
    subtitle: "Mark your calendars and celebrate with the Mariners",
    items: [
      {
        id: "1",
        title: "Under-13 Football Tournament",
        date: "2026-07-26",
        description: "A tournament of 4 teams under 13 years of age, promoting grassroots football in the region."
      },
      {
        id: "2",
        title: "Flag Hosting",
        date: "2026-08-15",
        description: "Annual Independence Day flag hosting ceremony to celebrate the national spirit with fellow Mariners."
      },
      {
        id: "3",
        title: "Annual Voluntary Blood Donation Camp",
        date: "2026-10-04",
        description: "Annual community blood donation initiative held at the MMA Clubhouse in partnership with local blood banks."
      }
    ]
  },

  statistics: [
    { label: "Active Members", value: 100, suffix: "+" },
    { label: "Events Hosted", value: 150, suffix: "+" },
    { label: "Years of Association", value: 12, suffix: "" }
  ],

  contact: {
    title: "Get In Touch",
    subtitle: "Join the crew or send us your queries",
    address: "MMA Clubhouse, Station Road, Magra, Hooghly, West Bengal, Pin - 712148",
    phone: "9475083599 / 8100328580 / 8961702684",
    email: "associationmagramariners@gmail.com",
    formspreeId: "mpqgvkqj",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14693.364426573887!2d88.3695279!3d22.97446545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f893a749f1dbcb%3A0x673dbb108ff1e5cf!2sMogra%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
  }
};
