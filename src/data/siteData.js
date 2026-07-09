import heroBgImg from '../assets/hero_bg.jpg';
import presidentImg from '../assets/president.jpg';
import secretaryImg from '../assets/secretary.jpg';

// Brochure images
import p1_i1 from '../assets/brochure/page_1_img_1.jpg';
import p1_i2 from '../assets/brochure/page_1_img_2.jpg';
import p1_i4 from '../assets/brochure/page_1_img_4.jpg';
import p2_i6 from '../assets/brochure/page_2_img_6.jpg';
import p2_i7 from '../assets/brochure/page_2_img_7.jpg';
import p2_i12 from '../assets/brochure/page_2_img_12.jpg';
import p3_i1 from '../assets/brochure/page_3_img_1.jpg';
import p3_i20 from '../assets/brochure/page_3_img_20.jpg';
import p3_i26 from '../assets/brochure/page_3_img_26.jpg';
import p4_i1 from '../assets/brochure/page_4_img_1.jpg';
import p4_i15 from '../assets/brochure/page_4_img_15.jpg';
import p4_i27 from '../assets/brochure/page_4_img_27.jpg';
import p5_i1 from '../assets/brochure/page_5_img_1.jpg';
import p5_i17 from '../assets/brochure/page_5_img_17.jpg';
import p5_i27 from '../assets/brochure/page_5_img_27.jpg';
import p6_i11 from '../assets/brochure/page_6_img_11.jpg';
import p6_i24 from '../assets/brochure/page_6_img_24.jpg';
import p6_i28 from '../assets/brochure/page_6_img_28.jpg';
import p7_i1 from '../assets/brochure/page_7_img_1.jpg';
import p7_i30 from '../assets/brochure/page_7_img_30.jpg';
import p8_i21 from '../assets/brochure/page_8_img_21.jpg';
import p8_i29 from '../assets/brochure/page_8_img_29.jpg';
import p9_i20 from '../assets/brochure/page_9_img_20.jpg';
import p9_i28 from '../assets/brochure/page_9_img_28.jpg';
import p10_i21 from '../assets/brochure/page_10_img_21.jpg';
import p10_i28 from '../assets/brochure/page_10_img_28.jpg';
import p11_i1 from '../assets/brochure/page_11_img_1.jpg';
import p11_i7 from '../assets/brochure/page_11_img_7.jpg';
import p11_i17 from '../assets/brochure/page_11_img_17.jpg';

