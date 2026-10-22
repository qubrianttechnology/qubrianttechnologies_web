export const company = { name: 'Qubriant', full: 'Qubriant Technologies (Pvt) Ltd', email: 'info@qubriant.com', phone: '+94 72 261 6616', tel: '+94722616616', whatsapp: '94722616616' };
export const services = [
  { slug:'ai-automation', title:'AI & Business Automation', short:'AI & Automation', icon:'sparkles', image:'healthcare_hero.webp', text:'Put repetitive work on autopilot. Connect your tools, unlock your business knowledge, and give your team more time for the work that matters.', features:['Workflow discovery and automation','Custom AI assistants and agents','Document intelligence and semantic search','Human review and secure integrations'] },
  { slug:'saas-development', title:'Multi-Platform SaaS Development', short:'SaaS Engineering', icon:'layers', image:'fintech_hero.webp', text:'Bring your product to life across web and mobile. Build a reliable foundation for subscriptions, teams, and your next stage of growth.', features:['Multi-tenant architecture','Subscription and billing integrations','Role-based access and dashboards','Cloud deployment and monitoring'] },
  { slug:'mobile-app-development', title:'Mobile App Development', short:'Mobile Experiences', icon:'phone', image:'travel_hero.webp', text:'Thoughtful mobile experiences for iOS and Android, with responsive interfaces, smooth motion, and the features your customers need on the go.', features:['iOS and Android applications','Offline-ready experiences','Push notifications and secure sign-in','App store release support'] },
  { slug:'legacy-modernization', title:'Legacy System Modernization', short:'System Modernization', icon:'refresh', image:'logistics_hero.webp', text:'Move beyond the limitations of ageing software. Refresh the experience, simplify maintenance, and migrate your data with a carefully staged plan.', features:['Application and architecture audit','Incremental platform migration','Data mapping and validation','Performance and usability improvements'] },
  { slug:'custom-software-development', title:'Custom Business Software', short:'Business Platforms', icon:'grid', image:'ecommerce_hero.webp', text:'Give your business a system that works the way you do. Connect operations, reporting, customer relationships, and your everyday workflows.', features:['ERP and CRM applications','Internal dashboards and portals','Inventory and operational workflows','Reporting and business intelligence'] },
  { slug:'dedicated-development-team', title:'Dedicated Development Teams', short:'Dedicated Teams', icon:'users', image:'education_hero.webp', text:'Extend your team with focused engineering support. Work together through clear milestones, shared tools, and regular product demonstrations.', features:['Frontend and backend engineering','Sprint planning and delivery','Code reviews and quality assurance','Long-term product collaboration'] },
  { slug:'web-development', title:'Web Application Development', short:'Web Development', icon:'globe', image:'travel_hero.webp', text:'Fast, accessible websites and web applications that make complex tasks feel simple, from your first landing page to a full customer platform.', features:['Responsive website development','Accessible interaction design','Search-friendly page architecture','Commerce and payment integrations'] },
  { slug:'ui-ux-design', title:'UI / UX & Product Design', short:'Product Design', icon:'pen', image:'ecommerce_hero.webp', text:'Make every interaction count. Turn user needs into clear journeys, considered interfaces, and prototypes you can test before development.', features:['User journeys and wireframes','Interactive Figma prototypes','Design systems and component libraries','Usability and accessibility reviews'] }
];
export const industries = [
  {slug:'healthcare',title:'Healthcare & MedTech',image:'healthcare_hero.webp',icon:'heart',text:'Connected experiences for care teams and patients. Simplify appointments, patient records, and everyday clinical operations with privacy considered from the start.',features:['Patient and practitioner portals','Appointment scheduling','Clinical workflow integrations']},
  {slug:'fintech',title:'FinTech & Banking',image:'fintech_hero.webp',icon:'wallet',text:'Clear, dependable financial experiences. Bring payments, reporting, and business workflows together with careful access controls and traceable activity.',features:['Payment integrations','Financial dashboards','Identity and access workflows']},
  {slug:'ecommerce',title:'E-Commerce & Retail',image:'ecommerce_hero.webp',icon:'bag',text:'Make shopping effortless and operations connected. Build distinctive storefronts with inventory, payments, and fulfilment working together.',features:['Online storefronts','Inventory and order management','Customer loyalty experiences']},
  {slug:'logistics',title:'Logistics & Supply Chain',image:'logistics_hero.webp',icon:'truck',text:'See the full journey, from warehouse to delivery. Connect teams and data with operational tools designed around your supply chain.',features:['Shipment tracking','Warehouse operations','Route and delivery planning']},
  {slug:'education',title:'Education & EdTech',image:'education_hero.webp',icon:'book',text:'Give learners and educators room to grow. Create learning platforms with courses, assessments, progress tracking, and intuitive administration.',features:['Learning management platforms','Digital assessments','Student and educator portals']},
  {slug:'travel',title:'Travel & Hospitality',image:'travel_hero.webp',icon:'globe',text:'Turn discovery into a memorable journey. Connect bookings, itineraries, and guest services in a seamless experience across devices.',features:['Booking and reservation systems','Itinerary planning','Guest experience platforms']}
];
export const projects = [
  {
    "slug": "ceylon-rides",
    "title": "Ceylon Rides",
    "category": "Travel & Hospitality",
    "label": "TRAVEL & DESTINATION DISCOVERY",
    "image": "ceylon-rides.png",
    "text": "A responsive travel website connecting visitors with Sri Lankan rides, tours and destinations.",
    "challenge": "Help travellers discover Sri Lanka and find a clear path to rides and tour options.",
    "solution": "A welcoming travel experience with destination cards, tour discovery and prominent ride-booking entry points.",
    "tags": [
      "Travel website",
      "Destination discovery",
      "Responsive design"
    ]
  },
  {
    "slug": "mma-colombo",
    "title": "MMA Colombo",
    "category": "Sports & Fitness",
    "label": "COMBAT SPORTS & FITNESS",
    "image": "mma-colombo.png",
    "text": "A bold website for MMA Colombo, bringing training programmes, classes and the club community together.",
    "challenge": "Introduce the club and help prospective members explore training opportunities.",
    "solution": "A strong sporting identity with programme information, class-registration entry points and clear contact options.",
    "tags": [
      "Fitness website",
      "Training programmes",
      "Responsive design"
    ]
  },
  {
    "slug": "fighter-insider",
    "title": "Fighter Insider",
    "category": "Sports & Media",
    "label": "FIGHT RECORDS & SPORTS MEDIA",
    "image": "fighter-insider.png",
    "text": "A distinctive combat-sports experience built around fighter discovery, rankings and the latest stories.",
    "challenge": "Organise fight information and sports coverage into an experience that is easy to explore.",
    "solution": "A focused interface for fighter discovery, rankings, club information and news across screen sizes.",
    "tags": [
      "Sports media",
      "Fighter discovery",
      "Responsive design"
    ]
  },
  {
    "slug": "sri-lanka-mma",
    "title": "Sri Lanka MMA",
    "category": "Sports & Fitness",
    "label": "MIXED MARTIAL ARTS FEDERATION",
    "image": "sri-lanka-mma.png",
    "text": "A digital home for Sri Lanka MMA, presenting the federation, programmes and community.",
    "challenge": "Give athletes, coaches and clubs a clear introduction to the federation and its activities.",
    "solution": "A black-and-gold website with programme, club, event and membership information in a responsive layout.",
    "tags": [
      "Federation website",
      "Sports community",
      "Responsive design"
    ]
  }
];
export const techGroups = [
 {title:'Mobile Solutions',heading:'Mobile application development',icon:'phone',text:'Native-feeling experiences that keep your product close to your customers.',tools:[['React Native','react-native'],['Flutter','flutter'],['Expo','expo'],['Firebase','firebase'],['Android','android'],['iOS','apple']]},
 {title:'Enterprise Ecosystems',heading:'Web platforms & SaaS',icon:'layers',text:'Flexible web architectures for growing products, teams, and business operations.',tools:[['Next.js','nextjss'],['React','react-native'],['TypeScript','typescript'],['Node.js','nodejs'],['PostgreSQL','postgresql'],['MongoDB','mongodb']]},
 {title:'Backend & APIs',heading:'Connected systems, reliable foundations',icon:'code',text:'APIs and infrastructure that help your applications work together.',tools:[['NestJS','nestjs'],['GraphQL','graphql'],['Prisma','prisma'],['Redis','redis'],['Docker','docker'],['AWS','aws']]},
 {title:'AI & Automation',heading:'Intelligent workflows & custom agents',icon:'sparkles',text:'Purpose-built automation with your data, your workflows, and people in control.',tools:[['OpenAI','openai'],['Gemini','gemini'],['LangChain','langchain'],['Flowise','flowise'],['n8n','n8n'],['Pinecone','pinecone']]},
 {title:'Modern Web Presences',heading:'Websites designed to perform',icon:'globe',text:'Responsive, accessible websites with careful attention to speed and discoverability.',tools:[['Tailwind CSS','tailwindcss'],['Vercel','vercel'],['Motion','framer'],['SEO','seo']]},
 {title:'Product Design',heading:'From first sketch to polished product',icon:'pen',text:'Explore, prototype, and refine the experience before committing to code.',tools:[['Figma','figma'],['Adobe XD','adobe'],['Photoshop','ps'],['Illustrator','ai']]}
];
export const faqs = [
 ['How do we start a project?','Send us a short outline of your idea, the people it serves, and the problem you want to solve. We will discuss the scope, technical approach, and a practical delivery plan with you.'],
 ['How long does a project take?','The timeline depends on the scope and integrations. After discovery, we agree on milestones and a realistic schedule, then keep you involved with regular progress reviews.'],
 ['Can you improve our existing software?','Yes. We can review an existing system, identify the highest-impact improvements, and plan a gradual upgrade or migration around your business needs.'],
 ['Do you provide support after launch?','Support and maintenance can be included in your project agreement. We define the coverage, communication channels, and response expectations before launch.'],
 ['How do you approach security?','We consider security throughout the product lifecycle, including access controls, input validation, dependency updates, testing, and the handling of sensitive data. Specific requirements are agreed during discovery.'],
 ['Who owns the finished software?','Source code, intellectual property, hosting access, and handover terms are set out in the project agreement so ownership is clear before development begins.']
];
export const articles = [
 {slug:'planning-your-software-project',title:'Start with the problem. Build the right product.',category:'Product strategy',image:'qubriant-planning.svg',photo:'industries/fintech_hero.webp',intro:'A useful software brief starts with the work people need to do, the friction they experience, and the outcome that would make a difference.',sections:[['Map the current workflow','Write down the steps people follow today. Include the spreadsheets, handovers, messages, and workarounds. Talk to the people doing the work, and separate the root problem from a suggested feature.'],['Choose a useful first release','Identify the smallest complete journey that delivers value. A focused release is easier to test and gives you real feedback before you expand the product.'],['Agree how you will measure success','Choose a small set of signals: task completion, time spent, errors, or adoption. Establish a starting point so that later improvements can be assessed against something concrete.']]},
 {slug:'automation-with-people-in-control',title:'Smarter automation starts with a clear workflow.',category:'AI & Automation',image:'qubriant-workflow.svg',photo:'industries/healthcare_hero.webp',intro:'Useful automation removes repetition while keeping decisions understandable. Start with a well-defined process before selecting a model or tool.',sections:[['Find the repeatable work','Look for tasks with frequent repetition, clear inputs, and a reviewable output. Document processing, internal search, and routing requests are often useful areas to investigate.'],['Design a review path','Define when the system should ask for help. Make it easy for a person to correct an output, approve an action, and understand which information was used.'],['Evaluate on real examples','Use representative examples with known expectations. Test failure cases as carefully as successful ones, and monitor changes after release.']]},
 {slug:'designing-a-mobile-experience',title:'Small screens. Thoughtful experiences.',category:'Design',image:'qubriant-mobile.svg',photo:'industries/travel_hero.webp',intro:'A mobile interface works best when its priorities are clear. Space, readable typography, and predictable interactions help people complete tasks with confidence.',sections:[['Keep the main task visible','Give the primary action an obvious place. Reduce competing controls and keep labels specific to what will happen next.'],['Build for real conditions','Consider slow connections, interruptions, different input methods, and one-handed use. Show progress and preserve work when a task is interrupted.'],['Use motion with purpose','Animation can explain state changes and maintain context. Keep it short, make it interruptible, and respect reduced-motion preferences.']]},
 {slug:'modernizing-without-disruption',title:'A practical path from legacy to modern.',category:'Engineering',image:'qubriant-engineering.svg',photo:'industries/logistics_hero.webp',intro:'Modernization is a series of considered decisions. Understanding the existing system is the first step toward changing it safely.',sections:[['Understand the dependencies','Map the data, integrations, business rules, and operational habits the application supports. The parts people rely on are not always obvious from the interface.'],['Change in manageable stages','Prioritize improvements that can be verified independently. Plan data migration, validation, and rollback before moving a production workflow.'],['Make the new system maintainable','Document the architecture, automate important checks, and provide a clear handover. A modern stack is useful only if the team can operate it confidently.']]}
];
