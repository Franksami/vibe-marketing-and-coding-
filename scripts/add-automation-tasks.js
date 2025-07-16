#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to tasks.json
const tasksPath = path.join(__dirname, '../.taskmaster/tasks/tasks.json');

// Read existing tasks
const tasksData = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
const existingTasks = tasksData.master.tasks;

// Find the highest task ID
const highestId = Math.max(...existingTasks.map(t => t.id));

// New automation tasks to add
const automationTasks = [
  {
    id: highestId + 1,
    title: "Integrate Instantly.ai for Cold Email Outreach",
    description: "Set up AI-powered cold email outreach platform with campaign tracking and analytics",
    details: "1. Set up Instantly account and API integration\n2. Configure email warmup (2-3 weeks minimum)\n3. Create cold email templates\n4. Set up tracking and analytics\n5. Implement webhook handlers for opens/replies\n6. Create campaign management dashboard\n7. Test deliverability and inbox placement",
    testStrategy: "1. Test API connection and authentication\n2. Verify email sending functionality\n3. Test webhook reception for opens/clicks/replies\n4. Validate campaign analytics accuracy\n5. Check deliverability with email testing tools",
    priority: "high",
    dependencies: [42], // Depends on domain purchase
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 2,
    title: "Implement Apify for Lead Research and Scraping",
    description: "Set up web scraping platform for automated lead generation and data extraction",
    details: "1. Set up Apify account and API access\n2. Configure LinkedIn Sales Navigator scraper\n3. Create company website data extractor\n4. Build lead enrichment pipeline\n5. Implement data validation and deduplication\n6. Create lead scoring algorithm\n7. Set up automated lead import to Instantly",
    testStrategy: "1. Test scraper accuracy on sample websites\n2. Validate data extraction quality\n3. Test deduplication logic\n4. Verify API rate limiting\n5. Check data privacy compliance",
    priority: "high",
    dependencies: [highestId + 1],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 3,
    title: "Build Lead Management System",
    description: "Create comprehensive lead tracking and management system with CRM capabilities",
    details: "1. Create Lead and ColdEmailCampaign database models\n2. Build lead import/export functionality\n3. Implement lead qualification workflow\n4. Create lead analytics dashboard\n5. Set up lead routing to sales team\n6. Build CRM integration layer",
    testStrategy: "1. Test database operations (CRUD)\n2. Validate import/export with various formats\n3. Test lead scoring accuracy\n4. Verify analytics calculations\n5. Test integration endpoints",
    priority: "high",
    dependencies: [highestId + 1, highestId + 2],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 4,
    title: "Integrate ManyChat for Multi-Channel Chatbots",
    description: "Set up automated chatbot system for WhatsApp, Instagram, and Facebook messaging",
    details: "1. Set up ManyChat account and API access\n2. Create WhatsApp Business integration\n3. Build Instagram DM automation\n4. Design conversation flows for support\n5. Implement course recommendation bot\n6. Create FAQ automation\n7. Set up lead capture through chat\n8. Build analytics tracking",
    testStrategy: "1. Test message flow on each platform\n2. Validate conversation logic\n3. Test lead capture functionality\n4. Verify analytics accuracy\n5. Conduct user acceptance testing",
    priority: "medium",
    dependencies: [42],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 5,
    title: "Implement Opus Clip for Video Repurposing",
    description: "Set up AI-powered video clipping for converting long-form content to social media clips",
    details: "1. Set up Opus Clip account (or alternative)\n2. Create video processing pipeline\n3. Build automatic clip generation workflow\n4. Implement social media formatting\n5. Create posting schedule automation\n6. Set up performance tracking\n7. Build content library management",
    testStrategy: "1. Test video processing quality\n2. Validate clip selection accuracy\n3. Test social media format compatibility\n4. Verify automation workflow\n5. Check storage and retrieval system",
    priority: "medium",
    dependencies: [13], // Depends on course content
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 6,
    title: "Integrate Apollo.io for B2B Lead Database",
    description: "Set up B2B lead database with enrichment and email finding capabilities",
    details: "1. Set up Apollo account and API\n2. Configure search criteria and filters\n3. Build lead enrichment pipeline\n4. Implement email finder integration\n5. Create data sync with CRM\n6. Set up lead scoring integration",
    testStrategy: "1. Test API authentication\n2. Validate search accuracy\n3. Test enrichment data quality\n4. Verify email finder accuracy\n5. Test sync reliability",
    priority: "medium",
    dependencies: [highestId + 3],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 7,
    title: "Implement Bannerbear for Dynamic Graphics",
    description: "Set up automated graphic generation for social media and marketing materials",
    details: "1. Set up Bannerbear account and API\n2. Create social media templates\n3. Build dynamic image generation\n4. Implement blog post graphics automation\n5. Create testimonial image generator\n6. Set up batch processing",
    testStrategy: "1. Test template rendering\n2. Validate image quality\n3. Test bulk generation\n4. Verify API performance\n5. Check storage integration",
    priority: "low",
    dependencies: [],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 8,
    title: "Build Calendly Integration",
    description: "Implement automated scheduling system for demos and consultations",
    details: "1. Set up Calendly account and API\n2. Create booking types (demo, consultation)\n3. Implement calendar sync\n4. Build automated reminders\n5. Create follow-up automation\n6. Integrate with CRM",
    testStrategy: "1. Test booking flow\n2. Validate calendar sync\n3. Test reminder delivery\n4. Verify timezone handling\n5. Test CRM integration",
    priority: "medium",
    dependencies: [],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 9,
    title: "Implement AI Content Generation",
    description: "Set up AI-powered content creation for blogs, social media, and emails",
    details: "1. Set up OpenAI/Claude API access\n2. Create blog post generator\n3. Build social media content creator\n4. Implement email template generator\n5. Create course outline assistant\n6. Build content optimization tool",
    testStrategy: "1. Test content quality\n2. Validate API integration\n3. Test rate limiting\n4. Verify content uniqueness\n5. Check SEO optimization",
    priority: "medium",
    dependencies: [],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 10,
    title: "Set up Advanced Analytics Platform",
    description: "Implement comprehensive analytics and tracking across all platforms",
    details: "1. Implement Mixpanel for product analytics\n2. Set up Segment for data routing\n3. Configure conversion tracking\n4. Build unified dashboard\n5. Create automated reports\n6. Set up alert system",
    testStrategy: "1. Test event tracking\n2. Validate data accuracy\n3. Test dashboard functionality\n4. Verify report generation\n5. Test alert triggers",
    priority: "medium",
    dependencies: [],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 11,
    title: "Implement HubSpot CRM Integration",
    description: "Set up full CRM system with marketing automation capabilities",
    details: "1. Set up HubSpot account\n2. Configure data sync\n3. Build two-way integration\n4. Implement workflow automation\n5. Create reporting integration",
    testStrategy: "1. Test data sync accuracy\n2. Validate workflow triggers\n3. Test bi-directional updates\n4. Verify reporting accuracy\n5. Check performance impact",
    priority: "low",
    dependencies: [highestId + 3],
    status: "pending",
    subtasks: []
  },
  {
    id: highestId + 12,
    title: "Build Monitoring and Error Handling System",
    description: "Implement comprehensive monitoring, logging, and error tracking",
    details: "1. Set up Sentry for error tracking\n2. Implement Datadog monitoring\n3. Create health check endpoints\n4. Build alert system\n5. Set up automated recovery",
    testStrategy: "1. Test error capture\n2. Validate monitoring metrics\n3. Test alert delivery\n4. Verify recovery procedures\n5. Load test system",
    priority: "high",
    dependencies: [],
    status: "pending",
    subtasks: []
  }
];

// Add new tasks to the existing tasks
tasksData.master.tasks = [...existingTasks, ...automationTasks];

// Write back to file
fs.writeFileSync(tasksPath, JSON.stringify(tasksData, null, 2));

console.log(`✅ Successfully added ${automationTasks.length} automation tasks!`);
console.log(`📊 Total tasks now: ${tasksData.master.tasks.length}`);
console.log('\nNew tasks added:');
automationTasks.forEach(task => {
  console.log(`  - Task ${task.id}: ${task.title}`);
});

console.log('\n🚀 Next steps:');
console.log('1. Run: task-master list');
console.log('2. Run: task-master generate');
console.log('3. Focus on Task #42: Purchase thevibelaunch.ai domain');
console.log('4. Complete current in-progress tasks before starting automation');