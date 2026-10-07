export const ctaText = 'Partner with us for an Exceptional Journey & Let’s Build Exceptional Together'

export const ctaPerks = ['Wonderful experience', 'Quick support', 'Complete access']

export const homeCta = {
  title: 'Unlock smarter telecom — get started with nSERVE now',
  text: 'Let’s talk solutions that grow with your business.',
}

const ussdMenuBuilder = [
  'nSERVE helps operators monetize VAS by providing a “do it easy” USSD menu builder created for operators and third-party VAS providers.',
  'The system lets you create even the most complex USSD-based services through a point-and-click interface — anyone can use it without technical knowledge.',
]

const ussdGatewayFeatures = {
  type: 'features',
  title: 'nSERVE USSD Gateway – Scalable, Reliable, and Fully Customizable',
  items: [
    {
      title: 'Multi-Tenant',
      text: 'Delivering real-time, menu-based services across multiple branded applications natively on mobile devices without requiring apps or logins.',
    },
    {
      title: 'Carrier-Grade Scalability and Reliability',
      text: 'Built-in load balancing and clustering ensure automated failover, redundancy, and a seamless user experience even at large scale.',
    },
    {
      title: 'Multilingual Support for UCS2 and GSM 7-bit Formats',
      text: 'Supports UCS2 and GSM 7-bit formats for delivering rich content in Latin and non-Latin languages worldwide.',
    },
    {
      title: 'Mobile Network Connection',
      text: 'Easily integrates with MNOs and MVNOs via SS7 MAP for secure and reliable connectivity.',
    },
    {
      title: 'HTTP Integration',
      text: 'Simple HTTP interface allows smooth integration with enterprise and third-party solutions.',
    },
    {
      title: 'SS7 Hardware Support',
      text: 'Fully compatible with Intel and Dialogic cards for reliable SS7 connectivity.',
    },
    {
      title: 'SIGTRAN, HTTP, and SIP Interface',
      text: 'Standards-based integration for IMS and LTE networks using SIGTRAN (M3UA), HTTP, and SIP.',
    },
    {
      title: 'Flexible Operations and Monitoring',
      text: 'Supports JMX, CLI, logging, and CDR reporting for efficient monitoring, operations, and auditing.',
    },
  ],
}

