# Google Analytics Setup Guide

## Step-by-Step Google Analytics Integration

### Prerequisites
- Google Account (Gmail or Google Workspace)
- Access to your portfolio HTML file
- Your domain name or GitHub Pages URL

---

## Step 1: Create Google Analytics Account

1. **Go to Google Analytics**: https://analytics.google.com
2. **Sign in** with your Google Account
3. Click **"Start Measuring"** (blue button)
4. Fill in the Account Details:
   - **Account Name**: "Vivek Lakhlani Portfolio" or similar
   - Click **"Create"**

---

## Step 2: Set Up Property

1. **Create Property**:
   - **Property Name**: "Portfolio Website" or "viveklakhlani.github.io"
   - **Reporting Time Zone**: India (or your timezone)
   - **Currency**: INR (or your currency)
   - Click **"Create Property"**

2. **Business Setup** (optional):
   - **Industry Category**: Technology / Software / IT Services
   - **Business Size**: Self-employed / Freelancer
   - Click applicable checkboxes, then **"Create"**

---

## Step 3: Create Data Stream

1. **Choose Platform**: Select **"Web"**

2. **Add Stream Details**:
   - **Website URL**: `https://viveklakhlani2401.github.io` (or your domain)
   - **Stream Name**: "Main Portfolio"
   - Click **"Create Stream"**

3. **Copy Your Measurement ID**:
   - Look for ID in format: **`G-XXXXXXXXXX`**
   - (example: `G-AB12CD34EF`)
   - Save this ID!

---

## Step 4: Update Your Portfolio Code

### Method 1: Direct File Edit

1. **Open** `index.html` in your portfolio folder

2. **Find** the Google Analytics code in `<head>` section:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

3. **Replace** `G-XXXXXXXXXX` with your **Measurement ID**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8F9K2L3M5N"></script>
```

4. **Also replace** in the second location (below the first script):
```javascript
gtag('config', 'G-XXXXXXXXXX');
// Change to:
gtag('config', 'G-8F9K2L3M5N');
```

5. **Save** the file

### Method 2: Copy-Paste Full Code

1. In Google Analytics, go to **Admin** (⚙️ icon)
2. Click **"Measurement ID"** 
3. Copy the complete tracking code provided
4. Paste it **exactly** as shown in your portfolio's `<head>` section

---

## Step 5: Deploy Updated Portfolio

1. **Commit changes** to Git:
```bash
git add index.html
git commit -m "Add Google Analytics tracking"
git push
```

2. **Wait 5-10 minutes** for changes to deploy

3. **Visit your portfolio** in a browser

---

## Step 6: Verify Tracking

### Real-Time View
1. In Google Analytics, click **"Home"**
2. Go to **"Realtime"** section (left sidebar)
3. **Visit your portfolio** in another tab
4. You should see yourself as an active user in real-time!

### Debug Your Setup
If not working:

**Check JavaScript Console** (F12 → Console):
```javascript
// Should return event data if working
dataLayer
```

**Verify Measurement ID**:
```javascript
// In console, type:
ga
// Should not return "undefined"
```

---

## Features You'll Get

### Dashboard Insights
- **Users** - Total visitors
- **Sessions** - Visit count per user
- **Pageviews** - Most viewed pages
- **Bounce Rate** - % leaving site immediately
- **Session Duration** - Average time on site
- **Acquisition** - Where visitors come from
- **Device Data** - Mobile/Desktop/Tablet breakdown
- **Browser Info** - Chrome, Firefox, Safari, Edge usage
- **Geographic Data** - Country/City of visitors
- **Operating System** - Windows, Mac, Linux, iOS, Android

### Reports Available
- **Life Cycle Reports**
  - Acquisition (where do users come from)
  - Engagement (what do they do on site)
  - Monetization (revenue if applicable)
  - Retention (do they come back)

- **User Reports**
  - Demographics (age, gender if configured)
  - Technology (device, browser, OS)
  - Geo-location

- **Event Reports**
  - Custom events (clicks, form submissions, etc.)
  - Conversions (goal completions)

---

## Comparing Analytics Options

| Feature | Local Analytics | Google Analytics |
|---------|-----------------|-----------------|
| **Setup** | Automatic | Requires setup |
| **Data Storage** | Browser localStorage | Google servers |
| **Reports** | Basic in console | Advanced dashboard |
| **Real-time** | No (local only) | Yes! |
| **Retention** | Last 100 visitors | Up to 14 months |
| **Geographic Data** | IP only | City-level |
| **Traffic Sources** | Referrer only | Detailed acquisition |
| **Privacy** | Best (local) | Good (anonymous) |
| **Cost** | Free | Free (GA4) |
| **Learning Curve** | Easy | Moderate |

---

## Best Practices

### What to Track
✅ Page views
✅ Traffic sources
✅ Device types
✅ Geographic data
✅ Referrers

### What NOT to Track
❌ Personally identifiable info
❌ Sensitive data
❌ Password-related events
❌ Email addresses (without consent)

### Privacy Compliance
- Google Analytics is GDPR compliant when configured correctly
- Add **Privacy Policy** mentioning analytics
- Consider adding **Cookie Consent** banner
- Europe requires user consent before tracking

---

## Advanced Setup (Optional)

### Adding Conversion Goals
Track specific actions like:
- Portfolio view completion
- Project page views
- Contact form submissions

**Steps**:
1. Go to **Admin** → **Conversions**
2. Click **"New Conversion Event"**
3. Name it (e.g., "Contact Form Submission")
4. Set up the event trigger

### Custom Events
Track specific interactions:
```javascript
// Track button clicks
gtag('event', 'button_click', {
  'button_name': 'hire_me'
});

