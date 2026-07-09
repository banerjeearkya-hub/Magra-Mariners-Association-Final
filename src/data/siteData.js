import heroBgImg from '../assets/hero_bg.jpg';
import presidentImg from '../assets/president.jpg';
import secretaryImg from '../assets/secretary.jpg';

// Brochure images (Clean event photos only)
import p2_i6 from '../assets/brochure/page_2_img_6.jpg';
import p2_i7 from '../assets/brochure/page_2_img_7.jpg';
import p2_i23 from '../assets/brochure/page_2_img_23.jpg';
import p3_i1 from '../assets/brochure/page_3_img_1.jpg';
import p3_i20 from '../assets/brochure/page_3_img_20.jpg';
import p3_i48 from '../assets/brochure/page_3_img_48.jpg';
import p3_i53 from '../assets/brochure/page_3_img_53.jpg';
import p4_i1 from '../assets/brochure/page_4_img_1.jpg';
import p4_i15 from '../assets/brochure/page_4_img_15.jpg';
import p4_i30 from '../assets/brochure/page_4_img_30.jpg';
import p4_i49 from '../assets/brochure/page_4_img_49.jpg';
import p5_i1 from '../assets/brochure/page_5_img_1.jpg';
import p5_i17 from '../assets/brochure/page_5_img_17.jpg';
import p5_i32 from '../assets/brochure/page_5_img_32.jpg';
import p5_i50 from '../assets/brochure/page_5_img_50.jpg';
import p6_i11 from '../assets/brochure/page_6_img_11.jpg';
import p6_i24 from '../assets/brochure/page_6_img_24.jpg';
import p6_i56 from '../assets/brochure/page_6_img_56.jpg';
import p7_i1 from '../assets/brochure/page_7_img_1.jpg';
import p7_i58 from '../assets/brochure/page_7_img_58.jpg';
import p8_i21 from '../assets/brochure/page_8_img_21.jpg';
import p8_i37 from '../assets/brochure/page_8_img_37.jpg';
import p9_i20 from '../assets/brochure/page_9_img_20.jpg';
import p9_i39 from '../assets/brochure/page_9_img_39.jpg';
import p10_i21 from '../assets/brochure/page_10_img_21.jpg';
import p10_i40 from '../assets/brochure/page_10_img_40.jpg';
import p10_i51 from '../assets/brochure/page_10_img_51.jpg';
import p10_i53 from '../assets/brochure/page_10_img_53.jpg';
import p11_i1 from '../assets/brochure/page_11_img_1.jpg';
import p11_i7 from '../assets/brochure/page_11_img_7.jpg';

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
    title: "Official Photo Gallery",
    subtitle: "Capturing the green and maroon spirit in action",
    brochureUrl: "/Magra-Mariners-Association-Final/MMA_Brochure.pdf",
    images: [
      // 1. Social Welfare Activities
      {
        id: "p2_i6",
        src: p2_i6,
        category: "social-welfare",
        title: "Orphanage Dress & Football Distribution",
        description: "Distributing clothes and footballs at local orphanages to encourage active sports and joy among youth."
      },
      {
        id: "p2_i7",
        src: p2_i7,
        category: "social-welfare",
        title: "Sanitation Workers Felicitation",
        description: "Felicitation and cloth distribution for our frontline sanitation workers as a mark of respect."
      },
      {
        id: "p2_i23",
        src: p2_i23,
        category: "social-welfare",
        title: "CM Relief Fund Contribution",
        description: "Contributing to the Chief Minister's Relief Fund during the Covid-19 pandemic outbreak."
      },
      {
        id: "p3_i48",
        src: p3_i48,
        category: "social-welfare",
        title: "Medical Staff Felicitation",
        description: "Felicitation of doctors and medical health workers at Magra Hospital on Mohun Bagan Day."
      },
      {
        id: "p4_i15",
        src: p4_i15,
        category: "social-welfare",
        title: "1st Year Blood Donation Camp",
        description: "Annual voluntary blood donation drive organized by Magra Mariners Association to support local blood banks."
      },
      {
        id: "p4_i30",
        src: p4_i30,
        category: "social-welfare",
        title: "2nd Year Blood Donation Camp",
        description: "Expanding our blood donation camp with overwhelming participation from members and local supporters."
      },
      {
        id: "p6_i11",
        src: p6_i11,
        category: "social-welfare",
        title: "3rd Year Blood Donation Camp",
        description: "Maintaining our social commitment to save lives through regular blood donation drives."
      },
      {
        id: "p7_i58",
        src: p7_i58,
        category: "social-welfare",
        title: "4th Year Blood Donation Camp",
        description: "Our fourth consecutive year camp featuring blood donation, drawing competitions, and childrens awards."
      },

      // 2. Mohun Bagan Celebration & Fan Activities
      {
        id: "p3_i53",
        src: p3_i53,
        category: "mohun-bagan",
        title: "I-League Winning Celebration",
        description: "Lively and energetic winning celebration for Mohun Bagan at our clubhouse in Magra."
      },
      {
        id: "p4_i1",
        src: p4_i1,
        category: "mohun-bagan",
        title: "Mohun Bagan Day Tree Plantation",
        description: "Organizing green drives and tree plantation programs to support a clean, sustainable environment."
      },
      {
        id: "p5_i32",
        src: p5_i32,
        category: "mohun-bagan",
        title: "Foundation Day Green Drive",
        description: "Tree planting and community environmental campaign by Magra Mariners Association."
      },
      {
        id: "p8_i37",
        src: p8_i37,
        category: "mohun-bagan",
        title: "Fan Club Gathering & Screenings",
        description: "Members gathering to celebrate matchdays and support the club on screen."
      },
      {
        id: "p10_i21",
        src: p10_i21,
        category: "mohun-bagan",
        title: "ISL League Shield Winning Celebration",
        description: "Celebrating the glorious League Shield win at the MMA Clubhouse in Magra."
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

      // 3. Match Day Memories
      {
        id: "p3_i1",
        src: p3_i1,
        category: "match-day",
        title: "I-League Final Match Trip",
        description: "Mariners in full force at Kalyani Stadium supporting our club in the I-League final match."
      },
      {
        id: "p3_i20",
        src: p3_i20,
        category: "match-day",
        title: "Giant LED Screen Derby Screening",
        description: "Organizing massive live screenings of the I-League Kolkata Derby on LED giant screens for local fans."
      },
      {
        id: "p4_i49",
        src: p4_i49,
        category: "match-day",
        title: "ISL Derby Match Visit at VYBK",
        description: "Stadium duty trip organized for local fans to cheer Mohun Bagan in the Derby at Salt Lake Stadium."
      },
      {
        id: "p5_i17",
        src: p5_i17,
        category: "match-day",
        title: "ISL Away Duty: Bhubaneswar Visit",
        description: "Traveling away to Kalinga Stadium, Bhubaneswar to support MBSG in the match against Odisha FC."
      },
      {
        id: "p5_i50",
        src: p5_i50,
        category: "match-day",
        title: "MBSG Home Matches at VYBK (2022-23)",
        description: "Weekly match trips organized to Salt Lake Stadium (VYBK) for home games in the 2022-23 season."
      },
      {
        id: "p6_i24",
        src: p6_i24,
        category: "match-day",
        title: "ISL Away Duty: Jamshedpur Visit",
        description: "Mariners away duty trip to JRD Tata Sports Complex, Jamshedpur to support Mohun Bagan."
      },
      {
        id: "p8_i21",
        src: p8_i21,
        category: "match-day",
        title: "ISL Derby Screening on Giant LED",
        description: "Bringing the electrical atmosphere of the ISL Kolkata Derby directly to Hooghly supporters via giant screenings."
      },
      {
        id: "p9_i20",
        src: p9_i20,
        category: "match-day",
        title: "ISL Championship Final at VYBK",
        description: "Members witnessing the grand ISL Championship victory live inside the Salt Lake Stadium."
      },
      {
        id: "p9_i39",
        src: p9_i39,
        category: "match-day",
        title: "ISL Away Duty: Guwahati Trip",
        description: "Away match travel to double back and support MBSG against NorthEast United FC."
      },
      {
        id: "p10_i40",
        src: p10_i40,
        category: "match-day",
        title: "Matchday Screening and Gathering",
        description: "Local supporters screening match and cheering on the Mariners."
      },
      {
        id: "p10_i51",
        src: p10_i51,
        category: "match-day",
        title: "League Shield Final at VYBK",
        description: "Supporters attending the League Shield final match live inside Salt Lake Stadium."
      },
      {
        id: "p10_i53",
        src: p10_i53,
        category: "match-day",
        title: "ISL Championship Final (2024-25)",
        description: "Lifting spirits high during the ISL Championship final clash at Salt Lake Stadium."
      },

      // 4. AFC International Memories
      {
        id: "p6_i56",
        src: p6_i56,
        category: "afc-international",
        title: "AFC Cup Away Duty: Dhaka Trip",
        description: "MMA crossing international borders to Basundhara Kings Arena, Dhaka, Bangladesh for the AFC Cup match."
      },

      // 5. Football Development Activities
      {
        id: "p5_i1",
        src: p5_i1,
        category: "football-development",
        title: "Supporters Football Tournament",
        description: "Participation and coordination of regional football tournaments promoting sportsmanship."
      },
      {
        id: "p7_i1",
        src: p7_i1,
        category: "football-development",
        title: "Mohun Bagan Day Football Match",
        description: "Friendly football matches organized in Magra to celebrate the glorious foundation day of our Mother Club."
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
