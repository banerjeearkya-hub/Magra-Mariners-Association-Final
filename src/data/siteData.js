import heroBgImg from '../assets/hero_bg.jpg';
import presidentImg from '../assets/president.jpg';
import secretaryImg from '../assets/secretary.jpg';

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
      }
    ],
    executiveMembers: [
      "Indrajit Sinha",
      "Arijit Ghosh",
      "Kartick Bhattacharjee",
      "Biplob Ghosh",
      "Aditya Pandey",
      "Arnab Mukherjee",
      "Arup Kundu",
      "Bablu Pal",
      "Soumya Batyabal",
      "Ayan Mukherjee",
      "Raja Nath",
      "Sayak Mitra",
      "Shubham Neogi",
      "Subhajit Das",
      "Tarasankar Ghosh"
    ]
  },

  gallery: {
    title: "Moments of Pride",
    subtitle: "Capturing the green and maroon spirit in action",
    images: []
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