// Track project views
gtag('event', 'project_view', {
  'project_name': 'StockPulse'
});
```

### Enhanced Measurement
Enable in Google Analytics Admin:
- **Page views** (automatic)
- **Scrolls** (when user scrolls 90%)
- **Outbound clicks** (links to external sites)
- **File downloads** (PDF, images, etc.)
- **Search** (internal site search)

---

## Troubleshooting

### Analytics Not Showing Data

**Check 1: Verify Measurement ID**
```javascript
// Console:
ga.getAll()[0].get('trackingId')
```

**Check 2: Disable Ad Blockers**
- Disable extensions temporarily
- Analytics sometimes blocked by Privacy Extensions

**Check 3: Check Filters**
- In Google Analytics, check **Admin** → **Filters**
- Make sure you're not filtering out your own IP

**Check 4: Wait for Data Processing**
- GA takes 24-48 hours to fully populate
- Realtime dashboard shows immediately though

### Measurement ID Format Wrong
```
❌ Wrong: GA-XXXXXXXXXX or UA-XXXXXXXXXX
✅ Correct: G-XXXXXXXXXX
```

---

## Understanding Analytics Terms

| Term | Meaning |
|------|---------|
| **User** | Unique individual visitor |
| **Session** | Period of activity (30 min default) |
| **Pageview** | Single page visited |
| **Event** | Specific user action |
| **Bounce Rate** | % who leave without action |
| **Session Duration** | Average time per visit |
| **Acquisition** | Where visitor came from |
| **Conversion** | Completion of goal action |

---

## Useful Reports to Check First

1. **Realtime** - See live visitors
2. **User Overview** - Basic traffic stats
3. **Traffic Acquisition** - Where visitors come from
4. **Device Category** - Mobile vs Desktop usage
5. **Top Pages** - Most viewed sections
6. **Geographic** - Countries and cities visiting

---

## Next Steps

1. ✅ Set up Google Analytics
2. ✅ Deploy with tracking code
3. ✅ Wait 24 hours for data
4. ✅ Analyze trends
5. ✅ Optimize based on insights
6. ✅ Share portfolio link in LinkedIn/social media
7. ✅ Watch analytics grow!

---

## Support & Resources

- **Google Analytics Help**: https://support.google.com/analytics/answer/10089681
- **GA4 Documentation**: https://support.google.com/analytics/answer/11025533
- **Measurement ID Format**: https://support.google.com/analytics/answer/12270356
- **Your Portfolio**: https://viveklakhlani2401.github.io

---

**Last Updated**: April 2026  
**Google Analytics Version**: GA4 (latest)  
**Setup Time**: ~10 minutes