export const siteData = {
  associationName: "Magra Mariners Association",
  associationAbbr: "MMA",
  founded: 2014,
  
  hero: {
    title: "MAGRA MARINERS ASSOCIATION",
    subtitle: "United by Passion. Driven by Mariners.",
    bgImage: heroBgImg,
    ctaText: "Join Association",
    ctaLink: "#contact",
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
    title: "Official Brochure & Gallery",
    subtitle: "Capturing the green and maroon spirit, achievements, and social welfare",
    brochureUrl: "/Magra-Mariners-Association-Final/MMA_Brochure.pdf",
    images: [
      {
        id: "p2_i6",
        src: p2_i6,
        category: "social-work",
        title: "Orphanage Dress & Football Distribution",
        description: "Distributing clothes and footballs at local orphanages to encourage active sports and joy among youth."
      },
      {
        id: "p2_i7",
        src: p2_i7,
        category: "social-work",
        title: "Sanitation Workers Felicitation",
        description: "Felicitation and cloth distribution for our frontline sanitation workers as a mark of respect."
      },
      {
        id: "p2_i12",
        src: p2_i12,
        category: "social-work",
        title: "Donation to CM Relief Fund",
        description: "Contributing to the Chief Minister's Relief Fund during the Covid-19 pandemic outbreak."
      },
      {
        id: "p3_i26",
        src: p3_i26,
        category: "social-work",
        title: "Hospital Doctors Felicitation",
        description: "Felicitation of doctors and medical health workers at Magra Hospital on Mohun Bagan Day."
      },
      {
        id: "p4_i1",
        src: p4_i1,
        category: "social-work",
        title: "Mohun Bagan Day Tree Plantation",
        description: "Organizing green drives and tree plantation programs to support a clean, sustainable environment."
      },
      {
        id: "p4_i15",
        src: p4_i15,
        category: "blood-donation",
        title: "1st Year Blood Donation Camp",
        description: "Annual voluntary blood donation drive organized by Magra Mariners Association to support local blood banks."
      },
      {
        id: "p4_i27",
        src: p4_i27,
        category: "blood-donation",
        title: "2nd Year Blood Donation Camp",
        description: "Expanding our blood donation camp with overwhelming participation from members and local supporters."
      },
      {
        id: "p6_i11",
        src: p6_i11,
        category: "blood-donation",
        title: "3rd Year Blood Donation Camp",
        description: "Maintaining our social commitment to save lives through regular blood donation drives."
      },
      {
        id: "p7_i30",
        src: p7_i30,
        category: "blood-donation",
        title: "4th Year Blood Donation Camp",
        description: "Our fourth consecutive year camp featuring blood donation, drawing competitions, and childrens awards."
      },
      {
        id: "p3_i1",
        src: p3_i1,
        category: "football",
        title: "I-League Final Match Trip",
        description: "Mariners in full force at Kalyani Stadium supporting our club in the I-League final match."
      },
      {
        id: "p3_i20",
        src: p3_i20,
        category: "football",
        title: "Giant LED Screen Derby Screening",
        description: "Organizing massive live screenings of the I-League Kolkata Derby on LED giant screens for local fans."
      },
      {
        id: "p5_i1",
        src: p5_i1,
        category: "football",
        title: "Supporters Football Tournament",
        description: "Participation and coordination of regional football tournaments promoting sportsmanship."
      },
      {
        id: "p7_i1",
        src: p7_i1,
        category: "football",
        title: "Mohun Bagan Day Football Match",
        description: "Friendly football matches organized in Magra to celebrate the glorious foundation day of our Mother Club."
      },
      {
        id: "p8_i21",
        src: p8_i21,
        category: "football",
        title: "ISL Derby Screening on Giant LED",
        description: "Bringing the electrical atmosphere of the ISL Kolkata Derby directly to Hooghly supporters via giant screenings."
      },
      {
        id: "p5_i17",
        src: p5_i17,
        category: "stadium-visits",
        title: "ISL Away Duty: Bhubaneswar Visit",
        description: "Traveling away to Kalinga Stadium, Bhubaneswar to support MBSG in the match against Odisha FC."
      },
      {
        id: "p5_i27",
        src: p5_i27,
        category: "stadium-visits",
        title: "MBSG Home Matches at VYBK (2022-23)",
        description: "Weekly match trips organized to Salt Lake Stadium (VYBK) for home games in the 2022-23 season."
      },
      {
        id: "p6_i24",
        src: p6_i24,
        category: "stadium-visits",
        title: "ISL Away Duty: Jamshedpur Visit",
        description: "Mariners away duty trip to JRD Tata Sports Complex, Jamshedpur to support Mohun Bagan."
      },
      {
        id: "p6_i28",
        src: p6_i28,
        category: "stadium-visits",
        title: "AFC Cup Away Duty: Dhaka International Trip",
        description: "MMA crossing international borders to Basundhara Kings Arena, Dhaka, Bangladesh for the AFC Cup match."
      },
      {
        id: "p8_i29",
        src: p8_i29,
        category: "stadium-visits",
        title: "ISL Away Duty: Bhubaneswar Match (2023-24)",
        description: "Away match supporter travel organized for MBSG vs Odisha FC in the 2023-24 season."
      },
      {
        id: "p9_i20",
        src: p9_i20,
        category: "stadium-visits",
        title: "ISL Away Duty: Guwahati Trip",
        description: "Away match travel to double back and support MBSG against NorthEast United FC."
      },
      {
        id: "p1_i1",
        src: p1_i1,
        category: "mohun-bagan",
        title: "Official Fan Club Cover",
        description: "Magra Mariners Association registered officially under the West Bengal Society Act in 2014."
      },
      {
        id: "p1_i2",
        src: p1_i2,
        category: "mohun-bagan",
        title: "Official Club Registration",
        description: "West Bengal Society Act Registration No. S0027331."
      },
      {
        id: "p1_i4",
        src: p1_i4,
        category: "mohun-bagan",
        title: "Magra Mariners Crest Design",
        description: "Official flag and emblem representing Magra Mariners supporters club."
      },
      {
        id: "p9_i28",
        src: p9_i28,
        category: "mohun-bagan",
        title: "ISL Championship Final at VYBK (2023-24)",
        description: "Members witnessing the grand ISL Championship victory live inside the Salt Lake Stadium."
      },
      {
        id: "p10_i21",
        src: p10_i21,
        category: "mohun-bagan",
        title: "ISL League Shield Winning Celebration",
        description: "Celebrating the glorious League Shield win at the MMA Clubhouse in Magra."
      },
      {
        id: "p10_i28",
        src: p10_i28,
        category: "mohun-bagan",
        title: "ISL Championship Final (2024-25)",
        description: "Lifting spirits high during the ISL Championship final clash at Salt Lake Stadium."
      },
      {
        id: "p11_i1",
        src: p11_i1,
        category: "mohun-bagan",
        title: "ISL Shield Victory Celebration Rally",
        description: "Organizing a massive celebration rally in Magra to celebrate the League Shield & ISL Championship wins."
      },
      {
        id: "p11_i7",
        src: p11_i7,
        category: "mohun-bagan",
        title: "Mariners Victory Rally in Hooghly",
        description: "Supporters chanting and marching on the streets of Magra with flags and colors."
      },
      {
        id: "p11_i17",
        src: p11_i17,
        category: "mohun-bagan",
        title: "Championship Trophy Celebration",
        description: "Joyous celebration and trophy lifting moments captured in the official brochure."
      }
    ]
  },

  events: {
    title: "Upcoming Events",
    subtitle: "Mark your calendars for the Mariners",
    timeline: [
      {
        key: "1",
        date: "July 26, 2026",
        title: "Under-13 Football Tournament",
        description: "A tournament of 4 teams under 13 years of age, promoting grassroots football in the region.",
        status: "upcoming"
      },
      {
        key: "2",
        date: "October 4, 2026",
        title: "Blood Donation Camp",
        description: "Annual community blood donation initiative held at the MMA Clubhouse.",
        status: "upcoming"
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
    formspreeId: "xvgowpzv", // Change this to your Formspree Form ID
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14693.364426573887!2d88.3695279!3d22.97446545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f893a749f1dbcb%3A0x673dbb108ff1e5cf!2sMogra%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
  }
};
