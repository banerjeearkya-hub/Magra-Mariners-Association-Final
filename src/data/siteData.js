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
    images: [
      {
        id: "g_img_1",
        fileName: "gallery_img_1.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_2",
        fileName: "gallery_img_2.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_3",
        fileName: "gallery_img_3.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_4",
        fileName: "gallery_img_4.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_5",
        fileName: "gallery_img_5.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_6",
        fileName: "gallery_img_6.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_7",
        fileName: "gallery_img_7.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_8",
        fileName: "gallery_img_8.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_9",
        fileName: "gallery_img_9.jpg",
        category: "blood-donation",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_10",
        fileName: "gallery_img_10.jpg",
        category: "blood-donation",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_11",
        fileName: "gallery_img_11.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_12",
        fileName: "gallery_img_12.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_13",
        fileName: "gallery_img_13.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_14",
        fileName: "gallery_img_14.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_15",
        fileName: "gallery_img_15.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_16",
        fileName: "gallery_img_16.jpg",
        category: "blood-donation",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_17",
        fileName: "gallery_img_17.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_18",
        fileName: "gallery_img_18.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_19",
        fileName: "gallery_img_19.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_20",
        fileName: "gallery_img_20.jpg",
        category: "blood-donation",
        title: "ISL Away match travel - Item 20",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_21",
        fileName: "gallery_img_21.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 21",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_22",
        fileName: "gallery_img_22.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 22",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_23",
        fileName: "gallery_img_23.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 23",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_24",
        fileName: "gallery_img_24.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 24",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_25",
        fileName: "gallery_img_25.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 25",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_26",
        fileName: "gallery_img_26.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 26",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_27",
        fileName: "gallery_img_27.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 27",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_28",
        fileName: "gallery_img_28.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 28",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_29",
        fileName: "gallery_img_29.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 29",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_30",
        fileName: "gallery_img_30.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 30",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_31",
        fileName: "gallery_img_31.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 31",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_32",
        fileName: "gallery_img_32.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 32",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_33",
        fileName: "gallery_img_33.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 33",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_34",
        fileName: "gallery_img_34.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 34",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_35",
        fileName: "gallery_img_35.jpg",
        category: "match-day",
        title: "ISL Away match travel - Item 35",
        description: "Supporter travel organized for away matches across different venues."
      },
      {
        id: "g_img_36",
        fileName: "gallery_img_36.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 36",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_37",
        fileName: "gallery_img_37.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 37",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_38",
        fileName: "gallery_img_38.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 38",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_39",
        fileName: "gallery_img_39.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 39",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_40",
        fileName: "gallery_img_40.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 40",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_41",
        fileName: "gallery_img_41.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 41",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_42",
        fileName: "gallery_img_42.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 42",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_43",
        fileName: "gallery_img_43.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 43",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_44",
        fileName: "gallery_img_44.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 44",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_45",
        fileName: "gallery_img_45.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 45",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_46",
        fileName: "gallery_img_46.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 46",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_47",
        fileName: "gallery_img_47.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 47",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_48",
        fileName: "gallery_img_48.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 48",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_49",
        fileName: "gallery_img_49.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 49",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_50",
        fileName: "gallery_img_50.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 50",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_51",
        fileName: "gallery_img_51.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 51",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_52",
        fileName: "gallery_img_52.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 52",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_53",
        fileName: "gallery_img_53.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 53",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_54",
        fileName: "gallery_img_54.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 54",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_55",
        fileName: "gallery_img_55.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 55",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_56",
        fileName: "gallery_img_56.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 56",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_57",
        fileName: "gallery_img_57.jpg",
        category: "blood-donation",
        title: "Blood Donation Camp - Item 57",
        description: "Organizing voluntary Blood Donation Camps in Magra to support local blood banks and save lives."
      },
      {
        id: "g_img_58",
        fileName: "gallery_img_58.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 58",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_59",
        fileName: "gallery_img_59.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 59",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_60",
        fileName: "gallery_img_60.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 60",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_61",
        fileName: "gallery_img_61.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 61",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_62",
        fileName: "gallery_img_62.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 62",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_63",
        fileName: "gallery_img_63.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 63",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_64",
        fileName: "gallery_img_64.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 64",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_65",
        fileName: "gallery_img_65.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 65",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_66",
        fileName: "gallery_img_66.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 66",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_67",
        fileName: "gallery_img_67.jpg",
        category: "match-day",
        title: "AFC International Duty - Item 67",
        description: "Away travel to Basundhara Kings Arena in Dhaka, Bangladesh supporting our club in the AFC Cup."
      },
      {
        id: "g_img_68",
        fileName: "gallery_img_68.jpg",
        category: "football-development",
        title: "Football Development Event - Item 68",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_69",
        fileName: "gallery_img_69.jpg",
        category: "football-development",
        title: "Football Development Event - Item 69",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_70",
        fileName: "gallery_img_70.jpg",
        category: "football-development",
        title: "Football Development Event - Item 70",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_71",
        fileName: "gallery_img_71.jpg",
        category: "football-development",
        title: "Football Development Event - Item 71",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_72",
        fileName: "gallery_img_72.jpg",
        category: "football-development",
        title: "Football Development Event - Item 72",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_73",
        fileName: "gallery_img_73.jpg",
        category: "football-development",
        title: "Football Development Event - Item 73",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_74",
        fileName: "gallery_img_74.jpg",
        category: "football-development",
        title: "Football Development Event - Item 74",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_75",
        fileName: "gallery_img_75.jpg",
        category: "football-development",
        title: "Football Development Event - Item 75",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_76",
        fileName: "gallery_img_76.jpg",
        category: "football-development",
        title: "Football Development Event - Item 76",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_77",
        fileName: "gallery_img_77.jpg",
        category: "football-development",
        title: "Football Development Event - Item 77",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_78",
        fileName: "gallery_img_78.jpg",
        category: "football-development",
        title: "Football Development Event - Item 78",
        description: "Promoting grassroots football, participating in local tournaments, and training youth."
      },
      {
        id: "g_img_79",
        fileName: "gallery_img_79.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_80",
        fileName: "gallery_img_80.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_81",
        fileName: "gallery_img_81.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 81",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_82",
        fileName: "gallery_img_82.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 82",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_83",
        fileName: "gallery_img_83.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 83",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_84",
        fileName: "gallery_img_84.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 84",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_85",
        fileName: "gallery_img_85.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 85",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_86",
        fileName: "gallery_img_86.jpg",
        category: "match-day",
        title: "ISL Away Duty Jamshedpur - Item 86",
        description: "Away match duties in Jamshedpur supporting Mohun Bagan."
      },
      {
        id: "g_img_87",
        fileName: "gallery_img_87.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 87",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_88",
        fileName: "gallery_img_88.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 88",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_89",
        fileName: "gallery_img_89.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 89",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_90",
        fileName: "gallery_img_90.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 90",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_91",
        fileName: "gallery_img_91.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 91",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_92",
        fileName: "gallery_img_92.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 92",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_93",
        fileName: "gallery_img_93.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 93",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_94",
        fileName: "gallery_img_94.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 94",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_95",
        fileName: "gallery_img_95.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 95",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_96",
        fileName: "gallery_img_96.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 96",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_97",
        fileName: "gallery_img_97.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 97",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_98",
        fileName: "gallery_img_98.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 98",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_99",
        fileName: "gallery_img_99.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 99",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_100",
        fileName: "gallery_img_100.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 100",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_101",
        fileName: "gallery_img_101.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 101",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_102",
        fileName: "gallery_img_102.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 102",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_103",
        fileName: "gallery_img_103.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 103",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_104",
        fileName: "gallery_img_104.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 104",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_105",
        fileName: "gallery_img_105.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 105",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_106",
        fileName: "gallery_img_106.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 106",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_107",
        fileName: "gallery_img_107.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 107",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_108",
        fileName: "gallery_img_108.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 108",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_109",
        fileName: "gallery_img_109.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 109",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_110",
        fileName: "gallery_img_110.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 110",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_111",
        fileName: "gallery_img_111.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 111",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_112",
        fileName: "gallery_img_112.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 112",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_113",
        fileName: "gallery_img_113.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 113",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_114",
        fileName: "gallery_img_114.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 114",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_115",
        fileName: "gallery_img_115.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 115",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_116",
        fileName: "gallery_img_116.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 116",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_117",
        fileName: "gallery_img_117.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 117",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_118",
        fileName: "gallery_img_118.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 118",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_119",
        fileName: "gallery_img_119.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 119",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_120",
        fileName: "gallery_img_120.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 120",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_121",
        fileName: "gallery_img_121.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 121",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_122",
        fileName: "gallery_img_122.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 122",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_123",
        fileName: "gallery_img_123.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 123",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_124",
        fileName: "gallery_img_124.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 124",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_125",
        fileName: "gallery_img_125.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 125",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_126",
        fileName: "gallery_img_126.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 126",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_127",
        fileName: "gallery_img_127.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 127",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_128",
        fileName: "gallery_img_128.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 128",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_129",
        fileName: "gallery_img_129.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 129",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_130",
        fileName: "gallery_img_130.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 130",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_131",
        fileName: "gallery_img_131.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 131",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_132",
        fileName: "gallery_img_132.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 132",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_133",
        fileName: "gallery_img_133.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 133",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_134",
        fileName: "gallery_img_134.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 134",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_135",
        fileName: "gallery_img_135.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 135",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_136",
        fileName: "gallery_img_136.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 136",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_137",
        fileName: "gallery_img_137.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 137",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_138",
        fileName: "gallery_img_138.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 138",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_139",
        fileName: "gallery_img_139.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 139",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_140",
        fileName: "gallery_img_140.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 140",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_141",
        fileName: "gallery_img_141.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 141",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_142",
        fileName: "gallery_img_142.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 142",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_143",
        fileName: "gallery_img_143.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 143",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_144",
        fileName: "gallery_img_144.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 144",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_145",
        fileName: "gallery_img_145.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 145",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_146",
        fileName: "gallery_img_146.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 146",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_147",
        fileName: "gallery_img_147.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 147",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_148",
        fileName: "gallery_img_148.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 148",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_149",
        fileName: "gallery_img_149.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 149",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_150",
        fileName: "gallery_img_150.jpg",
        category: "mohun-bagan",
        title: "Mohun Bagan Celebration - Item 150",
        description: "Celebrating championships, foundation day, and historic victory moments in Magra."
      },
      {
        id: "g_img_151",
        fileName: "gallery_img_151.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_152",
        fileName: "gallery_img_152.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_153",
        fileName: "gallery_img_153.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_154",
        fileName: "gallery_img_154.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_155",
        fileName: "gallery_img_155.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_156",
        fileName: "gallery_img_156.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_157",
        fileName: "gallery_img_157.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_158",
        fileName: "gallery_img_158.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_159",
        fileName: "gallery_img_159.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_160",
        fileName: "gallery_img_160.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_161",
        fileName: "gallery_img_161.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_162",
        fileName: "gallery_img_162.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_163",
        fileName: "gallery_img_163.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_164",
        fileName: "gallery_img_164.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 164",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_165",
        fileName: "gallery_img_165.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 165",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_166",
        fileName: "gallery_img_166.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 166",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_167",
        fileName: "gallery_img_167.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 167",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_168",
        fileName: "gallery_img_168.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 168",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_169",
        fileName: "gallery_img_169.jpg",
        category: "match-day",
        title: "ISL Away Duty Guwahati - Item 169",
        description: "Away match trip to Guwahati supporting our team against NEUFC."
      },
      {
        id: "g_img_170",
        fileName: "gallery_img_170.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_171",
        fileName: "gallery_img_171.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_172",
        fileName: "gallery_img_172.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_173",
        fileName: "gallery_img_173.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_174",
        fileName: "gallery_img_174.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_175",
        fileName: "gallery_img_175.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_176",
        fileName: "gallery_img_176.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 176",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_177",
        fileName: "gallery_img_177.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 177",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_178",
        fileName: "gallery_img_178.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 178",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_179",
        fileName: "gallery_img_179.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 179",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_180",
        fileName: "gallery_img_180.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 180",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_181",
        fileName: "gallery_img_181.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 181",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_182",
        fileName: "gallery_img_182.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 182",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_183",
        fileName: "gallery_img_183.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 183",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_184",
        fileName: "gallery_img_184.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 184",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_185",
        fileName: "gallery_img_185.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 185",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_186",
        fileName: "gallery_img_186.jpg",
        category: "match-day",
        title: "VYBK Stadium Match Visit - Item 186",
        description: "Regular match travels organized to Salt Lake Stadium (VYBK) for home matches."
      },
      {
        id: "g_img_187",
        fileName: "gallery_img_187.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_188",
        fileName: "gallery_img_188.jpg",
        category: "match-day",
        title: "Match Day Memory",
        description: "Capturing the electric atmosphere and memories of our match day journey."
      },
      {
        id: "g_img_189",
        fileName: "gallery_img_189.jpg",
        category: "social-welfare",
        title: "Orphanage & Youth Welfare - Item 189",
        description: "Visiting orphanages and distributing football kits and clothes to encourage sports and charity."
      },
      {
        id: "g_img_190",
        fileName: "gallery_img_190.jpg",
        category: "social-welfare",
        title: "Orphanage & Youth Welfare - Item 190",
        description: "Visiting orphanages and distributing football kits and clothes to encourage sports and charity."
      },
      {
        id: "g_img_191",
        fileName: "gallery_img_191.jpg",
        category: "social-welfare",
        title: "Orphanage & Youth Welfare - Item 191",
        description: "Visiting orphanages and distributing football kits and clothes to encourage sports and charity."
      },
      {
        id: "g_img_192",
        fileName: "gallery_img_192.jpg",
        category: "social-welfare",
        title: "Orphanage & Youth Welfare - Item 192",
        description: "Visiting orphanages and distributing football kits and clothes to encourage sports and charity."
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
    formspreeId: "xvgowpzv",
    googleMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14693.364426573887!2d88.3695279!3d22.97446545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f893a749f1dbcb%3A0x673dbb108ff1e5cf!2sMogra%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
  }
};
