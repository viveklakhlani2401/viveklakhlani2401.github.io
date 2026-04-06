# Vivek Lakhlani - Portfolio Website

## Overview
Modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features real-time visitor analytics, smooth scroll animations, and project showcase.

## Features

### 🎯 Core Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Scroll reveal animations and transitions
- **Project Showcase** - 6 featured projects with tech stack details
- **Experience Timeline** - Professional experience with achievements
- **Skills Section** - Organized by Frontend, Backend, Database, and Certifications
- **Contact Form** - Easy way for clients to reach out

### 📊 Visitor Analytics
Your portfolio now includes built-in analytics to track visitor information:

#### Local Analytics (Browser Storage)
- Tracks visitor count
- Records IP address (via ipify API)
- Stores user agent, timezone, referrer, screen resolution
- Last 100 visitors stored locally in browser

#### How to View Analytics
1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
2. **Press Keyboard Shortcut**: `Ctrl + Shift + A`
3. View detailed analytics including:
   - Total visitor count
   - Unique IP addresses
   - Top referrers
   - Browser statistics
   - Last 10 visitors details

#### Console Commands Available
```javascript
// Get analytics summary
getAnalyticsSummary()

// Returns object with:
{
  totalVisitors: number,
  visitors: array,
  uniqueIPs: array,
  topReferrers: array,
  browsers: object
}
```

### 🔍 Google Analytics (Optional)
To enable Google Analytics:
1. Create a Google Analytics account at https://analytics.google.com
2. Set up a new property for your portfolio domain
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Replace `G-XXXXXXXXXX` in `index.html` (2 places in head section)

### 📱 Social Links
- LinkedIn: https://linkedin.com/in/viveklakhlani/
- GitHub: https://github.com/viveklakhlani2401
- Email: viveklakhlani123@gmail.com

## Project Details

### 1. Inventory System with SAP B1
- QR-based inventory tracking
- Real-time data synchronization
- Tech: React, .NET Core, SAP B1, MySQL

### 2. Visitor Management System
- Real-time visitor approval system
- AWS deployment for enterprises
- Tech: React, Django, MySQL, AWS

### 3. StockPulse ⭐
- AI-powered stock market prediction
- Machine learning models integration
- Real-time data analysis
- Tech: React, Flask, ML Models, APIs

### 4. FurniFlex
- Full-featured e-commerce platform
- Advanced inventory management
- Real-time product catalog
- Tech: Java EE, JSF, MySQL

### 5. TrackSquare
- Employee time tracking & CRM system
- AWS C-Panel deployment
- Tech: PHP, MySQL, Bootstrap, AWS

### 6. Vendor & Customer Management
- SAP B1 integration
- Enterprise operations tracking
- Tech: React, .NET Core, SAP B1, MySQL

## Skills Summary

**Languages**: Java, Python, C#, PHP, JavaScript, SQL, C/C++

**Frontend**: React, HTML, CSS, JavaScript, Angular, DevExtreme

**Backend**: Java, Python, C#, .NET Core, Node.js, PHP

**Databases**: MySQL, MongoDB, SAP B1, Firebase, NoSQL

**Tools & Platforms**: Git, AWS, Render, Vercel, Azure DevOps, Figma

**Certifications**: 
- AWS Academy Cloud Foundations
- HackerRank SQL (Basic)
- Google AI Essentials

## Experience

**Current Role**: Software Engineer Intern @ Thoughtspark (Jan 2025 - Present, Hyderabad)
- Developing scalable features using modern JavaScript and backend technologies
- Enhancing codebase through ticketed tasks and best practices

**Previous**: Jr. Software Engineer @ Quantum It Solution (June 2023 - Dec 2024, Surat)
- Built SAP-integrated full-stack applications
- On-site deployment for enterprise clients

## File Structure

```
portfoliofolder/
├── index.html                    # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   ├── main.js              # Main JavaScript
│   │   └── analytics.js         # Analytics tracking
│   ├── images/
│   │   └── profile.jpg          # Profile picture
│   └── files/
│       └── vivek_resume.pdf     # Resume PDF
└── README.md                     # This file
```

## Customization

### Update Personal Information
Edit `index.html`:
- Name and tagline in hero section
- Contact email and phone
- Social media links
- Project details

### Modify Colors
Edit `assets/css/style.css`:
- Primary color: `--first-color: #1e9fab;`
- Secondary color: `--second-color: rgb(0, 201, 255);`
- Text colors and shadows can be customized

### Add New Projects
1. Add new `.project-card` in projects section
2. Update tech stack badges
3. Add appropriate icon from Unicons library

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips
1. Compress images before adding
2. Minimize CSS and JavaScript for production
3. Use CDN for external libraries
4. Monitor analytics for user behavior insights

## Future Enhancements
- [ ] Backend server for advanced analytics
- [ ] Blog section with technical articles
- [ ] Case studies for projects
- [ ] Interactive skill progress bars
- [ ] Dark mode toggle
- [ ] Multi-language support

## Contact & Support
For questions or suggestions:
- Email: viveklakhlani123@gmail.com
- LinkedIn: https://linkedin.com/in/viveklakhlani/
- GitHub: https://github.com/viveklakhlani2401

---
Last Updated: April 2026
