/* ----- SLACK INTEGRATION FOR VISITOR NOTIFICATIONS ----- */

// Initialize Slack notifications
(function() {
    'use strict';
    
    // Configure your Slack webhook URL here
    // Get it from: https://api.slack.com/messaging/webhooks
    const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
    
    const analyticsKey = 'vivek_portfolio_2026';
    
    // Get visitor info
    function getVisitorInfo() {
        return {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'direct',
            page: window.location.href,
            screen: {
                width: window.screen.width,
                height: window.screen.height
            }
        };
    }
    
    // Get IP address using free API
    function trackVisitor() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const visitorInfo = getVisitorInfo();
                visitorInfo.ip = data.ip;
                
                // Store in localStorage
                storeVisitorInfo(visitorInfo);
                
                // Send to Slack if webhook configured
                if (SLACK_WEBHOOK_URL) {
                    sendToSlack(visitorInfo);
                }
            })
            .catch(error => {
                console.log('Analytics tracking: IP fetch failed', error);
                const visitorInfo = getVisitorInfo();
                storeVisitorInfo(visitorInfo);
                
                if (SLACK_WEBHOOK_URL) {
                    sendToSlack(visitorInfo);
                }
            });
    }
    
    // Store visitor data locally
    function storeVisitorInfo(info) {
        try {
            let visitors = JSON.parse(localStorage.getItem(analyticsKey) || '[]');
            visitors.push(info);
            
            if (visitors.length > 100) {
                visitors = visitors.slice(-100);
            }
            
            localStorage.setItem(analyticsKey, JSON.stringify(visitors));
            updateVisitorDisplay(visitors.length);
        } catch (e) {
            console.log('Analytics storage error:', e);
        }
    }
    
    // Update visitor count in UI
    function updateVisitorDisplay(count) {
        const element = document.getElementById('visitor-count');
        if (element) {
            element.textContent = count;
        }
    }
    
    // Send visit notification to Slack
    function sendToSlack(visitorInfo) {
        if (!SLACK_WEBHOOK_URL) return;
        
        // Extract browser name
        let browser = 'Unknown';
        if (visitorInfo.userAgent.includes('Chrome')) browser = 'Chrome';
        else if (visitorInfo.userAgent.includes('Firefox')) browser = 'Firefox';
        else if (visitorInfo.userAgent.includes('Safari')) browser = 'Safari';
        else if (visitorInfo.userAgent.includes('Edge')) browser = 'Edge';
        
        // Create formatted Slack message
        const message = {
            text: '🌐 New Portfolio Visit!',
            blocks: [
                {
                    type: 'header',
                    text: {
                        type: 'plain_text',
                        text: '🌐 Portfolio Visitor'
                    }
                },
                {
                    type: 'section',
                    fields: [
                        {
                            type: 'mrkdwn',
                            text: `*IP Address*\n${visitorInfo.ip}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Browser*\n${browser}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Platform*\n${visitorInfo.platform}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Timezone*\n${visitorInfo.timezone}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Referrer*\n${truncate(visitorInfo.referrer)}`
                        },
                        {
                            type: 'mrkdwn',
                            text: `*Screen*\n${visitorInfo.screen.width}x${visitorInfo.screen.height}`
                        }
                    ]
                },
                {
                    type: 'section',
                    text: {
                        type: 'mrkdwn',
                        text: `📍 Time: _${new Date(visitorInfo.timestamp).toLocaleString()}_`
                    }
                }
            ]
        };
        
        const payload = JSON.stringify(message);

        // Use sendBeacon to avoid CORS issues. It doesn't send preflight requests
        // and is specifically designed for analytics and notification use cases.
        if (navigator.sendBeacon) {
            try {
                // sendBeacon accepts string or Blob. Works best with Slack webhooks.
                const sent = navigator.sendBeacon(SLACK_WEBHOOK_URL, payload);
                if (sent) {
                    console.log('Analytics sent to Slack');
                    return;
                }
            } catch (error) {
                console.log('Slack beacon failed:', error);
            }
        } else {
            console.log('sendBeacon not supported in this browser');
        }
    }
    
    // Helper function to truncate long strings
    function truncate(str, length = 40) {
        if (str.length > length) {
            return str.substring(0, length) + '...';
        }
        return str;
    }
    
    // Get analytics summary
    window.getAnalyticsSummary = function() {
        try {
            const visitors = JSON.parse(localStorage.getItem(analyticsKey) || '[]');
            const summary = {
                totalVisitors: visitors.length,
                visitors: visitors,
                uniqueIPs: getUniqueIPs(visitors),
                topReferrers: getTopReferrers(visitors),
                browsers: getBrowserStats(visitors)
            };
            
            console.clear();
            console.log('%c=== PORTFOLIO ANALYTICS ===', 'color: #1e9fab; font-size: 16px; font-weight: bold;');
            console.log('%cTotal Visitors: ' + summary.totalVisitors, 'color: #00B5E7; font-size: 14px;');
            console.log('%cUnique IPs: ' + summary.uniqueIPs.length, 'color: #1e9fab; font-size: 12px;');
            console.table(summary.visitors.slice(-10));
            console.log('%cTop Referrers:', 'color: #1e9fab; font-weight: bold;');
            console.table(summary.topReferrers);
            console.log('%cBrowser Statistics:', 'color: #1e9fab; font-weight: bold;');
            console.table(summary.browsers);
            
            return summary;
        } catch (e) {
            console.log('Error getting summary:', e);
            return null;
        }
    };
    
    // Keyboard shortcut: Press Ctrl+Shift+A to view analytics
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.keyCode === 65) {
            window.getAnalyticsSummary();
        }
    });
    
    // Helper functions
    function getUniqueIPs(visitors) {
        const ips = new Set();
        visitors.forEach(v => {
            if (v.ip) ips.add(v.ip);
        });
        return Array.from(ips);
    }
    
    function getTopReferrers(visitors) {
        const referrers = {};
        visitors.forEach(v => {
            referrers[v.referrer] = (referrers[v.referrer] || 0) + 1;
        });
        return Object.entries(referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
    }
    
    function getBrowserStats(visitors) {
        const browsers = {};
        visitors.forEach(v => {
            let browser = 'Unknown';
            if (v.userAgent.includes('Chrome')) browser = 'Chrome';
            else if (v.userAgent.includes('Firefox')) browser = 'Firefox';
            else if (v.userAgent.includes('Safari')) browser = 'Safari';
            else if (v.userAgent.includes('Edge')) browser = 'Edge';
            
            browsers[browser] = (browsers[browser] || 0) + 1;
        });
        return browsers;
    }
    
    // Track page view when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackVisitor);
    } else {
        trackVisitor();
    }
})();
