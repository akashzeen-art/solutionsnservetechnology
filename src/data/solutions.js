import {
  AudioLines,
  Cloud,
  Database,
  Gift,
  Globe,
  Hash,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  Music,
  Phone,
  PhoneCall,
  PhoneMissed,
  PhoneOutgoing,
  Settings,
  Smartphone,
  Wallet,
  Zap,
} from 'lucide-react'

export const categories = [
  {
    id: 'offers-enablement',
    title: 'Offers Enablement',
    icon: Gift,
    accent: '#ea580c',
    gradient: 'linear-gradient(45deg, #c2410c 0%, #f97316 100%)',
    tagline: 'For smarter offers',
    blurb: 'Network capabilities that let operators launch, target and deliver offers in real time.',    intro: 'Enabling Smarter Offers, Powered by Intelligent Network Capabilities.',
    items: [
      {
        id: 'ussd',
        name: 'USSD',
        fullName: 'Unstructured Supplementary Service Data',
        icon: Hash,
        headline: 'Reach every mobile user — instantly',
        summary:
          'Engage users with real-time, interactive menus that work on any device, no internet needed. Perfect for mass reach and frictionless service access.',
      },
      {
        id: 'smsc',
        name: 'SMSC',
        fullName: 'Short Message Service Centre',
        icon: MessageSquare,
        headline: 'Deliver messages that matter — at scale',
        summary:
          'Power your network with lightning-fast, secure SMS delivery for both businesses and subscribers. High throughput. Zero compromise.',
      },
      {
        id: 'dmc',
        name: 'DMC',
        fullName: 'Device Management Centre',
        icon: Database,
        headline: 'Control every device — without lifting a finger',
        summary:
          'Push updates, set configurations, and resolve issues remotely. Smarter device management starts here.',
      },
      {
        id: 'lbs',
        name: 'LBS',
        fullName: 'Location Based Services',
        icon: MapPin,
        headline: 'Right place. Right time. Real results.',
        summary:
          'Send location-targeted messages, trigger instant alerts, or personalize experiences based on where your users are — in real time.',
      },
      {
        id: 'mobicharge',
        name: 'Mobicharge',
        fullName: null,
        icon: Zap,
        summary:
          'A real-time Electronic Voucher Distribution system designed for telecom operators.',
      },
    ],
  },
  {
    id: 'core-vas',
    title: 'Core VAS',
    icon: Settings,
    accent: '#c2410c',
    gradient: 'linear-gradient(45deg, #7c2d12 0%, #c2410c 55%, #ea580c 100%)',
    tagline: 'For seamless calling',
    blurb: 'Call-completion services that keep subscribers connected, even when a call can’t go through.',    intro:
      'We ensure seamless communication even when calls can’t connect — boosting subscriber satisfaction, retention, and network usage.',
    items: [
      {
        id: 'beep-call',
        name: 'Beep Call',
        fullName: null,
        icon: Phone,
        summary:
          'Lets users alert others with a missed call when they’re low on balance or wish to communicate passively.',
      },
      {
        id: 'mcn-cmb',
        name: 'MCN & CMB',
        fullName: 'Missed Call Notification & Call Me Back',
        icon: PhoneMissed,
        summary:
          'Essential call-completion services that keep subscribers informed and connected, even when they can’t take or make a call.',
      },
    ],
  },
  {
    id: 'vas-digital',
    title: 'VAS & Digital',
    icon: Globe,
    accent: '#d97706',
    gradient: 'linear-gradient(45deg, #b45309 0%, #f59e0b 100%)',
    tagline: 'For digital growth',
    blurb: 'Flexible platforms to create, integrate and scale value-added digital services quickly.',    intro:
      'Engineered for flexibility, rapid integration, and high ROI, our platform helps you stay competitive in a fast-evolving digital landscape.',
    items: [
      {
        id: 'sdp',
        name: 'SDP',
        fullName: 'Service Delivery Platform',
        icon: Cloud,
        summary:
          'A centralized platform that streamlines service creation, management, and integration — so operators launch and scale VAS quickly.',
      },
      {
        id: 'wave',
        name: 'WAVE',
        fullName: null,
        icon: AudioLines,
        summary:
          'A next-generation solution for integrating Diameter based and application network elements.',
      },
      {
        id: 'cloud-ivr',
        name: 'Cloud IVR',
        fullName: 'Interactive Voice Response',
        icon: PhoneCall,
        summary:
          'An automated voice-driven system that interacts with callers through menus, keypad input, and speech recognition.',
      },
      {
        id: 'crbt',
        name: 'CRBT',
        fullName: 'Caller Ring Back Tone',
        icon: Music,
        summary:
          'Replaces the standard ringing tone with music, messages, or promotional content — a recurring revenue stream for operators.',
      },
    ],
  },
  {
    id: 'mobile-advertisement',
    title: 'Mobile Advertisement',
    icon: Megaphone,
    accent: '#9a3412',
    gradient: 'linear-gradient(45deg, #9a3412 0%, #dc5a12 55%, #fb923c 100%)',
    tagline: 'For high-reach campaigns',
    blurb: 'Bulk SMS, USSD Push, OBD and Balance + campaigns that reach every mobile user.',    intro:
      'Unlock powerful, high-reach engagement through Balance Plus messages, USSD Push, and Bulk SMS campaigns.',
    items: [
      {
        id: 'bulk-sms',
        name: 'Bulk SMS',
        fullName: null,
        icon: Mail,
        summary:
          'Send large-scale, personalized text messages instantly for marketing, alerts, OTPs, and customer engagement.',
      },
      {
        id: 'balance-plus',
        name: 'Balance +',
        fullName: null,
        icon: Wallet,
        summary:
          'Insert targeted, interactive USSD texts into the response to every USSD balance check.',
      },
      {
        id: 'obd',
        name: 'OBD',
        fullName: 'Outbound Dialing',
        icon: PhoneOutgoing,
        summary:
          'Automated voice calling for promotions, reminders, alerts, and surveys, reaching thousands of users efficiently.',
      },
      {
        id: 'ussd-push',
        name: 'USSD Push',
        fullName: null,
        icon: Smartphone,
        summary:
          'Real-time pop-up messages that deliver interactive alerts, offers, and confirmations to any mobile phone without internet.',
      },
    ],
  },
]

export function findCategory(categoryId) {
  return categories.find((c) => c.id === categoryId) ?? null
}

export function findSolution(categoryId, itemId) {
  const category = categories.find((c) => c.id === categoryId)
  const item = category?.items.find((i) => i.id === itemId)
  return category && item ? { category, item } : null
}