export const solutionContent = {
  ussd: {
    image: '/solutions/ussd.jpg',
    intro: ussdMenuBuilder[0],
    extra: ussdMenuBuilder.slice(1),
    sections: [ussdGatewayFeatures],
  },

  smsc: {
    image: '/solutions/smsc.jpg',
    tagline: 'Reliable, Scalable, and Secure',
    intro:
      'Messaging platform that enables mobile operators, MVNOs, and enterprises to launch and monetize next-generation A2P messaging services. It seamlessly integrates with business applications, simplifies the management of local and global SMS traffic, and efficiently handles high volumes with secure, timely delivery — maximizing revenue from mobile messaging.',
    sections: [
      {
        type: 'features',
        title: 'nSERVE SMSC Gateway – Scalable, Reliable, and Fully Customizable',
        items: [
          {
            title: 'Multi-Tenant',
            text: 'nSERVE SMSC Gateway supports SMS, group SMS, and broadcast SMS for multiple brands or domains from one deployment.',
          },
          {
            title: 'Carrier-Grade Scalability and Reliability',
            text: 'Built-in load balancing and clustering deliver seamless failover, redundancy, and excellent user experience at scale.',
          },
          {
            title: 'Multilingual Support',
            text: 'Supports UCS2 and GSM 7-bit formats for global messaging in Latin and non-Latin languages.',
          },
          {
            title: 'SS7 Hardware Support',
            text: 'Fully compatible with Intel and Dialogic cards for SS7 connectivity.',
          },
          {
            title: 'Legacy TDM and SS7 Support',
            text: 'Seamlessly integrates with IMS and LTE networks through SS7 MAP, HTTP, or SMPP interfaces.',
          },
          {
            title: 'Interface Support',
            text: 'Provides standard integration via HTTP, SMPP, SS7 MAP, and SIP for maximum interoperability.',
          },
          {
            title: 'MNO/MVNO-Oriented',
            text: 'Optimized for Mobile Network Operators and MVNOs with SS7 integration.',
          },
          {
            title: 'Flexible Operations and Monitoring',
            text: 'Enables monitoring and operations with JMX, CLI, full CDR, logging, and reporting tools.',
          },
        ],
      },
    ],
  },

  dmc: {
    image: '/solutions/dmc.webp',
    tagline: 'Carrier-Grade Software Module',
    intro:
      'Designed to manage device provisioning workflows in mobile networks. Built to comply with OMA Client Provisioning (OMA-CP) standards, it enables automated configuration of mobile devices using SMS-based provisioning messages, tailored by subscriber attributes, device characteristics, and network context.',
    sections: [
      {
        type: 'features',
        title: 'Device Management Centre Features',
        items: [
          {
            title: 'Standards-Based Provisioning',
            text: 'nSERVE Provisioning Gateway supports OMA-CP protocol for seamless interoperability across legacy and modern devices.',
          },
          {
            title: 'Profile-Centric Configurations',
            text: 'Provisioning profiles manage NAPs, applications, proxy, and authentication settings for modular, precise deployments.',
          },
          {
            title: 'Advanced Rule Engine',
            text: 'Dynamic provisioning logic enables contextual delivery based on IMSI, IMEI, MSISDN, location, or source system.',
          },
          {
            title: 'Destination Management',
            text: 'Operator-defined topology ensures accurate routing of SMPP, SS7, and Diameter messages per virtual network.',
          },
          {
            title: 'Audit and Device Insight',
            text: 'Maintains detailed provisioning history with TAC-based classification and enriched device manufacturer data.',
          },
          {
            title: 'Real-Time and Historical Statistics',
            text: 'Offers time-series monitoring and historical reporting for performance, diagnostics, and system load analysis.',
          },
        ],
      },
    ],
  },

  lbs: {
    image: '/solutions/lbs.jpg',
    intro:
      'A location intelligence solution that empowers businesses and operators to deliver personalized and context-aware services to subscribers.',
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'Real-time location detection of subscribers.',
              'Targeted campaigns and proximity marketing.',
              'Emergency alerts and notifications.',
              'Analytics for movement and usage patterns.',
              'Privacy-compliant location services.',
            ],
          },
        ],
      },
    ],
  },

  mobicharge: {
    image: '/solutions/mobicharge.jpg',
    intro:
      'MobiCharge is a real-time Electronic Voucher Distribution system designed for telecom operators. It enables airtime recharge, wallet management, and dealer network control — all from one unified platform.',
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Benefits for Mobile Operators',
            items: [
              'Significant reduction in operational expenses (OPEX)',
              'Expansion of point-of-sales without relying heavily on distributors',
              'Increased transaction-based revenue',
              'Faster response to market changes',
              'Improved distribution efficiency and control',
            ],
          },
          {
            title: 'Benefits for Customers & Retailers',
            items: [
              'Fast, simplified, and flexible transactions',
              'Freedom to choose any recharge value',
              'Enhanced privacy and secure transactions',
              'Simplified remittance, utility payments, and mobile commerce',
              'Guaranteed service quality and improved user experience',
              'No inventory handling',
              'No equipment investment (a GSM phone is sufficient)',
              'Dynamic and diversified digital service portfolio',
              'Simple operations with minimal training required',
            ],
          },
          {
            title: 'Advanced Distribution Management',
            items: [
              'Multi-level dealer and agent hierarchy',
              'Location-based retail management',
              'Multi-distributor support for a single retail account',
              'Multi-device access for a single retailer',
            ],
          },
        ],
      },
      {
        type: 'features',
        title: 'Key Features',
        items: [
          {
            title: 'Flexible Transaction Control',
            text: 'MobiCharge enables fully customizable credit and PIN transfer flows, allowing operators to define business rules that match their commercial strategy. The platform supports unlimited denominations and transaction values, ensuring maximum flexibility for retailers and subscribers. Real-time alerts for low stock and low balances help prevent service disruption, while instant transaction notifications via USSD and SMS keep users informed at every step.',
          },
          {
            title: 'Retailer Self-Service',
            text: 'The platform empowers retailers with complete self-service capabilities, including self-registration, account management, and inventory control. Through a dedicated self-care portal, retailers can monitor balances, track transactions, and manage their operations independently — reducing operational dependency and improving efficiency across the distribution network.',
          },
          {
            title: 'Reconciliation & Audit',
            text: 'MobiCharge provides automated reconciliation tools to ensure financial accuracy and operational transparency. Comprehensive audit trails record every transaction and account activity, enabling full traceability. Detailed tracking and reporting features simplify internal reviews and external audits while strengthening revenue protection.',
          },
          {
            title: 'Seamless Integration',
            text: 'Designed for telecom-grade environments, MobiCharge integrates smoothly with core network elements such as MSC, HLR, and IN systems. It also connects with BSS, banking platforms, ERP systems, and utility services to support end-to-end digital operations. A dedicated Customer Care API ensures efficient support workflows and system interoperability.',
          },
        ],
      },
    ],
  },

  'beep-call': {
    image: '/solutions/beep-call.jpg',
    intro:
      'A cost-free engagement service where users give a “missed call” to trigger an action such as requesting a call-back, subscribing to a service, or showing campaign interest.',
    extra: [
      'A simple yet effective service that allows users to alert others with a missed call when they’re low on balance or wish to communicate passively. Beep Call enhances subscriber connectivity while encouraging callback behavior, boosting overall network usage without incurring call charges.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'Zero cost for subscribers.',
              'Instant service activation through a missed call.',
              'Useful for polls, voting, promotions, or call-back requests.',
              'Scalable for high volumes of users.',
              'Boosts engagement in low-credit markets.',
            ],
          },
        ],
      },
    ],
  },

  'mcn-cmb': {
    intro:
      'Two complementary services that keep subscribers connected even when out of coverage or balance.',
    extra: [
      'MCN and CMB keep users connected by notifying them of missed calls and enabling callback requests when balance is low — enhancing satisfaction, retention, and voice traffic with minimal resource use.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'MCN Features',
            image: '/solutions/mcn.jpg',
            items: [
              'Notifications for calls missed when phone is off, out of coverage, or busy.',
              'Configurable alerts via SMS or USSD.',
              'Ensures subscribers never lose track of important calls.',
            ],
          },
          {
            title: 'CMB Features',
            image: '/solutions/cmb.jpg',
            items: [
              'Subscribers can request a call-back when out of balance.',
              'Simple activation via USSD or SMS.',
              'Increases customer satisfaction and network usage.',
              'Cost-effective solution for prepaid users.',
            ],
          },
        ],
      },
    ],
  },

  sdp: {
    image: '/solutions/sdp.jpg',
    tagline: 'Clicks SDP',
    intro:
      'A robust platform for developing, launching, and managing new services quickly and efficiently. It helps operators reduce time-to-market for value-added services.',
    extra: [
      'A centralized platform that streamlines service creation, management, and integration across networks — empowering operators to launch and scale VAS quickly and efficiently.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'Centralized service management and orchestration.',
              'Supports APIs for easy third-party integration.',
              'Scalable and modular architecture.',
              'Analytics and reporting for service performance.',
              'Faster rollout of new digital services.',
            ],
          },
        ],
      },
    ],
  },

  wave: {
    image: '/solutions/wave.jpg',
    tagline: 'Seamless Connectivity, Smarter Control',
    intro: 'A next-generation solution for integrating Diameter based and application network elements.',
    extra: [
      'Wave is a powerful management portal designed for content service providers, giving them full visibility and control over their operations. With an intuitive dashboard, real-time reporting, license cap monitoring, and a self-service portal for service requests, Wave simplifies complex processes and empowers providers to manage resources more efficiently. By combining automation with advanced security and seamless integration, Wave helps service providers reduce costs, speed up service deployment, and ensure a reliable, high-performing experience for their customers.',
    ],
    sections: [
      {
        type: 'features',
        title: 'Wave Diameter System empowers your network',
        items: [
          {
            title: 'Up to 20% higher throughput',
            text: 'Wave ensures faster message handling, enabling networks to process more traffic with improved efficiency and reliability.',
          },
          {
            title: 'Reduced integration time for new services',
            text: 'With its smart data flow engine, Wave simplifies setup and shortens deployment cycles, helping new services go live quickly.',
          },
          {
            title: 'Operational cost savings with automated controls',
            text: 'Built-in monitoring and license caps reduce manual work, optimize resource usage, and lower ongoing operational expenses.',
          },
        ],
      },
      {
        type: 'features',
        title: 'Key Features',
        items: [
          { title: 'Service Provider Dashboard', text: 'Real-time stats & detailed reports.' },
          { title: 'Self-Service Portal', text: 'Faster service creation with admin approval.' },
          { title: 'Advanced Data Flow Engine', text: 'Smart transformation & routing.' },
          { title: 'User-Friendly GUI', text: 'Simplified workflows, intuitive navigation.' },
        ],
      },
    ],
  },

  'cloud-ivr': {
    image: '/solutions/cloud-ivr.jpg',
    intro:
      'An automated voice-driven system that interacts with callers through menus, keypad input, and speech recognition.',
    extra: [
      'Premium SMS (PSMS) enables monetized user interactions through short codes, while IVR provides automated, interactive voice services — together creating engaging, revenue-generating customer experiences.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'Customizable self-service menus.',
              'Multi-language support.',
              'Seamless integration with CRMs and call centers.',
              'Call routing and queue management.',
              'Reduces call center load and operational costs.',
            ],
          },
        ],
      },
    ],
  },

  crbt: {
    image: '/solutions/crbt.jpg',
    intro:
      'A personalized service that replaces the standard ringing tone with music, messages, or promotional content.',
    extra: [
      'CRBT lets users personalize their outgoing call experience with music or messages, enhancing brand affinity and generating consistent recurring revenue for operators.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'Music and tone libraries for personalization.',
              'Promotional campaigns with branded tones.',
              'Subscription-based or pay-per-use models.',
              'Easy activation and management via SMS/USSD.',
              'Additional revenue stream for operators.',
            ],
          },
        ],
      },
    ],
  },

  'bulk-sms': {
    image: '/solutions/bulk-sms.jpg',
    intro:
      'Send large-scale, personalized text messages instantly for marketing, alerts, OTPs, and customer engagement with high delivery reliability.',
    extra: [
      'Businesses entering the world of SMS marketing often rely on bulk messaging software to efficiently launch and scale their operations. Such platforms enable full control over bulk SMS campaigns while offering a customizable, branded application with extensive benefits.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Advantages of Bulk SMS Panel',
            items: [
              'Data security for your customers.',
              'Install your own SSL certificate.',
              'Attach unlimited SMS gateways.',
              'Manage your ASR.',
              'Load balance your traffic.',
              'Prefix-based routing of SMS to save on-net termination cost.',
              'Advanced reporting for detailed business insight.',
              'Long-term brand building.',
              'Maximize uptime.',
              'Competitive price selection.',
              'Option of adding multiple plugins in a single panel.',
              'Customized theme for your customers.',
            ],
          },
        ],
      },
      {
        type: 'features',
        title: 'Discover our Bulk SMS Platform',
        items: [
          {
            title: 'Billing & Routing',
            text: 'Flat country-wise or network operator based billing (MCC/MNC) configuration with rate management.',
          },
          {
            title: 'Monitoring',
            text: 'Innovative monitoring module with advanced PDU logger and dynamic verbosity parameter.',
          },
          {
            title: '2-Way Messaging',
            text: 'Two-way messaging with advanced routing capability based on origination or termination.',
          },
          {
            title: 'LCR Engine',
            text: 'Increase profitability with advanced LCR based routing and loss protection mechanism.',
          },
          {
            title: 'Reporting',
            text: 'A background job tool to create reports for custom date ranges with multiple parameters and data profiles.',
          },
          {
            title: 'Analytics',
            text: 'Detailed analytics with business insight to measure performance of upstream gateways and inbound traffic.',
          },
        ],
      },
    ],
  },

  'balance-plus': {
    image: '/solutions/balance-plus.jpg',
    tagline: 'Balance+ Experience',
    intro:
      'The Balance+ platform allows inserting dynamically targeted and interactive USSD texts (USSD tails) in the response message to the USSD balance check service request.',
    extra: [
      'Today, the USSD balance inquiry is considered one of the highest sources of transactions between customers and mobile operators.',
      'With this high number of transactions and customer interactions, it has a high potential for increasing revenue for the mobile operator when used as a promotional channel.',
      'From our experience implementing this solution with mobile operators, the adoption rate can be up to 4% of total transactions if it’s utilized correctly.',
    ],
    sections: [
      {
        type: 'features',
        title: 'Features',
        items: [
          {
            title: 'Targeting',
            text: 'Customizable targeting (List, Data user, Balance, Location, Gender, Time, etc.)',
          },
          {
            title: 'Interactive',
            text: 'Interactive USSD tails allow the user to activate the services directly.',
          },
          { title: 'Integration', text: 'API to integrate with third-party systems for notifications.' },
          {
            title: 'Management',
            text: 'Easy management through the web to create, launch, stop, edit, and report campaigns.',
          },
          { title: 'Control', text: 'Blacklist & whitelist control.' },
          { title: 'Internal Use', text: 'Usable for operator core products.' },
        ],
      },
      {
        type: 'stats',
        title: 'Key Metrics of Balance Plus',
        subtitle: 'From our experience implementing this solution with mobile operators',
        items: [
          { value: '7%', label: 'Adoption rate of total transactions' },
          { value: '+25,000', label: 'Transactions per customer' },
          { value: '40%', label: 'Increase in revenue from Balance Plus' },
        ],
      },
    ],
  },

  obd: {
    intro:
      'An automated system that delivers pre-recorded calls to thousands of users for marketing or information purposes.',
    extra: [
      'Out Bound Dialing is an automated voice calling solution for promotions, reminders, alerts, and surveys, reaching thousands of users efficiently.',
    ],
    sections: [
      {
        type: 'lists',
        groups: [
          {
            title: 'Key Features',
            items: [
              'High-volume automated calling campaigns.',
              'Multi-language support for voice prompts.',
              'Interactive options (DTMF input) for surveys or responses.',
              'Scheduling and campaign management tools.',
              'Reports and analytics for campaign tracking.',
            ],
          },
        ],
      },
    ],
  },

  'ussd-push': {
    intro:
      'Real-time, pop-up messaging service that delivers interactive alerts, offers, and confirmations directly to any mobile phone without internet.',
    extra: ussdMenuBuilder,
    sections: [ussdGatewayFeatures],
  },
}
